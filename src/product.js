module.exports.makeOrder = makeOrder;

function makeOrder(req, res) {
  var error = {'error': 'No such product.'};
  res.status(500).json(error);
}
