var ApiError = require('../utility/ApiError');

module.exports = DbQuery;

function DbQuery(connection) {

  var self = this;

  self.selectProduct = function selectProduct(productName) {
    var sql = `
      SELECT p.*, c.credit
      FROM products AS p INNER JOIN credits AS c USING (provider)
      WHERE p.product = $1 AND p.price <= c.credit
      ORDER BY p.price ASC
      LIMIT 1 FOR UPDATE OF c
    `;
    var params = [productName];
    return connection.query(sql, params).then(function returnProduct(result) {
      return (result.rowCount ? result.rows[0]: Promise.reject(new ApiError('Product not found!')));
    });
  };

  self.updateCredits = function updateCredits(product) {
    var sql = `
      UPDATE credits
      SET credit = credit - $1
      WHERE credits.provider = $2 AND $1 <= credit
      RETURNING true AS wasUpdated
    `;
    var params = [product.price, product.provider];
    return connection.query(sql, params).then(function returnProduct(result) {
      return (result.rowCount ? product : Promise.reject(new ApiError('Credits not updated!')));
    });
  };

  self.insertOrder = function insertOrder(product) {
    var sql = `
      INSERT INTO "order" (product, provider, price, datetime)
      VALUES ($1, $2, $3, now())
      RETURNING true AS wasInserted
    `;
    var params = [product.product, product.provider, product.price];
    return connection.query(sql, params).then(function returnProduct(result) {
      return (result.rowCount ? product : Promise.reject(new ApiError('Order not added!')));
    });
  };
}
