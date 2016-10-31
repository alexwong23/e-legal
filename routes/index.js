var express = require('express')
var router = express.Router()
var passport = require('passport')
var User = require('../models/user')
var cron = require('node-cron')

var indexController = require('../controller/indexController')

router.get('/', indexController.getHome)
router.get('/logout', indexController.getLogout)
router.get('/about', indexController.getAbout)

// update every monday 0000 hours
cron.schedule('0 0 0 * * 1', function () {
  User.update({}, {
    $inc: {'local.tokens': 10}
  }, {multi: true}, function (err) {
    if (err) throw new Error(err)
  })
})

function loginCheck (req, res, next) {
  if (req.isAuthenticated(req, res, next)) {
    req.flash('userMessage', 'You are already logged in!')
    return res.redirect('/users')
  } else {
    return next()
  }
}
function signupCheck (req, res, next) {
  if (req.isAuthenticated(req, res, next)) {
    req.flash('userMessage', 'You are already logged in!')
    return res.redirect('/users')
  } else {
    return next()
  }
}

router.route('/login')
.get(loginCheck, indexController.getLogin)
.post(passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

router.route('/signup')
  .get(signupCheck, indexController.getSignup)
  .post(passport.authenticate('local-signup', {
    successRedirect: '/users',
    failureRedirect: '/signup',
    failureFlash: true
  }))

module.exports = router
