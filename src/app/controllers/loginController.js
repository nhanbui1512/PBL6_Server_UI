const user = require('../models/user');
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
        return res.status(200).json({ result: true, permission: 1 });
      }
      return res.status(200).json({ result: false });
    } catch (error) {
      res.status(500);
    }
  }
}

module.exports = new LoginController();
