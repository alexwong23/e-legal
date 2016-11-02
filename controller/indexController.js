
// export functions to index route

module.exports = {
  getHome: function (req, res) {
    res.render('index')
  },
  getAbout: function (req, res) {
    res.render('about')
  },
  getSignup: function (req, res) {
    res.render('signup', { message: req.flash('signupMessage') })
  },
  getLogin: function (req, res) {
    res.render('login', { message: req.flash('loginMessage') })
  },
  getLogout: function (req, res) {
    req.logout()
    res.redirect('/')
  }
}
