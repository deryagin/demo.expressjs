var Product = require('../model/Product');
var Provider = require('../model/Provider');
var Offer = require('../model/Offer');
var Booking = require('../model/Booking');
var Response = require('../utility/Response');
var ApiError = require('../utility/ApiError');
var Transaction = require('../utility/Transaction');

module.exports.makeOrder = makeOrder;

function makeOrder(req, res) {
  var response = new Response(res);
  var productName = Promise.resolve(req.params.productName);

  var product = productName.then(findProduct);
  var offers = product.then(findOffers);
  var bestOffer = offers.then(findBestOffer);

  var transaction = new Transaction();
  var booked = Promise.all([transaction.promise, bestOffer]).then(makeBooking);
  var commited = booked.then(transaction.commit);
  commited.then(response.send200Ok);

  var error = booked.catch(promisifiedError);
  error.catch(transaction.rollback);
  error.catch(response.send500Error);
}

function findProduct(productName) {
  return Product.findOne({where: {name: productName}, raw: true})
    .then(function isProductExists(product) {
      return (product ? product : Promise.reject(new ApiError('Product not found!')));
    });
}

function findOffers(product) {
  return Offer.findAll({where: {product_id: product.id}, order: 'price ASC', raw: true})
    .then(function areOffersExist(offers) {
      return (offers ? offers : Promise.reject(new ApiError('Offers not found!')));
    });
}

function findBestOffer(offers) {
  return Offer.findBest(offers)
    .then(function isOfferExists(bestOffer) {
      return (bestOffer ? bestOffer : Promise.reject(new ApiError('Offers not found!')));
    });
}

function makeBooking(params) {
  var transaction = params[0];
  var bestOffer = params[1];
  var provider = Provider.writeOffCredit(bestOffer.provider_id, bestOffer.price, transaction);
  var booking = Booking.create({offer_id: bestOffer.id}, {transaction: transaction});
  return Promise.all([provider, booking]);
}

function promisifiedError(error) {
  return Promise.reject(error);
}
