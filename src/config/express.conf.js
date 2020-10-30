const bodyParser = require('body-parser');
const compression = require('compression');
const requestLogger = require('./morgan.conf');

module.exports.configure = configure;

function configure(app) {
  app.use(bodyParser.json());
  app.use(compression());
  app.use(requestLogger);
}
