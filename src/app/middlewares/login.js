const { PERMISSIONS } = require('../constants');
const User = require('../models/user');

async function isLoginMiddleWare(req, res, next) {
  const email = req.session.email;
  const authorize = req.session.authorize;
  const id = req.session.userId;

  const user = await User.findById(id);

  if (user == null) return res.redirect('/login');

  for (let i = 0; i < PERMISSIONS.length; i++) {
    if (email && authorize === PERMISSIONS[i].id && id) {
      return next();
    }
  }

  return res.redirect('/login');
}
module.exports = isLoginMiddleWare;
