const sequelize = require('../tool/sequelize');
const Provider = require('./Provider');

module.exports = offer();

function offer() {
  let DataType = sequelize.constructor;
  let Offer = sequelize.define('offer', {
    id: {type: DataType.INTEGER, primaryKey: true, autoIncrement: true},
    product_id: {type: DataType.INTEGER},
    provider_id: {type: DataType.INTEGER},
    price: {type: DataType.BIGINT, defaultValue: 0},
  });

  Offer.findBest = function findBest(offers) {
    let ids = offers.map((offer) => offer.provider_id);
    let providers = Provider.findAll({where: {id: {$in: ids}, credit: {$gte: 0}}, raw: true});
    return Promise.all([offers, providers]).then(findOffer);
  };

  return Offer;
}

function findOffer([offers, providers]) {
  for (let index = 0, length = offers.length; index < length; index++) {
    let offer = offers[index];
    if (providers.filter(hasEnoughCredit(offer))[0]) {
      return offer;
    }
  }
}

function hasEnoughCredit(offer) {
  return function compare(provider) {
    return (provider.id === offer.provider_id && offer.price <= provider.credit);
  };
}
