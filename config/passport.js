var LocalStrategy = require('passport-local').Strategy

var User = require('../models/user')

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user)
    })
  })

  passport.use('local-login', new LocalStrategy({
    usernameField: 'user[local][username]',
    passwordField: 'user[local][password]',
    passReqToCallback: true
  }, function (req, username, password, next) {
    User.findOne({'local.username': username}, function (err, foundUser) {
      if (err) return next(err)
      if (foundUser) {
        foundUser.authenticate(password, function (err, passwordCorrect) {
          if (err) throw new Error(err)
          if (passwordCorrect) {
            return next(null, foundUser, req.flash('userMessage', 'Welcome back ' + username))
          } else {
            return next(null, false, req.flash('loginMessage', 'Invalid Username or Password'))
          }
        })
      }
      if (!foundUser) {
        return next(null, false, req.flash('loginMessage', 'Username does not exist'))
      }
    })
  }))

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'user[local][username]',
    passwordField: 'user[local][password]',
    passReqToCallback: true
  }, function (req, username, password, next) {
    User.findOne({'local.username': username}, function (err, foundUser) {
      if (err) return next(err)
      if (foundUser) {
        return next(null, false, req.flash('signupMessage', 'Username has been taken'))
      } else {
        if (!req.body.user.local.email) {
          return next(null, false, req.flash('signupMessage', 'Please fill in the required fields'))
        } else {
          var newUser = new User({
            local: {
              username: username,
              password: password,
              handphone: req.body.user.local.handphone,
              email: req.body.user.local.email,
              favTeam: req.body.user.local.favTeam,
              tokens: 10,
              score: 0
            }
          })
          newUser.save(function (err, newUser) {
            if (err) throw err
            return next(null, newUser)
          })
        }
      }
    })
  }))
}
