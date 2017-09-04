"use strict"

const express   = require('express'),
	  usersCtrl = require('../controllers/users');
	
module.exports = (() =>
{
	var api = express.Router();

	/*----------  Retrieve Users  ----------*/
	api.get('/', usersCtrl.retrieveUsers);

	/*----------  Retrieve User  ----------*/
	api.get('/:id', usersCtrl.retrieveUser);
	
	/*----------  Delete User  ----------*/
	api.delete('/:id', usersCtrl.deleteUser);

	/*----------  Edit User  ----------*/
	api.put('/:id', usersCtrl.editUser);

	/*----------  Update Password  ----------*/
	api.put('/:id/password', usersCtrl.updatePassword);
	
	return api;

})();