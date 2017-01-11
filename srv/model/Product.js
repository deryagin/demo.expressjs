const sequelize = require('../tool/sequelize');

module.exports = product();

function product() {
  let DataType = sequelize.constructor;
  return sequelize.define('product', {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataType.STRING },
  });
}
