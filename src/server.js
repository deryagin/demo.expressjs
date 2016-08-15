const app = require('express')();
const server = require('http').createServer(app);
const router = require('./router');

router.configure(app);
server.listen(3000, '0.0.0.0');
