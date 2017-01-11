const booking = require('../midware/booking.controller');

module.exports.configure = configure;

function configure(app) {
  app.post('/booking', booking.create);
}
