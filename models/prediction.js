var mongoose = require('mongoose')

var predictionSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  matchNo: String,
  prediction: String,
  amount: Number,
  // win loss draw
  result: String
})

var Prediction = mongoose.model('Prediction', predictionSchema)

module.exports = Prediction
