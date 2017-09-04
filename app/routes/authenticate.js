"use strict"

const express          = require('express'),
	  expressJwt      = require('express-jwt'),
	  jwtSecret       = require('../config/secret'),
	  authenticateCtrl = require('../controllers/authenticate');
	
module.exports = (() =>
{
	var api = express.Router();

	api.get('/', expressJwt({secret : jwtSecret.secret}), authenticateCtrl.authenticate);
	api.post('/refreshToken', authenticateCtrl.refreshToken);
	api.post('/revokeRefreshToken', authenticateCtrl.revokeRefreshToken);

	return api;

})();