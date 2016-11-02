var express = require('express')
var router = express.Router()
var matchController = require('../controller/matchController')

// add 5 matches to mongoDB with 3 hours before match
router.get('/1', matchController.getAPIData1)

// first three games status to in-play, match time is current time (live)
router.get('/2', matchController.getAPIData2)

// three games score update
router.get('/3', matchController.getAPIData3)

// three games score update
router.get('/4', matchController.getAPIData4)

// three games finished
router.get('/5', matchController.getAPIData5)

// three games finished to confirm update data
router.get('/6', matchController.getAPIData5)

// two games after 3 hours disappear
router.get('/7', matchController.getAPIData6)

// render API vote page
router.get('/', matchController.getAPIVotePage)

// update database using same codes from live data update
router.post('/demo', matchController.postUpdateMatchFromAPI)

// delete matches with match date 0 (internal data only)
router.delete('/remove', matchController.deleteAPIData)

module.exports = router
