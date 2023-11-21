const User = require('../models/user');

class LoginController {
  async index(req, res, next) {
    return res.render('login.hbs', {
      layout: false,
    });
  }

  async login(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    try {
      const user = await User.findOne({ Email: email, Password: password });
      if (user) {
        req.session.userId = user.id;
        req.session.email = email;
        req.session.authorize = user.Permission.id;
        return res.status(200).json({ result: true, permission: 1 });
      }
      return res.status(200).json({ result: false });
    } catch (error) {
      return res.status(500);
    }
  }
}

module.exports = new LoginController();
