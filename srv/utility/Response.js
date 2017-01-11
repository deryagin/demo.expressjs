const ApiError = require('./ApiError');

module.exports = Response;

function Response(res) {
  let self = this;

  self.send200Ok = function send200Ok() {
    res.status(200).send();
  };

  self.send500Error = function send500Error(error) {
    let message = (error instanceof ApiError ? error.message : 'Internal Server Error');
    res.status(500).json({ error: message });
  };
}
