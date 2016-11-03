const sequelize = require('../tool/sequelize');
const DataType = sequelize.constructor;
module.exports = product();

function product() {
  return sequelize.define('product', {
    id: {type: DataType.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataType.STRING}
  });
}
