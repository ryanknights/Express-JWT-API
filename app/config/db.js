const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb://ryanknights:59NbrgDmp-L?bG!2@127.0.0.1/expressapi', { uri_decode_auth: true } (err) =>
{
	if (err)
	{
		return console.log(err);
	}

	console.log('DB Connected');
});