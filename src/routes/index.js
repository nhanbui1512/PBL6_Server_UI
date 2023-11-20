const rootRouter = require('./rootRouter');
const loginRouter = require('./loginRouter');
const isLoginMiddleWare = require('../app/middlewares/login');

function route(app) {
  app.use('/login', loginRouter);
  app.use('/', isLoginMiddleWare, rootRouter);
}

module.exports = route;
