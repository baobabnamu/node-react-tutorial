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
  // 회원 가입시 필요한 정보 client에서 가져와 DB에 넣기
  // bodyParser를 통해 분석된 request 요청의 body 데이터를 User.js에 전달
  // User.js에 의해 DB에 삽입됨.
  const user = new User(req.body)

  user.save((err, userInfo) => {
    console.log(req.body)
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      success: true
      })
    })
})


app.listen(port, () => { console.log(`Example app listening at http://localhost:${port}`) });