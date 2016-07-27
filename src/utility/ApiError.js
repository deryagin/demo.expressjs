module.exports = ApiError;

function ApiError(message) {
  Error.call(this);
  this.name = this.constructor.name;
  this.message = message;
  this.stack = (new Error()).stack;
}

ApiError.prototype = Object.create(Error.prototype);
