const mongoose = require('mongoose');

module.exports = mongoose.connect('mongodb://127.0.0.1/expressapi??authSource=expressapi', { user: 'ryanknights', pwd: '59NbrgDmp-L?bG!2'}, (err) =>
{
	if (err)
	{
		return console.log(err);
	}

	console.log('DB Connected');
});