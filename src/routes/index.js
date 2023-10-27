const rootRouter = require("./rootRouter");

function route(app) {
  app.use("/", rootRouter);
}

module.exports = route;
