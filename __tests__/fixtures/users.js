const mongoose = require('mongoose');

module.exports = [
  {
    _id: mongoose.Types.ObjectId(process.env.adminId),
    username: 'admin',
    email: 'admin@test.com',
    password: '$2b$10$68wNObR18sm0TBPTJLDXz.kfkPsfvwHjAOPCWLflPUGyPJmE.0iwC',
    isAdmin: true,
    created: Date.now(),
    refreshToken: false,
  },
  {
    _id: mongoose.Types.ObjectId(process.env.userId),
    username: 'user',
    email: 'user@test.com',
    password: '$2b$10$68wNObR18sm0TBPTJLDXz.kfkPsfvwHjAOPCWLflPUGyPJmE.0iwC',
    isAdmin: false,
    created: Date.now(),
    refreshToken: false,
  },
  {
    _id: mongoose.Types.ObjectId(),
    username: 'duplicate',
    email: 'duplicate@test.com',
    password: '$2b$10$68wNObR18sm0TBPTJLDXz.kfkPsfvwHjAOPCWLflPUGyPJmE.0iwC',
    isAdmin: false,
    created: Date.now(),
    refreshToken: false,
  },
];
