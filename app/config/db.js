const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb://127.0.0.1', { user: 'ryanknights', pwd: '59NbrgDmp-L?bG!2', db: 'expressapi'}, (err) =>
{
	if (err)
	{
		return console.log(err);
	}

	console.log('DB Connected');
});