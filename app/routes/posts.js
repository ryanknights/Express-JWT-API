"use strict"

const express     = require('express'),
	  expressJwt  = require('express-jwt'),
	  jwtSecret   = require('../config/secret'),
	  postsCtrl   = require('../controllers/posts');
	
module.exports = (() =>
{
	var api = express.Router();

	/*----------  Secure Route  ----------*/
	api.use(expressJwt({secret : jwtSecret.secret}));

	/*----------  Retrieve Posts  ----------*/
	api.get('/', postsCtrl.retrievePosts);

	/*----------  Retrieve Posts  ----------*/
	api.post('/', postsCtrl.addPost);

	/*----------  Retrieve Post  ----------*/
	api.get('/:id', postsCtrl.retrievePost);
	
	/*----------  Delete Post  ----------*/
	api.delete('/:id', postsCtrl.deletePost);

	/*----------  Update Post  ----------*/
	api.put('/:id', postsCtrl.updatePost);
	
	return api;

})();