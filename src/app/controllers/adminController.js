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
    const id = req.session.userId;
    const profileData = await User.findById(id);

    return res.render('admin/profile.hbs', {
      layout: 'adminLayout.hbs',
      user: profileData.toObject(),
    });
  }

  async createAccountView(req, res) {
    return res.render('admin/createAccount.hbs', {
      layout: 'adminLayout.hbs',
    });
  }

  async registerAccount(req, res) {
    const data = {
      UserName: req.body.UserName,
      Email: req.body.Email,
      Password: req.body.Password,
      PhoneNumber: req.body.PhoneNumber,
      Address: req.body.Address,
    };

    try {
      const isValidUser = mongooseToObject(await User.findOne({ Email: data.Email }));
      if (isValidUser === null) {
        await User.create(data);
        return res.status(200).json({ result: true });
      } else {
        return res.status(200).json({ result: false });
      }
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ result: false, message: error.message });
    }
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

  async updateUser(req, res) {
    const userId = req.query.ID;
    const data = {
      UserName: req.body.UserName,
      Addresss: req.body.Address,
      PhoneNumber: req.body.PhoneNumber,
    };

    console.log(data);
    try {
      const user = await User.findById(userId);
      if (user.toObject() === null) {
        throw new Error('not found user');
      }

      // user.UserName = data.UserName;
      // user.Address = data.Addresss;
      // user.PhoneNumber = data.PhoneNumber;

      // await user.save();
      return res.redirect('/admin/list-user');
    } catch (error) {
      console.log(error.message);
      return res.render('error.hbs', { layout: false });
    }
  }

  async updateProfile(req, res) {
    const data = {
      UserName: req.body.UserName,
      PhoneNumber: req.body.PhoneNumber,
      Address: req.body.Address,
    };
    try {
      const user = await User.findById(req.session.userId);
      user.UserName = data.UserName;
      user.PhoneNumber = data.PhoneNumber;
      user.Address = data.Address;
      await user.save();
      return res.redirect('/admin/profile');
    } catch (error) {
      console.log(error.message);
      res.send(`Error ${error.message}`);
    }
  }
}

module.exports = new AdminController();
