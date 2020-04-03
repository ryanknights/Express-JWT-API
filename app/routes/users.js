const express = require('express');
const usersController = require('../controllers/users');
const authJwt = require('../modules/authJwt');
const authAdmin = require('../modules/authAdmin');

module.exports = (() => {
  const api = express.Router();

  api.use(authJwt);
  api.use(authAdmin);

  /* ----------  Retrieve Users  ----------*/
  api.get('/', usersController.retrieveUsers);

  /* ----------  Delete User  ----------*/
  api.delete('/:id', usersController.deleteUser);

  return api;
})();
