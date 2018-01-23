module.exports = ApiError;

function ApiError(message) {
  this.message = message;
  Error.captureStackTrace(this, ApiError);
}

ApiError.prototype = Object.create(Error.prototype);
ApiError.prototype.name = ApiError.name;
ApiError.prototype.constructor = ApiError;

// console.log(ApiError);
// console.log(ApiError.prototype);
// console.log(ApiError.prototype.constructor);
// console.log(ApiError.prototype.constructor.name);
// console.log(ApiError.prototype.__proto__);
// console.log(new ApiError('asdf') instanceof Error);
// console.log(new ApiError('asdf') instanceof ApiError);
// console.log(new ApiError('asdf').stack);
// console.log(new ApiError('asdf').message);
