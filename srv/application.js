const app = require('express')();
const express = require('./config/express.conf');
const routes = require('./config/routes.conf');
const errors = require('./config/errors.conf');

module.exports = app;

express.configure(app);
routes.configure(app);
errors.configure(app);
