var express = require('express')
var router = express.Router()
var User = require('../models/user')
var Match = require('../models/match')
var Vote = require('../models/vote')
var Team = require('../models/team')

router.get('/', function (req, res) {
  Match.find({'status': 'TIMED', 'date': {$gt: new Date(new Date().setHours(new Date().getHours() + 3))}}, function (err, timedArr) {
    if (err) throw new Error(err)
    Vote.find({'userid': req.user}, function (err, votes) {
      if (err) throw new Error(err)
      var userVotesArr = []
      for (var i = 0; i < votes.length; i++) {
        userVotesArr.push(votes[i].matchNo)
      }
      Team.find({}, function (err, teamDetails) {
        if (err) throw new Error(err)
        var teamObj = {
          crests: {},
          shortName: {}
        }
        for (var j = 0; j < teamDetails.length; j++) {
          teamObj.crests[teamDetails[j].name] = teamDetails[j].crestUrl
          teamObj.shortName[teamDetails[j].name] = teamDetails[j].shortName
        }
        res.render('match/index', {
          message: req.flash('matchMessage'),
          timedArr: timedArr,
          userVotesArr: userVotesArr,
          teamObj: teamObj,
          user_id: req.user
        })
      })
    })
  })
})

router.get('/finished', function (req, res) {
  Match.find({'status': 'FINISHED'}).sort({'date': -1}).exec(function (err, finishedMatches) {
    if (err) throw new Error(err)
    Team.find({}, function (err, teamDetails) {
      if (err) throw new Error(err)
      var teamObj = {
        crests: {},
        shortName: {}
      }
      for (var j = 0; j < teamDetails.length; j++) {
        teamObj.crests[teamDetails[j].name] = teamDetails[j].crestUrl
        teamObj.shortName[teamDetails[j].name] = teamDetails[j].shortName
      }
      res.render('match/finished', {
        finishedMatches: finishedMatches,
        teamObj: teamObj
      })
    })
  })
})

router.post('/newVote', function (req, res) {
  if (req.body.token < 0 || req.body.token > req.user.local.tokens) {
    res.json({status: 'fail'})
  } else {
    Match.findOne({'matchNo': req.body.matchInfo.matchNo}, function (err, matchInfo) {
      if (err) throw new Error(err)
      var newVote = new Vote({
        userid: req.user.id,
        matchid: matchInfo._id,
        matchNo: req.body.matchInfo.matchNo,
        vote: req.body.vote,
        amount: req.body.token,
        return: null,
        result: null
      })
      newVote.save(function (err) {
        if (err) res.json({status: 'fail'})
        var tokensLeft = req.user.local.tokens - req.body.token
        User.findOneAndUpdate({'_id': req.user.id}, {'local.tokens': tokensLeft}, function (err) {
          if (err) res.json({status: 'fail'})
        })
        res.json({status: 'ok'})
      })
    })
  }
})

router.post('/timed', function (req, res) {
  var noOfMatches = req.body.count
  var regex = /.*?(\d+)$/
  for (var i = 0; i < noOfMatches; i++) {
    updateResult(i)
  }
  // closures!
  function updateResult (i) {
    var matchnumber = (regex.exec(req.body.fixtures[i]._links.self.href))[1]
    Match.findOne({'matchNo': matchnumber}, function (err, timedMatch) {
      if (err) throw new Error(err)
      if (timedMatch) {
        Match.findOneAndUpdate({'matchNo': matchnumber}, {
          date: req.body.fixtures[i].date,
          status: req.body.fixtures[i].status,
          result: {
            goalsHomeTeam: req.body.fixtures[i].result.goalsHomeTeam,
            goalsAwayTeam: req.body.fixtures[i].result.goalsAwayTeam
          }
        }, function (err, data) {
          if (err) throw new Error(err)
          if (data) {
            if (data.status === 'FINISHED') {
              var matchResult
              if (data.result.goalsHomeTeam === data.result.goalsAwayTeam) {
                matchResult = 'draw'
              } else if (data.result.goalsHomeTeam > data.result.goalsAwayTeam) {
                matchResult = 'homeTeam'
              } else if (data.result.goalsHomeTeam < data.result.goalsAwayTeam) {
                matchResult = 'awayTeam'
              }
              Vote.find({'matchNo': data.matchNo, 'result': null}, function (err, userVotes) {
                if (err) throw new Error(err)
                for (var i = 0; i < userVotes.length; i++) {
                  closuresNo2()
                }
                function closuresNo2 () {
                  var userId = userVotes[i].userid
                  var userPredict = userVotes[i].vote
                  var userToken = 0
                  var userScore = 0
                  if (userPredict === matchResult) {
                    userToken += (userVotes[i].amount * 2)
                    userScore = 1
                  } else if (matchResult === 'draw') {
                    userToken += (userVotes[i].amount)
                  }
                  if (matchResult !== null) {
                    User.findOneAndUpdate({'_id': userId}, {
                      $inc: {
                        'local.tokens': userToken,
                        'local.score': userScore
                      }
                    }, function (err) {
                      if (err) throw new Error(err)
                      Vote.findOneAndUpdate({'userid': userId, 'matchNo': data.matchNo}, {
                        'return': userToken,
                        'result': matchResult
                      }, function (err, answer) {
                        if (err) throw new Error(err)
                        console.log(answer)
                      })
                    })
                  }
                }
              })
            }
          }
        })
      }
      if (!timedMatch) {
        var newMatch = new Match({
          matchNo: (regex.exec(req.body.fixtures[i]._links.self.href))[1],
          date: req.body.fixtures[i].date,
          status: req.body.fixtures[i].status,
          matchday: req.body.fixtures[i].matchday,
          homeTeam: req.body.fixtures[i].homeTeamName,
          awayTeam: req.body.fixtures[i].awayTeamName,
          result: {
            goalsHomeTeam: req.body.fixtures[i].result.goalsHomeTeam,
            goalsAwayTeam: req.body.fixtures[i].result.goalsAwayTeam
          },
          odds: {
            homeWin: req.body.fixtures[i].odds.homeWin,
            draw: req.body.fixtures[i].odds.draw,
            awayWin: req.body.fixtures[i].odds.awayWin
          }
        })
        newMatch.save(function (err) {
          if (err) throw new Error(err)
        })
      }
    })
  }
  res.json({'updated': 'ok'})
})

router.post('/finished', function (req, res) {
  var noOfMatches = req.body.count
  var regex = /.*?(\d+)$/
  for (var i = 0; i < noOfMatches; i++) {
    updateResult(i)
  }
  // closures!
  function updateResult (i) {
    var matchnumber = (regex.exec(req.body.fixtures[i]._links.self.href))[1]
    Match.findOne({'matchNo': matchnumber}, function (err, timedMatch) {
      if (err) throw new Error(err)
      if (timedMatch) {
        Match.findOneAndUpdate({'matchNo': matchnumber}, {
          date: req.body.fixtures[i].date,
          status: req.body.fixtures[i].status,
          result: {
            goalsHomeTeam: req.body.fixtures[i].result.goalsHomeTeam,
            goalsAwayTeam: req.body.fixtures[i].result.goalsAwayTeam
          }
        }, function (err, data) {
          if (err) throw new Error(err)
          if (data) {
            if (data.status === 'FINISHED') {
              var matchResult
              if (data.result.goalsHomeTeam === data.result.goalsAwayTeam) {
                matchResult = 'draw'
              } else if (data.result.goalsHomeTeam > data.result.goalsAwayTeam) {
                matchResult = 'homeTeam'
              } else if (data.result.goalsHomeTeam < data.result.goalsAwayTeam) {
                matchResult = 'awayTeam'
              }
              Vote.find({'matchNo': data.matchNo, 'result': null}, function (err, userVotes) {
                if (err) throw new Error(err)
                for (var i = 0; i < userVotes.length; i++) {
                  closuresNo2()
                }
                function closuresNo2 () {
                  var userId = userVotes[i].userid
                  var userPredict = userVotes[i].vote
                  var userToken = 0
                  var userScore = 0
                  if (userPredict === matchResult) {
                    userToken += (userVotes[i].amount * 2)
                    userScore = 1
                  } else if (matchResult === 'draw') {
                    userToken += (userVotes[i].amount)
                  }
                  if (matchResult !== null) {
                    User.findOneAndUpdate({'_id': userId}, {
                      $inc: {
                        'local.tokens': userToken,
                        'local.score': userScore
                      }
                    }, function (err) {
                      if (err) throw new Error(err)
                      Vote.findOneAndUpdate({'userid': userId, 'matchNo': data.matchNo}, {
                        'return': userToken,
                        'result': matchResult
                      }, function (err, answer) {
                        if (err) throw new Error(err)
                        console.log(answer)
                      })
                    })
                  }
                }
              })
            }
          }
        })
      }
      if (!timedMatch) {
        var newMatch = new Match({
          matchNo: (regex.exec(req.body.fixtures[i]._links.self.href))[1],
          date: req.body.fixtures[i].date,
          status: req.body.fixtures[i].status,
          matchday: req.body.fixtures[i].matchday,
          homeTeam: req.body.fixtures[i].homeTeamName,
          awayTeam: req.body.fixtures[i].awayTeamName,
          result: {
            goalsHomeTeam: req.body.fixtures[i].result.goalsHomeTeam,
            goalsAwayTeam: req.body.fixtures[i].result.goalsAwayTeam
          },
          odds: {
            homeWin: req.body.fixtures[i].odds.homeWin,
            draw: req.body.fixtures[i].odds.draw,
            awayWin: req.body.fixtures[i].odds.awayWin
          }
        })
        newMatch.save(function (err) {
          if (err) throw new Error(err)
        })
      }
    })
  }
  res.json({'updated': 'ok'})
})

router.post('/teamdata', function (req, res) {
  var noOfTeams = req.body.count
  for (var i = 0; i < noOfTeams; i++) {
    Team.findOne({'name': req.body.teams[i].name}, function (err, existingTeam) {
      if (err) throw new Error(err)
      if (!existingTeam) {
        var convertNumber = req.body.teams[i].squadMarketValue.replace(/,| |€/g, '')
        var newTeam = new Team({
          name: req.body.teams[i].name,
          shortName: req.body.teams[i].shortName,
          squadMarketValue_Euro: convertNumber,
          crestUrl: req.body.teams[i].crestUrl
        })
        newTeam.save(function (err) {
          if (err) throw new Error(err)
        })
      }
    })
  }
  res.json({status: 'ok'})
})

module.exports = router
