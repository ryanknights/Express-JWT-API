const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb://expressapiuser:HFK8938hUW03402mLD@127.0.0.1/expressapi', (err) =>
{
	if (err)
	{
		return console.log(err);
	}

	console.log('DB Connected');
});