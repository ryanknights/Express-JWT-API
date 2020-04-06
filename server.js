const express = require('express');
const httpModule = require('http');
const env = require('dotenv');

env.config();

const app = express();
httpModule.Server(app);
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const routes = require('./app/routes/index');

const allowCors = require('./app/modules/allowCors');
const errorHandler = require('./app/modules/errorHandler');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('X-HTTP-Method-Override'));

// DB Connection
require('./app/config/db');

// Allow CORS
app.use('/api', allowCors);

// Add Routes
routes(app);

// Error Handling
app.use(errorHandler);

module.exports = app;
