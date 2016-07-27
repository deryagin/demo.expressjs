var connPool = require('./ConnPool');
var Connection = require('./Connection');
var Transaction = require('./Transaction');
var DbQuery = require('./DbQuery');
var HttpQuery = require('./HttpQuery');

module.exports.makeOrder = makeOrder;

function makeOrder(req, res) {
  var httpQuery = new HttpQuery(req, res);
  var connection = new Connection(connPool);
  var transaction = new Transaction(connection);
  var dbQuery = new DbQuery(connection);

  connection.acquire()
    .then(transaction.start)
    .then(httpQuery.extractName)
    .then(dbQuery.selectProduct)
    .then(dbQuery.updateCredits)
    .then(dbQuery.insertOrder)
    .then(transaction.commit)
    .then(connection.release)
    .then(httpQuery.send200Ok)
    .catch(transaction.rollback)
    .catch(httpQuery.send500Error)
    .catch(connection.release)
  ;
}
