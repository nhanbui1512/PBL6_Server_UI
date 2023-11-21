class LogoutController {
  async index(req, res) {
    req.session.destroy();
    return res.redirect('/');
  }
}

module.exports = new LogoutController();
