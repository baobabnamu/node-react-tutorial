const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const { User } = require('./models/User');

// application/x-www-form-urlencoded 를 분석 (jQuery/Ajax의 기본 타입)
// extended: true는 객체 안에 객체가 파싱될 수 있도록 하는 옵션
app.use(bodyParser.urlencoded( {extended:  true} ) );
// application/json 를 분석 (json 타입 분석)
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://dbUser:cloud%23%2377@cluster0.c0mma.mongodb.net/d?retryWrites=true&w=majority", {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log("MongoDB Connected..."))
.catch(err => console.log(err));

app.get('/', (req, res) => { res.send('Hello World!') });

app.post('/register', (req, res) => {
  const user = new User;
  user.save((err, userInfo) => {

    if(err) return res.json({success: false, err})

    return res.status(200).json({
      success: true
    })
  })
})

app.listen(port, () => { console.log(`Example app listening at http://localhost:${port}`) });