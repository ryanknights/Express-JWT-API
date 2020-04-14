const mongoose = require('mongoose');

const isTest = (process.env.NODE_ENV === 'test');
const debugKey = (!isTest) ? 'DB_DEBUG' : 'DB_TEST_DEBUG';
const authKey = (!isTest) ? 'DB_AUTH' : 'DB_TEST_AUTH';
const userKey = (!isTest) ? 'DB_USER' : 'DB_TEST_USER';
const passwordKey = (!isTest) ? 'DB_PASSWORD' : 'DB_TEST_PASSWORD';
const hostKey = (!isTest) ? 'DB_HOST' : 'DB_TEST_HOST';
const nameKey = (!isTest) ? 'DB_NAME' : 'DB_TEST_NAME';

mongoose.set('debug', process.env[debugKey]);

let connectionString = 'mongodb://';

if (process.env[authKey] === 'true') {
  connectionString += `${process.env[userKey]}:${process.env[passwordKey]}@`;
}

connectionString += `${process.env[hostKey]}/${process.env[nameKey]}`;

const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

module.exports = mongoose.connect(connectionString, config, (err) => {
  if (err) {
    return console.log(err);
  }
  return true;
});
