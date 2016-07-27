var connPool = require('../database/ConnPool');
var Connection = require('../database/Connection');
var Transaction = require('../database/Transaction');
var DbQuery = require('../database/DbQuery');
var HttpQuery = require('../utility/HttpQuery');

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
