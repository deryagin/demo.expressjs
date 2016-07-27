module.exports = Transaction;

function Transaction(connection) {

  var self = this;

  self.start = function promisedStart() {
    return connection.query('START TRANSACTION');
  };

  self.commit = function promisedCommit() {
    return connection.query('COMMIT');
  };

  self.rollback = function promisedRollback(error) {
    connection.query('ROLLBACK');
    return Promise.reject(error);
  };
}
