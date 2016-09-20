const bodyParser = require('body-parser');
module.exports.configure = configure;

function configure(app) {
  app.use(bodyParser.json());
}
