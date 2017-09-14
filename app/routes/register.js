"use strict"

const express      = require('express'),
	  registerCtrl = require('../controllers/register');

module.exports = (() =>
{
	var api = express.Router();

	/*----------  Register User  ----------*/
	api.post('/', registerCtrl.register);

	return api;

})();