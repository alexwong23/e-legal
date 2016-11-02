var express = require('express')
var router = express.Router()
var matchController = require('../controller/matchController')

// render match home page, which is vote page
// find matches with status 'TIMED' or 'SCHEDULED' && within +- 3 hours from current time
// find matches user voted in vote collection, push to array to disable user from voting again
// find all team data and nest in object
router.get('/', matchController.getVote)

// find all matches with status 'FINISHED', sort latest date on top
// find all team data and nest in object
router.get('/finished', matchController.getFinished)

// if user token input less than 0 or higher than no of tokens user has, don't create new vote
// if false, create new vote, and reduce user tokens
router.post('/newVote', matchController.postNewVote)

// ajax post to update db
// count no of fixtures in external data, run each fixture in func 'updateResult'
// if fixture matchNo does not exist in db, create a new match
// if fixture matchNo exists in db, update match details
// if match details is finished, query match result (home, away, draw)
// find all votes with matchNo && result null, each vote run func closuresNo2
// query token and score based on match result and user vote
// find the user, update tokens and score
// find user vote, update token return and match result
// why not update all votes at first, cause updating each null vote one by one
router.post('/timed', matchController.postUpdateMatchFromAPI)
router.post('/finished', matchController.postUpdateMatchFromAPI)

// ajax post to update team collection (heroku team data not updated) (manual)
// count no of teams in external data, run each team in func 'oneTeam'
// oneTeam func finds if team in db, if not exist, add team to db collection
router.post('/teamdata', matchController.postUpdateTeamFromAPI)

module.exports = router
