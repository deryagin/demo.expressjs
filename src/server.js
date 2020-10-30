const app = require('./application');
const server = require('http').createServer(app);

module.exports = server;

server.listen(3000, '0.0.0.0');
