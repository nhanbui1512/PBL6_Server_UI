const rootRouter = require('./rootRouter');
const loginRouter = require('./loginRouter');

function route(app) {
  app.use('/', rootRouter);
  app.use('/login', loginRouter);
}

module.exports = route;
