
var User = require('../models/user')
var Vote = require('../models/vote')

// export functions to user route
module.exports = {
  getProfile: function (req, res) {
    res.redirect('/users/' + req.user.id)
  },
  getRankings: function (req, res) {
    User.find().sort({'local.tokens': -1}).exec(function (err, allUsers) {
      if (err) throw new Error(err)
      var userIndex = allUsers.map(function (e) { return e.local.username }).indexOf(req.user.local.username) + 1
      res.render('user/rank', {
        allUsers: allUsers,
        userIndex: userIndex
      })
    })
  },
  getPersonal: function (req, res) {
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
  },
  deletePersonal: function (req, res) {
    User.findOneAndRemove({'_id': req.user.id}, function (err, removeUser) {
      if (err) throw new Error(err)
      Vote.remove({'userid': req.user.id}, function (err, removeUserVotes) {
        if (err) throw new Error(err)
        res.redirect('../')
      })
    })
  },
  getPersonalEdit: function (req, res) {
    User.find({'_id': req.user.id}, function (err, userDetails) {
      if (err) throw new Error(err)
      res.render('user/edit', {
        message: req.flash('editMessage')
      })
    })
  },
  putPersonalEdit: function (req, res) {
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
  },
  getOtherUser: function (req, res) {
    User.find({'_id': req.params.otherid}, function (err, otherUser) {
      if (err) throw new Error(err)
      Vote.find({'userid': req.params.otherid})
      .populate('userid')
      .populate('matchid')
      .exec(function (err, voteArr) {
        if (err) throw new Error(err)
        res.render('user/otherUser', {
          message: req.flash('userMessage'),
          otherUser: otherUser,
          voteArr: voteArr
        })
      })
    })
  }
}
