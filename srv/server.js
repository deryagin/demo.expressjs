const app = require('express')();
const server = require('http').createServer(app);
const express = require('./config/express.conf');
const routes = require('./config/routes.conf');
const errors = require('./config/errors.conf');

express.configure(app);
routes.configure(app);
errors.configure(app);
server.listen(3000, '0.0.0.0');
