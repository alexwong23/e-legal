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
var morgan = require('morgan')
// var CronJob = require('cron').CronJob
// new CronJob('*/15 * * * * *', function () {
//   console.log('You will see this message every 15 seconds')
// }, null, true, 'Asia/Singapore')

var app = express()
var server = require('http').Server(app)

mongoose.Promise = global.Promise
console.log('the environment is on ' + process.env.NODE_ENV)
dotenv.load({path: '.env.' + process.env.NODE_ENV})
mongoose.connect(process.env.MONGO_URI)

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

var index_routes = require('./routes/index')
var user_routes = require('./routes/user')
var match_routes = require('./routes/match')
var match_api = require('./routes/match_api')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

require('./config/passport')(passport)

// run methodOverride for all requests
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use('/', index_routes)
app.use('/users', user_routes)
app.use('/matches', match_routes)
app.use('/api/matches', match_api)

server.listen(process.env.PORT || 4000)
console.log('Server running at http://localhost:4000/')

var Match = require('./models/match')
var Team = require('./models/team')
var io = require('socket.io')(server)
var intervalId
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
