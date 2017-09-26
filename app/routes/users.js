"use strict"

const express   = require('express'),
	  expressJwt      = require('express-jwt'),
	  jwtSecret       = require('../config/secret'),
	  usersCtrl = require('../controllers/users');
	
module.exports = (() =>
{
	var api = express.Router();

	api.all((req, res, next) =>
	{
		console.log('Middleware 1');
		next();
	});

	api.all(expressJwt({secret : jwtSecret.secret}));

	api.all((req, res, next) =>
	{
		console.log('Middleware 2');
		next();
	});	

	/*----------  Retrieve Users  ----------*/
	api.get('/', usersCtrl.retrieveUsers);
	
	/*----------  Delete User  ----------*/
	api.delete('/:id', usersCtrl.deleteUser);
	
	return api;

})();