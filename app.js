const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const path = require('path');
const app = express();
const qs = require('querystring');
dotenv.config();
//const authRouter = require('./routes/auth');
//const pageRouter = require('./routes/page');
const { sequelize } = require('./models');
const passportConfig = require('./passport');

const apiRouter = require('./routes/api');
passportConfig();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors({
    origin : true,
    credentials : true,
}));

sequelize.sync({ force : false})
    .then(()=>{
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) =>{
        console.error(err);
    });
//app.use('/auth', authRouter);
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended : false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret : process.env.COOKIE_SECRET,
    cookie: {
        httpOnly : true,
        secure : false,
    },
}));


app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRouter);
//app.use('/',pageRouter);
/*
app.post('/add/data', (req, res) =>{
    console.log(req.body);

    users.create({
        name : req.body.name,
        email : req.body.email
    })
    .then(result =>{
        console.log(result);
    })
    .catch(err =>{
        console.log(err)
        throw err;
    }) 
})
*/
app.use((req, res, next) =>{
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status= 404;
    next(error);
});

app.use((err, req, res, next) =>{
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    console.log(err);
});


const port = 8010;
app.listen(port, ()=>{
    console.log(`${port}에서 대기중... `);
})