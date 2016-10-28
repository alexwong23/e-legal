var mongoose = require('mongoose')

var matchApiSchema = new mongoose.Schema({
  count: Number,
  fixtures: [{
    _links: {
      self: {
        href: String
      }
    },
    date: Date,
    status: String,
    matchday: Number,
    homeTeamName: String,
    awayTeamName: String,
    result: {
      goalsHomeTeam: Number,
      goalsAwayTeam: Number
    },
    odds: {
      homeWin: Number,
      draw: Number,
      awayWin: Number
    }
  }]
})

var MatchApi = mongoose.model('MatchApi', matchApiSchema)

module.exports = MatchApi
