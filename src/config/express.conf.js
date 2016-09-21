const bodyParser = require('body-parser');
const compression = require('compression');
module.exports.configure = configure;

function configure(app) {
  app.use(bodyParser.json());
  app.use(compression());
}
