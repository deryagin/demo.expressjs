const ApiError = require('../utility/ApiError');
module.exports.configure = configure;

function configure(app) {
  app.use(handle4xx);
  app.use(handle5xx);
}

function handle4xx(err, req, res, next) {
  console.error('Unhandled 4xx User Error', err.stack);
  let reply = () => res.status(400).json({'error': err.message});
  return (error instanceof ApiError ? reply() : next(err));
}

function handle5xx(err, req, res, next) {
  console.error('Internal Server Error', err.stack);
  let reply = () => res.status(500).json({'error': 'Internal Server Error'});
  return (err ? reply() : next(err));
}
