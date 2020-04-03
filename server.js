const express = require('express');
const httpModule = require('http');

const app = express();
const http = httpModule.Server(app);
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const env = require('dotenv');

env.config();

const port = process.env.PORT || 4007;

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

// Start Application
http.listen(port, () => console.log(`App listening on port ${port}`));
