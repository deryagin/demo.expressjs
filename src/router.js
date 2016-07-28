var product = require('./middleware/controller');

module.exports.configure = configure;

function configure(app) {
  app.get('/:productName', product.makeOrder);
}
