"use strict"

const express          = require('express'),
	  expressJwt       = require('express-jwt'),
	  jwtSecret        = require('../config/secret'),
	  authenticateCtrl = require('../controllers/authenticate');
	
module.exports = (() =>
{
	var api = express.Router();

	/*----------  Authentication  ----------*/
	api.get('/', expressJwt({secret : jwtSecret.secret}), authenticateCtrl.authenticate);

	/*----------  Refresh Token  ----------*/
	api.post('/refreshToken', authenticateCtrl.refreshToken);

	/*----------  Revoke Token  ----------*/
	api.post('/revokeRefreshToken', authenticateCtrl.revokeRefreshToken);

	return api;

})();