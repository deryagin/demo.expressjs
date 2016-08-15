const sequelize = require('../tool/sequelize');
const DataType = sequelize.constructor;
const Provider = require('./Provider');

module.exports = offer();

function offer() {
  let Offer = sequelize.define('offer', {
    id: {type: DataType.INTEGER, primaryKey: true, autoIncrement: true},
    product_id: {type: DataType.INTEGER},
    provider_id: {type: DataType.INTEGER},
    price: {type: DataType.BIGINT, defaultValue: 0}
  });

  Offer.findBest = function findBest(offers) {
    let ids = offers.map(extractProviderId);
    let providers = Provider.findAll({where: {id: {$in: ids}, credit: {$gte: 0}}, raw: true})
    return providers.then(function (providers) {
      for (let index = 0, length = offers.length; index < length; index++) {
        let offer = offers[index];
        if (providers.filter(filterByOffer(offer))[0]) {
          return offer;
        }
      }
    });
  };

  return Offer;
}

function extractProviderId(offer) {
  return offer.provider_id;
}

function filterByOffer(offer) {
  return function (provider) {
    return (provider.id === offer.provider_id && offer.price <= provider.credit);
  }
}
