var mongoose = require('mongoose')

var voteSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  matchid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match'
  },
  matchNo: String,
  vote: String,
  amount: Number,
  // win loss draw
  result: String
})

var Vote = mongoose.model('Vote', voteSchema)

module.exports = Vote
