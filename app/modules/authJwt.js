const expressJwt = require('express-jwt');
const jwtSecret = require('../config/secret');

module.exports = expressJwt({ secret: jwtSecret.secret });
