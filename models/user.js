var mongoose = require('mongoose')
var bcrypt = require('bcrypt')

var userSchema = new mongoose.Schema({
  local: {
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    handphone: Number,
    email: String,
    favTeam: String,
    tokens: Number,
    score: Number
  }
})

userSchema.pre('save', function (next) {
  var user = this
  bcrypt.genSalt(5, function (err, salt) {
    if (err) return next(err)
    bcrypt.hash(user.local.password, salt, function (err, hash) {
      if (err) return next(err)
      user.local.password = hash
      next()
    })
  })
})

userSchema.methods.authenticate = function (password, callback) {
  bcrypt.compare(password, this.local.password, function (err, isMatch) {
    callback(err, isMatch)
  })
}

var User = mongoose.model('User', userSchema)

module.exports = User
