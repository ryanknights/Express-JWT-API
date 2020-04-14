const mongoose = require('mongoose');

module.exports = [
  {
    _id: mongoose.mongo.ObjectId(),
    title: 'Test 1',
    content: 'Some test content',
    created: Date.now(),
    userId: mongoose.Types.ObjectId(process.env.userId),
  },
  {
    _id: mongoose.mongo.ObjectId(),
    title: 'Test 2',
    content: 'Some more test content',
    created: Date.now(),
    userId: mongoose.Types.ObjectId(process.env.adminId),
  },
];
