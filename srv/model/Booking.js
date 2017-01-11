const sequelize = require('../tool/sequelize');

module.exports = booking();

function booking() {
  let DataType = sequelize.constructor;
  return sequelize.define('booking', {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
    offer_id: { type: DataType.INTEGER },
    datetime: { type: DataType.DATE },
  });
}
