const express = require('express');
const authenticateController = require('../controllers/authenticate');
const authJwt = require('../modules/authJwt');

module.exports = (() => {
  const api = express.Router();

  /* ----------  Authentication  ----------*/
  api.get('/', authJwt, authenticateController.authenticate);

  /* ----------  Refresh Token  ----------*/
  api.post('/refreshToken', authenticateController.refreshToken);

  /* ----------  Revoke Token  ----------*/
  api.post('/revokeRefreshToken', authenticateController.revokeRefreshToken);

  return api;
})();
