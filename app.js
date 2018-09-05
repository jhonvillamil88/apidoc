var express = require('express');
var app = express();
var db = require('./db');

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
  });
var UserController = require('./user/UserController');
app.use('/users', UserController);

module.exports = app;