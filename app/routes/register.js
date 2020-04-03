const express = require('express');
const registerController = require('../controllers/register');

module.exports = (() => {
  const api = express.Router();

  /* ----------  Register User  ----------*/
  api.post('/', registerController.register);

  return api;
})();
