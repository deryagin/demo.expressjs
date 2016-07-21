var app = require('express')();
var server = require('http').createServer(app);
var router = require('./router');

router.configure(app);
server.listen(3000, '0.0.0.0');
