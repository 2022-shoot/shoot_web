const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.post('/join',isNotLoggedIn,async(req,res,next)=>{
    console.log(req.body); 

    const {email,password,name,id} = req.body;
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
            email
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

module.exports = router;