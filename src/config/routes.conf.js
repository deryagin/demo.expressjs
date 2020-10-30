const monitor = require('../module/monitor.controller');
const booking = require('../module/booking.controller');

module.exports.configure = configure;

function configure(app) {
  app.get('/ping', monitor.ping);
  app.post('/booking', booking.create);
}
