const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb://127.0.0.1/expressapi', { user: 'expressapiuser', pwd: 'HFK8938hUW03402mLD'}, (err) =>
{
	if (err)
	{
		return console.log(err);
	}

	console.log('DB Connected');
});