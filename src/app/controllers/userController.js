const User = require('../models/user');
const { multipleMongooseToObject, mongooseToObject } = require('../../untils/mongoose');

class UserController {
  async index(req, res) {
    res.render('index.hbs', {
      layout: false,
    });
  }

  async profile(req, res) {
    const userId = req.session.userId;
    const user = mongooseToObject(await User.findById(userId));
    res.render('user/profile.hbs', {
      layout: 'userLayout.hbs',
      user: user
    });
  }

  async updateUser(req, res) {
    const userId = req.session.userId;

    const userUpdate = {
        UserName : req.body.UserName,
        Email : req.body.Email,
        Address : req.body.Address,
        PhoneNumber : req.body.PhoneNumber
    };

    await User.updateOne({ _id: userId } , userUpdate);

    return res.redirect('/User');
  }

  async password(req,res)
    {
      res.render('user/replacepassword.hbs',{
          layout: 'userLayout.hbs'
      })
    }

  async replacePassword(req, res) {
    var oldPassWord = req.body.OldPassWord;
    var newPassWord = req.body.NewPassWord;
    var UserID = req.session.userId;
    const user = mongooseToObject(await User.findById(UserID));
    if(user) {
      if(oldPassWord == user.Password ){
        await User.updateOne({_id: UserID}, {Password: newPassWord});
        return res.redirect('/User');
      }
      else{
          res.status(200).json({result: false});
        }
      }
      else{
          res.status(200).json({result: false});
      }
  }

}

module.exports = new UserController();
