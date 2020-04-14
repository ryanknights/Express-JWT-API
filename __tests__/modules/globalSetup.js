const Fixtures = require('node-mongodb-fixtures');
const env = require('dotenv');

module.exports = async () => {
  env.config();
  process.env.NODE_ENV = 'test';
  process.env.adminId = '4edd40c86762e0fb12000001';
  process.env.userId = '4edd40c86762e0fb12000002';

  const fixtures = new Fixtures({
    dir: '__tests__/fixtures',
    filter: '.*',
  });
  let connectionString = 'mongodb://';
  if (process.env.DB_TEST_AUTH === 'true') {
    connectionString += `${process.env.DB_TEST_USER}:${process.env.DB_TEST_PASSWORD}@`;
  }
  connectionString += `${process.env.DB_TEST_HOST}/${process.env.DB_TEST_NAME}`;
  return fixtures.connect(connectionString)
    .then(() => fixtures.unload())
    .then(() => fixtures.load())
    .catch((e) => console.error(e))
    .finally(() => fixtures.disconnect());
};
