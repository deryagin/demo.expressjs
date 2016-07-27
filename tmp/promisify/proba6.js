var pg = require('pg');
var Pool = require('generic-pool').Pool;
var promisify = require('promisify-node');

var pool = new Pool({
  name: 'postgres',
  create: createConnection,
  idleTimeoutMillis: 30000,
  min: 2,
  max: 10,
  log: false
});

function createConnection(callback) {
  var client = new pg.Client('postgres://postgres@localhost:5432/test');
  client.connect(callback);
}

function Connection(pool) {

  var self = this;

  var conn = null;

  self.acquire = function promisedAcquire() {
    self.conn = self.promisedCall(function (callback) {
      pool.acquire(callback);
    });
  };

  self.release = function promisedRelease(promises) {
    promises.then(function () {
      pool.release(self.conn);
    });
  };

  self.query = function promisedQuery(sql, params) {
    return self.promisedCall(function (callback) {
      self.conn.then(function (conn) {
        conn.query(sql, params, callback)
      });
    });
  };

  self.promisedCall = function promisedCall(calleeFunction) {
    return promisify(calleeFunction)();
  };
};

var connection = new Connection(pool);
connection.acquire();

var products = connection.query("select * from products", []);
products.then(console.log);

var credits = connection.query("select * from credits", []);
credits.then(console.log);

var finished = Promise.all([products, credits]);
connection.release(finished);
