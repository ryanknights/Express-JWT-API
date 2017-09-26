"use strict"

const express   = require('express'),
	  usersCtrl = require('../controllers/users');
	
module.exports = (() =>
{
	var api = express.Router();

	api.use((req, res, next) => 
	{
		console.log(req);
		console.log(req.user);

		if (!req.user || !req.user.isAdmin)
		{
			return res.send(403);
		}

		next();		
	});

	/*----------  Retrieve Users  ----------*/
	api.get('/', usersCtrl.retrieveUsers);
	
	/*----------  Delete User  ----------*/
	api.delete('/:id', usersCtrl.deleteUser);
	
	return api;

})();