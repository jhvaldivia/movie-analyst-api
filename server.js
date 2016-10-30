var express = require('express');
var jwt = require('express-jwt');
var rsaValidation = require('auth0-api-jwt-rsa-validation');

var movies = require('./data/movies');
var authors = require('./data/authors');
var publications = require('./data/publications');
var pending = require('./data/pending');

var app = express();

var jwtCheck = jwt({
  secret: rsaValidation(),
  algorithms: ['RS256'],
  issuer: "https://jaimevaldivia.auth0.com/",
  audience: 'http://movieanalyst.com'
});

// Enable the use of the jwtCheck middleware in all of our routes
app.use(jwtCheck);

var guard = function(req, res, next){
  var permissions, i;
  // we’ll use a case switch statement on the route requested
  switch(req.path){
    // if the request is for movie reviews we’ll check to see if the token has general scope
    case '/movies' : {
      permissions = ['general'];
      for(i = 0; i < permissions.length; i++){
        if(req.user.scope.includes(permissions[i])){
          next();
        } else {
          res.send(403, {message:'Forbidden'});
        }
      }
      break;
    }
    // Same for the reviewers
    case '/reviewers': {
      permissions = ['general'];
      for(i = 0; i < permissions.length; i++){
        if(req.user.scope.includes(permissions[i])){
          next();
        } else {
          res.send(403, {message:'Forbidden'});
        }
      }
      break;
    }
    // Same for publications
    case '/publications': {
      permissions = ['general'];
      for(i = 0; i < permissions.length; i++){
        if(req.user.scope.includes(permissions[i])){
          next();
        } else {
          res.send(403, {message:'Forbidden'});
        }
      }
      break;
    }
    // For the pending route, we’ll check to make sure the token has the scope of admin before returning the results.
    case '/pending': {
      permissions = ['admin'];
      console.log(req.user.scope);
      for(i = 0; i < permissions.length; i++){
        if(req.user.scope.includes(permissions[i])){
          next();
        } else {
          res.send(403, {message:'Forbidden'});
        }
      }
      break;
    }
  }
};

// existing app.use middleware

app.use(guard);

// If we do not get the correct credentials, we’ll return an appropriate message
app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({message:'Missing or invalid token'});
  }
});

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
