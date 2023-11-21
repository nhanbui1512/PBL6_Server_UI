const rootRouter = require('./rootRouter');
const loginRouter = require('./loginRouter');
const logoutRouter = require('./logoutRouter');

const adminRouter = require('./adminRouter');

const isLoginMiddleWare = require('../app/middlewares/login');
const adminMidleWare = require('../app/middlewares/admin');

function route(app) {
  app.use('/login', loginRouter);
  app.use('/admin', adminMidleWare, adminRouter);
  app.use('/logout', logoutRouter);
  app.use('/', isLoginMiddleWare, rootRouter);
}

module.exports = route;
