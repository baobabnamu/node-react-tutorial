const { User } = require('../models/User')

let auth = (req, res, next) => {
  // 인증 처리 로직

  // 클라이언트 쿠키에서 토큰을 가져옴
  let token = req.cookies.x_auth;

  // 전달받은 토큰을 복호화하여 유저를 찾음
  User.findByToken(token, (err,user) => {
    if(err) throw err;
    if(!user) return res.json({isAuth: false, error: true})

    req.token = token
    req.user = user
    next()
  })

  // 유저가 있는 경우 통과 가능

  // 유저가 없는 경우 통과 불가
}

module.exports = { auth };