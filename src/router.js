var product = require('./product');

module.exports.configure = configure;

function configure(app) {
  app.get('/product', product.makeOrder);
}
