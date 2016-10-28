var express = require('express')
var router = express.Router()

function userCheck (req, res, next) {
  if (req.isAuthenticated(req, res, next)) {
    return next()
  } else {
    req.flash('loginMessage', 'You have not logged in')
    return res.redirect('/login')
  }
}

router.get('/', userCheck, function (req, res) {
  res.render('user/index', { message: req.flash('userMessage') })
})

module.exports = router
