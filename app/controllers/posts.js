"use strict";

const Post = require('../models/Post');

exports.retrievePosts = (req, res, next) =>
{
	Post.find({}, (err, posts) =>
	{
		if (err)
		{
			return res.send(500, 'There was a problem retrieving the posts');
		}
		
		return res.json({posts: posts});
	});
}

exports.retrievePost = (req, res, next) =>
{
	Post.findOne({_id : req.params.id}, (err, user) =>
	{
		if (err)
		{
			return res.send(500, 'There was a problem retrieving the post');
		}

		if (!user)
		{
			return res.send(404, 'No post found');
		}

		return res.json({post: post});
	});
}

exports.addPost = (req, res, next) =>
{
	const title   = req.body.title || '',
		  content = req.body.content || '';

	if (title === '' || content === '')
	{	
		return res.status(400).send('Please enter a title and content.');
	}

	const newPost = new Post({title: title, content: content, userId: req.user.userid});

	newPost.save()
		.then((post) => res.json({post: post}))
		.catch((err) => res.send(500, 'There was a problem saving the post'));
}

exports.deletePost = (req, res, next) =>
{

}

exports.updatePost = (req, res, next) =>
{

}