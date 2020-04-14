module.exports = {
  testEnvironment: 'node',
  testRegex: '__tests__/.*.test.js$',
  setupFilesAfterEnv: [
    './__tests__/modules/afterAll.js',
  ],
  globalSetup: './__tests__/modules/globalSetup.js',
};
