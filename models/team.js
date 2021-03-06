var mongoose = require('mongoose')

var teamSchema = new mongoose.Schema({
  name: {type: String, unique: true},
  code: String,
  shortName: String,
  squadMarketValue_Euro: Number,
  crestUrl: String
})

var Team = mongoose.model('Team', teamSchema)

module.exports = Team
