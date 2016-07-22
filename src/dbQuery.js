var db = require('./database');

module.exports = {
  selectProduct: selectProduct,
  updateCredits: updateCredits,
  insertOrder: insertOrder
};

function selectProduct(productName) {
  var query =
    'SELECT p.*, c.credit ' +
    'FROM products AS p INNER JOIN credits AS c USING (provider) ' +
    'WHERE p.product = ${productName} AND p.price <= c.credit ' +
    'ORDER BY p.price ASC ' +
    'LIMIT 1 ' +
    'FOR UPDATE OF c';
  var params = {productName: productName};

  return db.oneOrNone(query, params).then(function isProductExists(product) {
    return (product ? product : Promise.reject(new Error('Product not found!')));
  });
}

function updateCredits(product) {
  var query =
    'UPDATE credits ' +
    'SET credit = credit - ${price} ' +
    'WHERE credits.provider = ${provider} AND ${price} <= credit ' +
    'RETURNING true AS wasUpdated';
  var params = {
    provider: product.provider,
    price: product.price
  };

  return db.oneOrNone(query, params).then(function wasCreditUpdated(wasUpdated) {
    return (wasUpdated ? product : Promise.reject(new Error('Credits not updated!')));
  });
}

function insertOrder(product) {
  var query =
    'INSERT INTO "order" (product, provider, price, datetime) ' +
    'VALUES (${product}, ${provider}, ${price}, now()) ' +
    'RETURNING true AS wasInserted';
  var params = {
    product: product.product,
    provider: product.provider,
    price: product.price
  };

  return db.one(query, params).then(function wasOrderInserted(wasInserted) {
    return (wasInserted ? product : Promise.reject(new Error('Order not added!')));
  });
}
