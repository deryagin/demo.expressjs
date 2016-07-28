var sequelize = require('../tool/sequelize');
var DataType = sequelize.constructor;
var Provider = require('./Provider');

module.exports = offer();

function offer() {
  var Offer = sequelize.define('offer', {
    id: {type: DataType.INTEGER, primaryKey: true, autoIncrement: true},
    product_id: {type: DataType.INTEGER},
    provider_id: {type: DataType.INTEGER},
    price: {type: DataType.INTEGER, defaultValue: 0}
  });

  Offer.findBest = function findBest(offers) {
    var ids = offers.map(extractProviderId);
    var providers = Provider.findAll({where: {id: {$in: ids}, credit: {$gte: 0}}, raw: true})
    return providers.then(function (providers) {
      for (var index = 0, length = offers.length; index < length; index++) {
        var offer = offers[index];
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
