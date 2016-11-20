const ApiError = require('../utility/ApiError');
module.exports.configure = configure;

function configure(app) {
  app.use(handle4xx);
  app.use(handle5xx);
  handleUncought();
}

function handle4xx(err, req, res, next) {
  console.error('400 Bad Request', err.stack);
  let reply400 = () => res.status(400).json({'error': err.message});
  return (error instanceof ApiError ? reply400() : next(err));
}

function handle5xx(err, req, res, next) {
  console.error('500 Internal Server Error', err.stack);
  let reply500 = () => res.status(500).json({'error': 'Internal Server Error'});
  return (err ? reply500() : next(err));
}

function handleUncought() {
  process.on('uncaughtException', console.error);
}

