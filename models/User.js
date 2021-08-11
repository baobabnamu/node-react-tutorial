const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    // 최대 글자 수 지정
    maxlength: 50,
  },

  email: {
    type: String,
    // 공백을 제거해 주는 역할
    trim: true,
    // unique 1 인 경우 중복 제거
    unique: 1,
  },

  password: {
    type: String,
    // 최소 글자 수 지정
    minlength: 5,
  },

  lastname: {
    type: String,
    maxlength: 50,
  },

  role: {
    type: Number,
    default: 0,
  },

  image: String,

  token: {
    type: String,
  },

  tokenExp: {
    type: Number,
  },
})

const User = mongoose.model('User', userSchema)

module.exports = { User }