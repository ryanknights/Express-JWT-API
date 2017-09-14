"use strict"

const express   = require('express'),
	  postsCtrl = require('../controllers/posts');
	
module.exports = (() =>
{
	var api = express.Router();

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