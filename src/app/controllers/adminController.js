class AdminController {
  async index(req, res, next) {
    res.render('admin/index.hbs', {
      layout: 'adminLayout.hbs',
    });
  }
}

module.exports = new AdminController();
