const rootRouter = require('./rootRouter');
const loginRouter = require('./loginRouter');
const logoutRouter = require('./logoutRouter');
const userRouter = require('./userRouter');
const signUpRouter = require('./signup');

const adminRouter = require('./adminRouter');

const isLoginMiddleWare = require('../app/middlewares/login');
const adminMidleWare = require('../app/middlewares/admin');
const userMidleWare = require('../app/middlewares/user');

function route(app) {
  app.use('/login', loginRouter);
  app.use('/admin', adminMidleWare, adminRouter);
  app.use('/User', userMidleWare, userRouter);
  app.use('/logout', logoutRouter);
  app.use('/signup', signUpRouter);
  app.use('/', isLoginMiddleWare, rootRouter);
}

module.exports = route;
