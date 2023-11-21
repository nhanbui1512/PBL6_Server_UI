const User = require('../models/user');
const { multipleMongooseToObject, mongooseToObject } = require('../../untils/mongoose');

class UserController {
//   async index(req, res) {
//     res.render('user/index.hbs', {
//       layout: 'userLayout.hbs',
//     });
//   }

  async profile(req, res) {
    const userId = req.session.userId
    const user = await User.findById(userId);
    console.log(user)
    res.render('user/profile.hbs', {
      layout: 'userLayout.hbs',
      user: user
    });
  }

}

module.exports = new UserController();
