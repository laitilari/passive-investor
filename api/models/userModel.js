const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, 'A user must have a username.'],
    unique: [true, 'The username must be unique.'],
    trim: true,
    maxlength: [40, 'Username can be max 40 characters'],
    minlength: [3, 'Username must be minimum 3 characters.'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email for account recovery.'],
    unique: [true, 'This email has already been registered.'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  avatar: String,
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    minlength: [4, 'Password must be minimum 4 characters.'],
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User
