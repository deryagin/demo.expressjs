var controller = require('./controller');

module.exports.configure = configure;

function configure(app) {
  app.get('/:productName', controller.makeOrder);
}
