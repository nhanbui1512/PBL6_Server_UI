const { PERMISSIONS } = require('../constants');

async function adminMidleWare(req, res, next) {
  const auth = req.session.authorize;

  for (let i = 0; i < PERMISSIONS.length; i++) {
    if (PERMISSIONS[i].name == 'Admin' && PERMISSIONS[i].id == auth) {
      return next();
    }
  }

  return res.redirect('/login');
}

module.exports = adminMidleWare;
