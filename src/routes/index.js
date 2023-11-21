const rootRouter = require('./rootRouter');
const loginRouter = require('./loginRouter');
const adminRouter = require('./adminRouter');

const isLoginMiddleWare = require('../app/middlewares/login');
const adminMidleWare = require('../app/middlewares/admin');

function route(app) {
  app.use('/login', loginRouter);
  app.use('/admin', adminRouter);
  app.use('/', isLoginMiddleWare, rootRouter);
}

module.exports = route;
