module.exports = (err, req, res, next) => {
  console.log(err.message);

  if (err.message === 'jwt expired') {
    return res.send(401, 'Token Expired');
  }

  const invalidTokenMessages = [
    'invalid token',
    'invalid signature',
    'jwt malformed',
    'No authorization token was found',
  ];
  if (invalidTokenMessages.includes(err.message)) {
    return res.send(401, 'Invalid Token');
  }

  return res.send(500);
};
