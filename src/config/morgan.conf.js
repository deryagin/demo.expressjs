const morgan = require('morgan');

module.exports = configure();

function configure() {
  return morgan('[:date[iso]] :remote-addr :method :url :status :res[content-length] :response-time ms');
}
