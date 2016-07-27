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

function queryPromise(db) {
  return promisedCall(function (callback) {
    db.query("select * from credits", [], callback);
  });
}

function releaseConnection(promises) {
  var db = promises[0];
  pool.release(db);
}

function promisedCall(calleeFunction) {
  return promisify(calleeFunction)();
}

var db = acquirePromise();
var result = db.then(queryPromise);
var finished = Promise.all([db, result]);
finished.then(releaseConnection);
result.then(console.log);

// console.log(db);
// setTimeout(function () {
//   console.log(db);
// }, 1000);
