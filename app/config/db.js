const mongoose = require('mongoose');

mongoose.set('debug', true);

module.exports = mongoose.connect('mongodb://admin:password@178.62.109.21/expressapi');