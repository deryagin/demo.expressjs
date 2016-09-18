const Product = require('../model/Product');
const Provider = require('../model/Provider');
const Offer = require('../model/Offer');
const Booking = require('../model/Booking');
const Response = require('../utility/Response');
const ApiError = require('../utility/ApiError');
const Transaction = require('../utility/Transaction');
module.exports.makeOrder = makeOrder;

function makeOrder(req, res) {
  let response = new Response(res);
  let productName = Promise.resolve(req.params.productName);

  let product = productName.then(findProduct);
  let offers = product.then(findOffers);
  let bestOffer = offers.then(findBestOffer);

  let transaction = new Transaction();
  let booked = Promise.all([transaction.promise, bestOffer]).then(makeBooking);
  let commited = booked.then(transaction.commit);
  commited.then(response.send200Ok);

  let error = booked.catch(promisifiedError);
  error.catch(transaction.rollback);
  error.catch(response.send500Error);
}

function findProduct(productName) {
  return Product.findOne({where: {name: productName}, raw: true})
    .then((product) => product || Promise.reject(new ApiError('Product not found!')));
}

function findOffers(product) {
  return Offer.findAll({where: {product_id: product.id}, order: 'price ASC', raw: true})
    .then((offers) => offers || Promise.reject(new ApiError('Offers not found!')));
}

function findBestOffer(offers) {
  return Offer.findBest(offers)
    .then((bestOffer) => bestOffer || Promise.reject(new ApiError('Offers not found!')));
}

function makeBooking([transaction, bestOffer]) {
  let provider = Provider.writeOffCredit(bestOffer.provider_id, bestOffer.price, transaction);
  let booking = Booking.create({offer_id: bestOffer.id}, {transaction: transaction});
  return Promise.all([provider, booking]);
}

function promisifiedError(error) {
  return Promise.reject(error);
}
