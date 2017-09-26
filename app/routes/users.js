"use strict"

const express   = require('express'),
	  expressJwt      = require('express-jwt'),
	  jwtSecret       = require('../config/secret'),
	  usersCtrl = require('../controllers/users');
	
module.exports = (() =>
{
	var api = express.Router();

	api.use((req, res, next) =>
	{
		console.log('Middleware 1');
		next();
	});

	api.use(expressJwt({secret : jwtSecret.secret}));

	api.use((req, res, next) =>
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