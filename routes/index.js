var express = require('express')
var router = express.Router()
var passport = require('passport')
var User = require('../models/user')
var cron = require('node-cron')

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

router.get('/', function (req, res) {
  res.render('index')
})

router.route('/login')
.get(loginCheck, function (req, res) {
  res.render('login', { message: req.flash('loginMessage') })
})
.post(passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

router.route('/signup')
  .get(signupCheck, function (req, res) {
    res.render('signup', { message: req.flash('signupMessage') })
  })
  .post(passport.authenticate('local-signup', {
    successRedirect: '/users',
    failureRedirect: '/signup',
    failureFlash: true
  }))

router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})

module.exports = router
