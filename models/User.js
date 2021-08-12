const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  password: {
    type: String,
    minlength: 5
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  token: String,
  tokenExp: Number
})

userSchema.pre('save', function(next) {
  var user = this;

  if(user.isModified('password')) 
  {
    bcrypt.genSalt(saltRounds, function(err, salt){
      if(err) return next(err)
      bcrypt.hash(user.password, salt, function(err, hash) {
        if(err) return next(err);
        user.password = hash;
        next();
      });
    });
  }

  else {
    next();
  }

});

userSchema.methods.comparePassword = function(plainPassword, cb) {
  // 비교를 위해 암호화된 비밀번호를 복호화 할 수 없음
  // 즉, 전달받은 패스워드를 암호화하여 비교

  bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    if(err) return cb(err),
      cb(null, isMatch)
  }) 
}

const User = mongoose.model('User', userSchema)

module.exports = { User }