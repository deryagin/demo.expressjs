const product = require('./middleware/product.controller');

module.exports.configure = configure;

function configure(app) {
  app.get('/:productName', product.makeOrder);
}
