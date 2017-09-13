const mongoose = require('mongoose');

mongoose.set('debug', process.env.DB_DEBUG);

let connectionString = 'mongodb://';

if (process.env.DB_AUTH === 'true')
{
	connectionString+= `${process.env.DB_USER}:${process.env.DB_PASSWORD}@`;
}

connectionString+= `${process.env.DB_HOST}/${process.env.DB_NAME}`;

module.exports = mongoose.connect(connectionString, (err) =>
{
	if (err)
	{
		return console.log(err);
	}

	console.log('DB Connected');
});