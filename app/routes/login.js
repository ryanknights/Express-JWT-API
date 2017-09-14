"use strict"

const express   = require('express'),
	  loginCtrl = require('../controllers/login');

module.exports = (() =>
{
	var api = express.Router();

	/*----------  Login User  ----------*/
	api.post('/', loginCtrl.login);

	return api;

})();