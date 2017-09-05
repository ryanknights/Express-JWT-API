const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb://admin:password@178.62.109.21/expressapi', (err) =>
{
	if (err)
	{
		return console.log(err);
	}

	console.log('DB Connected');
});