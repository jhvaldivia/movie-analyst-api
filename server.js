var express = require('express');
var jwt = require('express-jwt');
var rsaValidation = require('auth0-api-jwt-rsa-validation');

var movies = require('./data/movies');
var authors = require('./data/authors');
var publications = require('./data/publications');
var pending = require('./data/pending');

var app = express();

app.get('/movies', function(req, res) {
  res.json(movies);
});

app.get('/authors', function(req, res) {
  res.json(authors);
});

app.get('/publications', function(req, res) {
  res.json(publications);
});

app.get('/pending', function(req, res) {
  res.json(pending);
});

app.listen(3000);
