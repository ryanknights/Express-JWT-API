module.exports = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.sendStatus(403);
  }
  return next();
};
