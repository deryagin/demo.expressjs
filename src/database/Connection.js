var promisify = require('promisify-node');

module.exports = Connection;

function Connection(connectionPool) {

  var self = this;

  self.conn = null;

  self.acquire = function promisedAcquire() {
    self.conn = self.promisedCall(function (callback) {
      connectionPool.acquire(callback);
    });
    return self.conn;
  };

  self.release = function promisedRelease() {
    self.conn.then(connectionPool.release);
  };

  self.query = function promisedQuery(sql, params) {
    return self.promisedCall(function (callback) {
      self.conn.then(function (db) {
        db.query(sql, params, callback)
      });
    });
  };

  self.promisedCall = function promisedCall(calleeFunction) {
    return promisify(calleeFunction)();
  };
}
