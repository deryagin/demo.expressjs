const sequelize = require('../tool/sequelize');

module.exports = provider();

function provider() {
  let DataType = sequelize.constructor;
  let Provider = sequelize.define('provider', {
    id: { type: DataType.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataType.STRING },
    credit: { type: DataType.BIGINT, defaultValue: 0 },
  });

  Provider.writeOffCredit = function writeOffCredit(id, price, transaction) {
    return Provider.findOne({ where: { id: id } }, { transaction: transaction })
      .then((provider) => {
        provider.set('credit', provider.get('credit') - price);
        return provider.save({ transaction: transaction });
      });
  };

  return Provider;
}

