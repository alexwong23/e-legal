var express = require('express')
var router = express.Router()
var Vote = require('../models/vote')

function userCheck (req, res, next) {
  if (req.isAuthenticated(req, res, next)) {
    return next()
  } else {
    req.flash('loginMessage', 'You have not logged in')
    return res.redirect('/login')
  }
}

router.get('/', userCheck, function (req, res) {
  Vote.find({'userid': req.user.id})
  .populate('userid')
  .populate('matchid')
  .exec(function (err, voteArr) {
    if (err) throw new Error(err)
    console.log(voteArr)
    res.render('user/index', {
      message: req.flash('userMessage'),
      voteArr: voteArr
    })
  })
})

module.exports = router
