const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { LoggedIn, NotLoggedIn } = require('./middlewares');
const qs = require('querystring');
const router = express.Router();
/*router.post('/login', (req,res)=>{
    console.log(req.body);
    res.json({
        scode: 200,
        message : "로그인성공"
    });
});
*/


router.post('/Join_P', NotLoggedIn, async (req, res, next) => {
    const { shoot_id, password, name, birth, email, phoneNumber } = req.body;
    console.log(req.body);
    try {
        const exUser = await User.findOne({ where: { shoot_id } }); //아이디 찾기
        console.log(exUser);
        if (exUser) {
            error.response.status = 400;
            return res.redirect(`/join/error=exist`);
        }
        else {
            //console.log('register');
            const hash = await bcrypt.hash(password, 10);
            await User.create({
                shoot_id,
                password: hash,
                name,
                birth,
                email,
                phoneNumber,
            });
            res.send(req.body);
        }
    } catch (error) {
        console.error(error);
        /*if (error.response.status === 400) {//중복된 아이디 일때 
            return res.json(error.response.data);
        }*/
        return next(error);
    }
});

router.post('/login', NotLoggedIn,(req, res, next)=>{
    passport.authenticate('local', (authError, user, info)=>{
        if(authError){
            console.error(authError);
            return next(authError);
        }
        if(!user){
            return res.redirect(`/?loginError=${info.message}`);
        }
        return req.login(user,(loginError)=>{
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            //res.redirect('/');
            //return res.json(req.body);
        });
    })(req,res,next);
});

router.get('/logout', LoggedIn,function(req,res,next){
    req.logout(function(err){
        if(err){
            return next(err);
        }
        //return res.json(req.body);
    });
    req.session.destroy();
    //res.redirect('/');
});


module.exports = router;