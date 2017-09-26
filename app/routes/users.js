"use strict"

const express   = require('express'),
	  expressJwt      = require('express-jwt'),
	  jwtSecret       = require('../config/secret'),
	  usersCtrl = require('../controllers/users');
	
module.exports = (() =>
{
	var api = express.Router();

	// api.use((req, res, next) =>
	// {
	// 	console.log('Middleware 1');
	// 	next();

	// }, (req, res, next) =>
	// {
	// 	console.log('Middleware 2');
	// 	console.log(req.user);
	// 	next();		
	// }, 
	// expressJwt({secret : jwtSecret.secret}), (req, res, next) =>
	// {
	// 	console.log('Middleware 3');
	// 	console.log(req.user);
	// 	next();
	// });

	api.use((req, res, next) => 
	{
		console.log('Middleware 1');
		
	}, expressJwt({secret : jwtSecret.secret}), (req, res, next) =>
	{
		console.log(req.user);
		if (!req.user || !req.user.isAdmin)
		{
			return res.sendStatus(403);
		}

		next();
	});	

	/*----------  Retrieve Users  ----------*/
	api.get('/', usersCtrl.retrieveUsers);
	
	/*----------  Delete User  ----------*/
	api.delete('/:id', usersCtrl.deleteUser);
	
	return api;

})();