const User = require('../models/user');

function isLoginMiddleWare(req, res, next) {
  const email = req.session.email;
  const authorize = req.session.authorize;
  const id = req.session.userId;

  if (email && authorize && id) {
    return next();
  }

  return res.redirect('/login');
}
module.exports = isLoginMiddleWare;
