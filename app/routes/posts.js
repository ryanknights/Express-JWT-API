const express = require('express');
const postsController = require('../controllers/posts');
const authJwt = require('../modules/authJwt');

module.exports = (() => {
  const api = express.Router();

  /* ----------  Secure Route  ----------*/
  api.use(authJwt);

  /* ----------  Retrieve Posts  ----------*/
  api.get('/', postsController.retrievePosts);

  /* ----------  Retrieve Posts  ----------*/
  api.post('/', postsController.addPost);

  /* ----------  Retrieve Post  ----------*/
  api.get('/:id', postsController.retrievePost);

  /* ----------  Delete Post  ----------*/
  api.delete('/:id', postsController.deletePost);

  /* ----------  Update Post  ----------*/
  api.put('/:id', postsController.updatePost);

  return api;
})();
