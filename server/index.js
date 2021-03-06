const express = require('express')
const app = express()
const port = 5000
const nodemon = require('nodemon');
const cookieParser = require('cookie-parser')
const config = require('./config/key');
const { auth } = require('./middleware/auth')
const { User } = require('./models/User')

// application/x-www-form-urlenconded 를 통해 파싱하여 데이터를 가져옴
app.use(express.urlencoded({extended: true}));
// JSON 데이터 파싱 
app.use(express.json());
app.use(cookieParser());

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err))

app.post('/api/users/register', (req, res) => {
  // bodyParser를 통해 분석된 request 요청의 body 데이터를 User.js(유저 스키마)에 전달
  // 스키마 구조를 참조하여 데이터 형태가 변환(패스워드 암호화 등)되어 몽고 DB 모델로 반환됨
  // 즉, user 객체는 몽고 DB 모델임.
  const user = new User(req.body)

  // 몽고 DB 모델의 메서드인 save를 통해 몽고 DB에 값을 저장
  // 만약 err가 출력될 경우 false를 반환, 그 외의 모든 값은 HTTP 200 & true를 반환
  user.save((err, userInfo) => {
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
      })
    })
})

app.post('/api/users/login', (req, res) => {
  // 몽고DB에서 이메일 조회
  User.findOne({email: req.body.email}, (err, user) => {
    if(!user) {
      return res.json({   // JSON 데이터로 false 반환
        loginSuccess: false,
        message: "해당 유저는 존재하지 않습니다."
      })
    }
    // 비밀번호 비교 로직 호출
    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch) return res.json({loginSuccess: false, message: "틀린 비밀번호입니다."})
      // 토큰 생성 로직 호출
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);
        // 생성된 토큰을 쿠키(name: x_auth)에 저장
        res.cookie("x_auth", user.token)
        .status(200) // HTTP 200 반환
        .json({loginSuccess:true, userId: user._id}) // JSON 데이터로 true 반환
      })
    })
  })

})

app.get('/api/users/auth', auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image
  })
})


app.get('/api/users/logout', auth, (req, res) => {
  User.findOneAndUpdate({_id: req.user._id}, 
    {token: ""},
    (err, user) => {
      if(err) return res.json({success:false, err})
      return res.status(200).send({
        success: true
      })
    }
    )
})

app.get('/api/hello', (req,res) => {
  res.send("안녕하세요 ~ ")  
})

app.listen(port, () => { console.log(`Example app listening at http://localhost:${port}`) });