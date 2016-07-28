var sequelize = require('../tool/sequelize');

module.exports = Transaction;

function Transaction() {

  var self = this;

  self.promise = sequelize.transaction();

  self.commit = function commit() {
    return self.promise.then(function (transaction) {
      transaction.commit();
    })
  };

  self.rollback = function rollback() {
    return self.promise.then(function (transaction) {
      transaction.rollback();
    })
  };
}
