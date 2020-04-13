const ObjectId = require('mongodb').ObjectID;

module.exports = [
  {
    _id: ObjectId(),
    username: 'admin',
    email: 'admin@test.com',
    password: '$2y$10$f7yntDsLTcCYcWop2UTjs.tpZXJg6SieGniGEfNzaa3kC5mHketBy',
    isAdmin: true,
    created: Date.now(),
    refreshToken: false,
  },
  {
    _id: ObjectId(),
    username: 'user',
    email: 'user@test.com',
    password: '$2y$10$f7yntDsLTcCYcWop2UTjs.tpZXJg6SieGniGEfNzaa3kC5mHketBy',
    isAdmin: false,
    created: Date.now(),
    refreshToken: false,
  },
];
