const mongoose = require('mongoose');

afterAll((done) => {
  mongoose.connection.close();
  done();
});
