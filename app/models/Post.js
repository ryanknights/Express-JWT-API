"use strict";

const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
{
	title :
	{
		type     : String,
		required : true
	},
	content :
	{
		type     : String,
		required : true
	},
	created :
	{
		type    : Date,
		default : Date.now
	},
	userId :
	{
		type    : Boolean,
		default : false
	}
});

module.exports = mongoose.model('Post', postSchema);