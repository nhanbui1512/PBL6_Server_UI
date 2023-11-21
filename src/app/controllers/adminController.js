const User = require('../models/user');
const { multipleMongooseToObject, mongooseToObject } = require('../../untils/mongoose');

class AdminController {
  async index(req, res) {
    res.render('admin/index.hbs', {
      layout: 'adminLayout.hbs',
    });
  }

  async listUser(req, res) {
    const users = multipleMongooseToObject(await User.find());
    return res.render('admin/listUser.hbs', {
      layout: 'adminLayout.hbs',
      data: users,
    });
  }

  async detailUser(req, res) {
    const id = req.params.id;
    const user = mongooseToObject(await User.findById(id));

    if (user) {
      return res.render('admin/detailUser.hbs', {
        layout: 'adminLayout.hbs',
        data: user,
      });
    }

    return res.redirect('/admin/list-user');
  }

  async password(req, res) {
    return res.render('admin/password.hbs', {
      layout: 'adminLayout.hbs',
    });
  }

  async profile(req, res) {
    return res.render('admin/profile.hbs', { layout: 'adminLayout.hbs' });
  }

  async createAccount(req, res) {
    return res.render('admin/createAccount.hbs', {
      layout: 'adminLayout.hbs',
    });
  }

  async changePassWord(req, res) {
    const oldPassWord = req.body.oldpass;
    const newPassWord = req.body.newpass;
    const UserID = req.session.userId;

    try {
      const user = await User.findById(UserID);
      if (user) {
        if (oldPassWord == user.Password) {
          user.Password = newPassWord;
          await user.save();
          return res.status(200).json({ result: true });
        } else {
          return res.status(200).json({ result: false });
        }
      } else {
        return res.status(200).json({ result: false });
      }
    } catch (error) {
      return res.status(200).json({ result: false });
    }
  }
}

module.exports = new AdminController();
