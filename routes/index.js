var express = require('express')
var router = express.Router()
var passport = require('passport')

var indexController = require('../controller/indexController')

// login & signup check function
// if user is already login, redirect to user page with flash
// if user is not login, allow codes to continue
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

// functions in indexController
router.get('/', indexController.getHome)
router.get('/logout', indexController.getLogout)
router.get('/about', indexController.getAbout)

// login route with get and post, post with passport
router.route('/login')
.get(loginCheck, indexController.getLogin)
.post(passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

// signup route with get and post, post with passport
router.route('/signup')
  .get(signupCheck, indexController.getSignup)
  .post(passport.authenticate('local-signup', {
    successRedirect: '/users',
    failureRedirect: '/signup',
    failureFlash: true
  }))

module.exports = router
