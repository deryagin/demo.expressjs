module.exports = {
  extractName: extractName,
  send200Ok: send200Ok,
  send500Error: send500Error
};

function extractName(req) {
  return function () {
    return req.params.productName;
  };
}

function send200Ok(res) {
  return function () {
    res.status(200).send();
  };
}

function send500Error(res) {
  return function (error) {
    res.status(500).json({'error': error.message});
  };
}
