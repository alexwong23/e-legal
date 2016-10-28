var mongoose = require('mongoose')

var matchSchema = new mongoose.Schema({
  matchNo: {type: String, unique: true},
  date: Date,
  status: String,
  matchday: Number,
  homeTeam: String,
  awayTeam: String,
  result: {
    goalsHomeTeam: Number,
    goalsAwayTeam: Number
  },
  odds: {
    homeWin: Number,
    draw: Number,
    awayWin: Number
  }
})

var Match = mongoose.model('Match', matchSchema)

module.exports = Match
