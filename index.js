const express = require('express')
const app = express()
const port = 3000
const nodemon = require('nodemon');
const config = require('./config/key');
const { User } = require('./models/User')

// application/x-www-form-urlenconded 를 통해 파싱하여 데이터를 가져옴
app.use(express.urlencoded({extended: true}));
// JSON 데이터 파싱 
app.use(express.json());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err))

app.post('/register', (req, res) => {
  // bodyParser를 통해 분석된 request 요청의 body 데이터를 User.js(유저 스키마)에 전달
  // 스키마 구조를 참조하여 데이터 형태가 변환(패스워드 암호화 등)되어 몽고 DB 모델로 반환됨
  // 즉, user 객체는 몽고 DB 모델임.
  const user = new User(req.body)

  // 몽고 DB 모델의 메서드인 save를 통해 몽고 DB에 값을 저장
  // 만약 err가 출력될 경우 false를 반환, 그 외의 모든 값은 HTTP 200 & true를 반환
  user.save((err, userInfo) => {
    console.log(req.body)
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
      })
    })
})

app.post('/login', (req, res) => {

  // 몽고DB에서 이메일 조회
  User.findOne({email: req.body.email}, (err, userInfo) => {
    if(!userInfo) {
      return res.json({
        loginSuccess: false,
        message: "해당 유저는 존재하지 않습니다."
      })
    }
    // 비밀번호 비교 로직
    user.comparePassword(req.body.comparePassword, (err, isMatch) => {
      if(!isMatch)
        return res.json({loginSuccess: false, message: "틀린 비밀번호입니다."})
      
      // 토큰 생성 로직
      user.generateToken((err, user) => {

      })
    })
  })

})


app.listen(port, () => { console.log(`Example app listening at http://localhost:${port}`) });