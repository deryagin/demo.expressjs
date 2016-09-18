const product = require('./midware/product.controller');
module.exports.configure = configure;

function configure(app) {
  app.get('/:productName', product.makeOrder);
}
