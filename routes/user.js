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

router.get('/', userCheck, userController.getProfile)

router.get('/rankings', userCheck, userController.getRankings)

router.route('/:id')
      .get(userCheck, userController.getPersonal)
      .delete(userController.deletePersonal)

router.route('/:id/edit')
      .get(userCheck, userController.getPersonalEdit)
      .put(userController.putPersonalEdit)

router.get('/:id/:otherid', userCheck, userController.getOtherUser)

module.exports = router
