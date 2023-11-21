const { PERMISSIONS } = require('../constants');

async function adminMidleWare(req, res, next) {
  const auth = req.session.authorize;
  PERMISSIONS.forEach((permission) => {
    if (permission.name === 'Admin' && permission.id === auth) {
      next();
    }
  });

  return res.redirect('/login');
}

module.exports = adminMidleWare;
