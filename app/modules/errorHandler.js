module.exports = (err, req, res, next) => {
  console.log(err.message);

  if (err.message === 'jwt expired') {
    return res.status(401).send('Token Expired');
  }

  const invalidTokenMessages = [
    'invalid token',
    'invalid signature',
    'jwt malformed',
    'No authorization token was found',
  ];
  if (invalidTokenMessages.includes(err.message)) {
    return res.status(401).send('Invalid Token');
  }

  return res.send(500);
};
