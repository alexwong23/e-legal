var express = require('express')
var router = express.Router()
var userController = require('../controller/userController')

// user check function
// if user is already login, allow codes to continue
// if user is not login, redirect to login page with flash
function userCheck (req, res, next) {
  if (req.isAuthenticated(req, res, next)) {
    return next()
  } else {
    req.flash('loginMessage', 'You have not logged in')
    return res.redirect('/login')
  }
}

// redirect to users/:id (personal profile page)
router.get('/', userCheck, userController.getProfile)

// find all user details, sort by highest token first
// get index of user in array (determine user rank)
// render user rank page
router.get('/rankings', userCheck, userController.getRankings)

// find votes with user id, populate vote with user and match data
// render user personal profile page
// remove user from user collection, remove all votes by user in vote collection
router.route('/:id')
      .get(userCheck, userController.getPersonal)
      .delete(userController.deletePersonal)

// find user details and render user edit profile page
// if user does not input password field, redirect back with error
// else update user fields except username, redirect to user page
router.route('/:id/edit')
      .get(userCheck, userController.getPersonalEdit)
      .put(userController.putPersonalEdit)

// find other user details, find other user votes, populated with user and match details, render otherUser page with other user details
router.get('/:id/:otherid', userCheck, userController.getOtherUser)

module.exports = router
