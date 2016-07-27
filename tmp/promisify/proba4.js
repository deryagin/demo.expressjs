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

function acquirePromise() {
  return promisedCall(function (callback) {
    pool.acquire(callback);
  });
}

function releaseConnection(promises) {
  var db = promises[0];
  pool.release(db);
}

function selectProducts(db) {
  return queryPromise(db, "select * from products", []);
}

function selectCredits(db) {
  return queryPromise(db, "select * from credits", []);
}

function queryPromise(db, sql, params) {
  return promisedCall(function (callback) {
    db.query(sql, params, callback);
  });
}

function promisedCall(calleeFunction) {
  return promisify(calleeFunction)();
}

var db = acquirePromise();
var credits = db.then(selectCredits);
var products = db.then(selectProducts);
var finished = Promise.all([db, credits]);
finished.then(releaseConnection);
credits.then(console.log);
products.then(console.log);

// console.log(db);
// setTimeout(function () {
//   console.log(db);
// }, 1000);
