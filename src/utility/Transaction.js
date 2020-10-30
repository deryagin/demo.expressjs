const sequelize = require('../tool/sequelize');

module.exports = Transaction;

function Transaction() {
  let self = this;

  self.promise = sequelize.transaction();

  self.commit = function commit() {
    return self.promise.then((transaction) => transaction.commit());
  };

  self.rollback = function rollback() {
    return self.promise.then((transaction) => transaction.rollback());
  };
}
