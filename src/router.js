var controller = require('./middleware/controller');

module.exports.configure = configure;

function configure(app) {
  app.get('/:productName', controller.makeOrder);
}
