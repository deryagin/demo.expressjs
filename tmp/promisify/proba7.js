var pg = require('pg');
var Pool = require('generic-pool').Pool;
var promisify = require('promisify-node');

var pool = new Pool({
  name: 'postgres',
  create: createConnection,
  idleTimeoutMillis: 30000,
  min: 2,
  max: 10,
  log: true
});

function createConnection(callback) {
  var client = new pg.Client('postgres://postgres@localhost:5432/test');
  client.connect(callback);
}

function Database(connectionPool) {

  var self = this;

  self.conn = null;

  self.connect = function promisedConnect() {
    self.conn = self.promisedCall(function (callback) {
      connectionPool.acquire(callback);
    });
  };

  self.disconnect = function promisedDisconnect(promises) {
    promises.then(function () {
      self.conn.then(connectionPool.release);
    });
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
};

var db = new Database(pool);
db.connect();

var products = db.query("select * from products", []);
// products.then(console.log);

var credits = db.query("select * from credits", []);
// credits.then(console.log);

var finished = Promise.all([products, credits]);
db.disconnect(finished);
