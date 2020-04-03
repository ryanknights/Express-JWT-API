const express = require('express');
const loginController = require('../controllers/login');

module.exports = (() => {
  const api = express.Router();

  /* ----------  Login User  ----------*/
  api.post('/', loginController.login);

  return api;
})();
