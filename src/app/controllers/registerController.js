const UserModel = require('../models/user');

class RegisterController {
  async index(req, res, next) {
    res.render('register.hbs', {
      layout: false,
    });
  }

  async register(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const userName = req.body.userName;

    if (password !== confirmPassword) {
      return res.render('register.hbs', {
        layout: false,
        invalidPassword: true,
      });
    }

    const user = await UserModel.findOne({
      Email: email,
    });

    if (user !== null) {
      return res.render('register.hbs', {
        layout: false,
        invalidEmail: true,
      });
    } else {
      const newUser = await UserModel.create({
        Email: email,
        Password: password,
        UserName: userName,
      });

      return res.render('register.hbs', {
        layout: false,
        success: true,
      });
    }
  }
}

module.exports = new RegisterController();
