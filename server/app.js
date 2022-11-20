// 로그인 했다고 프론트에 전달

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');

const apiRouter = require('./routes/api'); //파일 자체를 가져다 쓴다
const testRouter = require('./routes/test');
const { sequelize } = require('./models');
const passportConfig = require('./passport');
const authRouter = require('./routes/auth');
const assRouter = require('./routes/association');

dotenv.config();

const app = express(); //익스프레스로 만든 기본적인 웹 서버
passportConfig();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); //프론트에서 넘겨준 바디를 제이슨 형식으로 해석

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
    httpOnly: true,
    secure: false,
    },
}));

app.use(passport.initialize());
app.use(passport.session());

sequelize.sync({force:false}) //초기화
    .then(()=>{
        console.log('database connection succeed');
    })
    .catch((err)=>{
        console.error(err);
    })

app.use(cors({
    //origin : true,
    origin : true,
    credentials : true,
}));

app.use('/api',apiRouter); //경로가 /api이면 apiRouter로 가라
app.use('/test',testRouter);
app.use('/auth',authRouter);
app.use('/ass',assRouter);

const port = 5000;
app.listen(port, ()=>{console.log(`Listening on port ${port}`)}); //app열고 기다리는 중
