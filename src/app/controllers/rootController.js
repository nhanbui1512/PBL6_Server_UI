class rootController {
  index(req, response) {
    response.render("index.hbs", { layout: false });
  }
}

module.exports = new rootController();
