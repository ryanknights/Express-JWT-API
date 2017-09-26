"use strict";

const env = require('node-env-file');
env(__dirname + '/.env');

const express         = require('express'),
	  httpModule      = require('http');

const app             = express(),
	  http            = httpModule.Server(app),
	  bodyParser 	  = require('body-parser'),
	  methodOverride  = require('method-override'),
	  mongoose   	  = require('mongoose'),
	  expressJwt      = require('express-jwt'),
	  jwtSecret       = require('./app/config/secret');

const db = require('./app/config/db');

const port = process.env.PORT || 4007; 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(methodOverride('X-HTTP-Method-Override'));

app.options('/api/*', (req, res, next) =>
{
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
	res.send(200);
});

/**
* Users | Protected
**/
app.use('/api/users', require('./app/routes/users'));

/**
* Posts | Protected
**/
app.use('/api/posts', expressJwt({secret : jwtSecret.secret}));
app.use('/api/posts', require('./app/routes/posts'));

/**
* Authentication
**/
app.use('/api/authenticate', require('./app/routes/authenticate'));

/**
* Login/Register | Not Protected
**/
app.use('/api/register', require('./app/routes/register'));
app.use('/api/login', require('./app/routes/login'));

/**
* Error Handling
**/
app.use((err, req, res, next) => 
{
	console.log(err.message);

	if (err.message === 'jwt expired')
	{
		return res.send(401, 'Token Expired');
	}

	if (err.message === 'invalid token' || err.message === 'invalid signature' || err.message === 'jwt malformed' || err.message === 'No authorization token was found')
	{
		return res.send(401, 'Invalid Token');	
	}

	return res.send(500);
});

/**
* Start Server
**/

http.listen(port, () =>
{
	console.log('App listening on port ' + port);
});