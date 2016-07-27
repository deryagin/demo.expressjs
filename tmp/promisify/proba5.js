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

var connection = {
  acquire: function promisedAcquire() {
    return this.promisedCall(function (callback) {
      pool.acquire(callback);
    });
  },
  release: function promisedRelease(promises) {
    var db = promises[0];
    pool.release(db);
  },
  query: function promisedQuery(db, sql, params) {
    return this.promisedCall(function (callback) {
      db.query(sql, params, callback);
    });
  },
  promisedCall: function promisedCall(calleeFunction) {
    return promisify(calleeFunction)();
  }
};

function selectProducts(db) {
  return connection.query(db, "select * from products", []);
}

function selectCredits(db) {
  return connection.query(db, "select * from credits", []);
}

var db = connection.acquire();
var credits = db.then(selectCredits);
var products = db.then(selectProducts);
var finished = Promise.all([products, credits]);
finished.then(connection.release);
// credits.then(console.log);
// products.then(console.log);

// console.log(db);
// setTimeout(function () {
//   console.log(db);
// }, 1000);
