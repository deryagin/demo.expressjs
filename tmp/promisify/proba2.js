var pg = require('pg');
var Pool = require('generic-pool').Pool;

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
  return promisifyResult(function (callback) {
    pool.acquire(callback)
  });
}

function queryPromise(db) {
  return promisifyResult(function (callback) {
    db.query("select * from credits", [], callback);
  });
}

function releaseConnection(promises) {
  var db = promises[0];
  pool.release(db);
}

function promisifyResult(calleeFunction) {
  return new Promise(function (resolve, reject) {
    var onSettled = settlePromise(resolve, reject);
    calleeFunction(onSettled);
  });
}

function settlePromise(resolve, reject) {
  return function onSettled(error, result) {
    return (error ? reject(error) : resolve(result));
  };
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


// pool.acquire(function (err, db) {
//   if (err) {
//     throw error;
//   }
//
//   db.query("select * from credits", [], function (error, result) {
//     pool.release(db);
//   });
// });

// function readFilePromise() {
//   return new Promise(function (resolve, reject) {
//     fs.readFile(path, function callback(error, content) {
//       if (error) {
//         reject(error)
//       } else {
//         resolve(content);
//       }
//     })
//   })
// }
