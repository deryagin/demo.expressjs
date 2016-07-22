var pgPromise = require('pg-promise')();

module.exports = connect();

function connect() {
  return pgPromise('postgres://postgres@localhost:5432/test');
}
