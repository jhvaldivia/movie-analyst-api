var express = require('express');
var jwt = require('express-jwt');
var rsaValidation = require('auth0-api-jwt-rsa-validation');

var movies = require('./data/movies');

var app = express();

app.get('/movies', function(req, res) {
  res.json(movies);
});

app.listen(3000);
