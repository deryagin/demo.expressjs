var db = require('./database');

module.exports = {
  start: start,
  commit: commit,
  rollback: rollback
};

function start() {
  return db.none('START TRANSACTION');
}

function commit() {
  return db.none('COMMIT');
}

function rollback(error) {
  db.none('ROLLBACK');
  throw error;
}
