var sequelize = require('../tool/sequelize');
var DataType = sequelize.constructor;

module.exports = booking();

function booking() {
  return sequelize.define('booking', {
    id: {type: DataType.INTEGER, primaryKey: true, autoIncrement: true},
    offer_id: {type: DataType.INTEGER},
    datetime: {type: DataType.DATE}
  });
}
