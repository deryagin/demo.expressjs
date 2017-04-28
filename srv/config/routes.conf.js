const monitor = require('../midware/monitor.controller');
const booking = require('../midware/booking.controller');

module.exports.configure = configure;

function configure(app) {
  app.get('/ping', monitor.ping);
  app.post('/booking', booking.create);
}
