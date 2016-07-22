var transaction = require('./transaction');
var httpQuery = require('./httpQuery');
var dbQuery = require('./dbQuery');

module.exports.makeOrder = makeOrder;

function makeOrder(req, res) {
  transaction.start()
    .then(httpQuery.extractName(req))
    .then(dbQuery.selectProduct)
    .then(dbQuery.updateCredits)
    .then(dbQuery.insertOrder)
    .then(transaction.commit)
    .then(httpQuery.send200Ok(res))
    .catch(transaction.rollback)
    .catch(httpQuery.send500Error(res))
  ;
}
