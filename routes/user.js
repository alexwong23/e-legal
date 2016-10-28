var express = require('express')
var router = express.Router()
var Vote = require('../models/vote')
var User = require('../models/user')

function userCheck (req, res, next) {
  if (req.isAuthenticated(req, res, next)) {
    return next()
  } else {
    req.flash('loginMessage', 'You have not logged in')
    return res.redirect('/login')
  }
}

router.get('/', userCheck, function (req, res) {
  res.redirect('/users/' + req.user.id)
})

router.get('/:id', userCheck, function (req, res) {
  Vote.find({'userid': req.user.id})
  .populate('userid')
  .populate('matchid')
  .exec(function (err, voteArr) {
    if (err) throw new Error(err)
    res.render('user/index', {
      message: req.flash('userMessage'),
      voteArr: voteArr
    })
  })
})

router.get('/:id/edit', userCheck, function (req, res) {
  User.find({'_id': req.user.id}, function (err, userDetails) {
    if (err) throw new Error(err)
    res.render('user/edit', {
      message: req.flash('editMessage')
    })
  })
})

router.put('/:id/edit', function (req, res) {
  console.log((req.body.user.local.password).length)
  if ((req.body.user.local.password).length === 0) {
    req.flash('editMessage', 'Invalid password')
    res.render('user/edit', {
      message: req.flash('editMessage')
    })
  } else {
    User.findOneAndUpdate({'_id': req.user.id}, {
      'local.password': req.body.user.local.password,
      'local.handphone': req.body.user.local.handphone,
      'local.email': req.body.user.local.email,
      'local.favTeam': req.body.user.local.favTeam
    }, function (err) {
      if (err) throw new Error(err)
      res.redirect('/users')
    })
  }
})

router.delete('/:id', userCheck, function (req, res) {
  User.findOneAndRemove({'_id': req.user.id}, function (err, removeUser) {
    if (err) throw new Error(err)
    res.redirect('../')
  })
})

module.exports = router
