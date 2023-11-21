const User = require('../models/user');
const { multipleMongooseToObject } = require('../../untils/mongoose');

class AdminController {
  async index(req, res) {
    res.render('admin/index.hbs', {
      layout: 'adminLayout.hbs',
    });
  }
  async detailUser(req, res) {
    const id = req.params.id;
    console.log(id);

    res.render('admin/detailUser.hbs', {
      layout: 'adminLayout.hbs',
    });
  }

  async listUser(req, res) {
    const users = multipleMongooseToObject(await User.find());
    console.log(users);
    return res.render('admin/listUser.hbs', {
      layout: 'adminLayout.hbs',
    });
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
}

module.exports = new AdminController();
