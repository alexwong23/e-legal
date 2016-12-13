// require modules & set to variables
var express = require('express')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')
var mongoose = require('mongoose')
var layout = require('express-ejs-layouts')
var dotenv = require('dotenv')
var flash = require('connect-flash')
var session = require('express-session')
var passport = require('passport')
var MongoStore = require('connect-mongo')(session)
// var morgan = require('morgan')

// set app to run express
// server variable for web socket at btm of page
var app = express()
var server = require('http').Server(app)

// connect mongoose to which environment
mongoose.Promise = global.Promise
console.log('the environment is on ' + process.env.NODE_ENV)
dotenv.load({path: '.env.' + process.env.NODE_ENV})
mongoose.connect(process.env.MONGO_URI)

// comment out morgan to prevent clogging of terminal
// set view engine to ejs and use layout
// set session, initialize passport, session, flash
// store data in mongodb, use public folder
// app.use(morgan('dev'))
app.set('view engine', 'ejs')
app.use(layout)
app.use(session({
  secret: process.env.EXPRESS_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    url: process.env.MONGO_URI,
    autoReconnect: true
  })
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(express.static(__dirname + '/public'))

// set routes to variables
var index_routes = require('./routes/index')
var user_routes = require('./routes/user')
var match_routes = require('./routes/match')
var match_api = require('./routes/match_api')

// body parser to get req.body from web page
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

// for passport
require('./config/passport')(passport)

// run methodOverride for all requests
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

// exclusively for getting external api
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// to call 'user' in ejs pages, depends on session user id
app.use(function (req, res, next) {
  res.locals.user = req.user
  next()
})

// connect routes to url
app.use('/', index_routes)
app.use('/users', user_routes)
app.use('/matches', match_routes)
app.use('/api/matches', match_api)

// server listen if either on heroku or localhost
server.listen(process.env.PORT || 4000)
console.log('Server running at http://localhost:4000/')

// CRON jobs
var cron = require('node-cron')
var User = require('./models/user')

// cron scheduler run every 10 seconds
// calling the api main.js via sockets
cron.schedule('*/10 * * * * *', function () {
  io.on('connect', function (socket) {
    socket.emit('call-api', {
      call: true
    })
  })
})
// cron scheduler to run function every monday 0000 hours
// function finds all users and adds 10 tokens to each one
cron.schedule('0 0 0 * * 1', function () {
  User.update({}, {
    $inc: {'local.tokens': 10}
  }, {multi: true}, function (err) {
    if (err) throw new Error(err)
  })
})

// web sockets
var Match = require('./models/match')
var Team = require('./models/team')
var io = require('socket.io')(server)
var intervalId

// on web socket connection run function below
// function runs every second using set interval
// function finds if there is a match +- 3 hours from current time
// if true, take that data with all team collection data and emit to client side, ajax
io.on('connect', function (socket) {
  clearInterval(intervalId)
  intervalId = setInterval(function () {
    Match.find({'date': {$lt: new Date(new Date().setHours(new Date().getHours() + 3)), $gt: new Date(new Date().setHours(new Date().getHours() - 3))}}, function (err, update) {
      if (err) throw new Error(err)
      if (update.length !== 0) {
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
          socket.emit('server event', {
            update: update,
            teamObj: teamObj
          })
        })
      }
    })
  }, 1000)
})
