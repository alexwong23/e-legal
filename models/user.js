var mongoose = require('mongoose')
var bcrypt = require('bcrypt')

var userSchema = new mongoose.Schema({
  local: {
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: [6, 'Password at least 6 characters']
    },
    handphone: Number,
    email: {
      type: String,
      required: [true, 'Email is required'],
      match: [/.+\@.+\..+/, 'Invalid email']
    },
    favTeam: String,
    tokens: Number,
    score: Number
  }
})

// passport, before saving a new user, this function will return
// generate salt 5 times
// bcrypt passport with generated salt
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

// passport method for authentication
// bcrypt input password and see if matches with existing hash password in db
userSchema.methods.authenticate = function (password, callback) {
  bcrypt.compare(password, this.local.password, function (err, isMatch) {
    callback(err, isMatch)
  })
}

var User = mongoose.model('User', userSchema)

module.exports = User
