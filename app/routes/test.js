const express = require('express');
const testController = require('../controllers/test');

module.exports = (() => {
  const api = express.Router();

  /* ----------  Register User  ----------*/
  api.get('/', testController.test);

  return api;
})();
