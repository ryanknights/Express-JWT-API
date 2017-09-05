const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb://ryanknights:/`PxX;XHQ5kP5S?T@127.0.0.1/expressapi', (err) =>
{
	if (err)
	{
		return console.log(err);
	}

	console.log('DB Connected');
});