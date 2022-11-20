const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const User = require('../models/user');
const { FORCE } = require('sequelize/types/index-hints');

const router = express.Router();

router.post('/join',isNotLoggedIn,async(req,res,next)=>{
    console.log(req.body); 

    const {email,password,name,id,mobile} = req.body;
    const birth = req.body.year + '-' + req.body.mon + '-' + req.body.day;
    try {
        const exUser = await User.findOne({where:{id}});
        if(exUser) {
            return console.log(`join?error=${exUser}`);
        }
        const hash = await bcrypt.hash(password,12);
        await User.create({
            id,
            password:hash,
            name,
            birth,
            email,
            mobile
        });
        console.log('successed');
    }
    catch (error) {
        console.error(error);
        return next(error);
    }
});

router.post('/login',isNotLoggedIn,(req,res,next)=>{
    passport.authenticate('local',(authError,user,info)=>{
        //console.log(user);
        if(authError){
            console.error(authError);
            return next(authError);
        }
        if(!user){
            return console.log(`loginError=${info.message}`);
        }
        return req.login(user,(loginError)=>{
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.json({
                data: user,
                message : "login successed",
                code : 200
            });
        });
    })(req,res,next);
});

router.get('/logout',isLoggedIn,(req,res)=>{
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

//password 바꾸기
router.post('/update/pw',isLoggedIn,async(req,res)=>{
    await User.update({
        password : req.body.password
    },{where : {id}})
})

//email 바꾸기
router.post('/update/email',isLoggedIn,async(req,res)=>{
    await User.update({
        email : req.body.email
    },{where : {id}})
})

//(mobile으로) id 찾기
router.post('/find/id',isLoggedIn,async(req,res)=>{
    const user = await User.findOne({where:{mobile : req.body.mobile}})
    if (user==null) {
        res.json({
            code : 404,
            message : 'no user'
        })
    }
    else {
        res.json({
            id : user.id
        })
    }
})

//id 보내줌(front) -> user 찾음(back) -> 새 비밀번호 입력,보내줌(front)(창 바뀌어야 할 것같음) -> 비밀번호 바꾸기(back)
router.post('/find/pw',isLoggedIn,async(req,res)=>{
    const user = await User.findOne({where:{id : req.body.id}})
    if (user==null) {
        res.json({
            code : 404,
            message : 'no user'
        })
    }
    else {
        res.json({
            code : 200,
            message : 'find user succeed'
        })
    }
})

//회원탈퇴
router.post('/delete',isLoggedIn,async(req,res)=>{
    const user_id = req.body.id;
    req.logout();
    req.session.destroy();
    await User.destroy({where:{id:user_id},force:true})
    .then(
        res.json({
            code : 200,
            message : '탈퇴 성공'
        })
    )
    .catch(
        console.error(error)
    )
})

module.exports = router;