const express = require('express');
const { User } = require('../models');
const router = express.Router();

router.post('/name', async (req,res) => {
    console.log("/test/name");
    try{
        await User.create({
            id : req.body.id,
            password : req.body.password,
            name : req.body.name,
            nick : req.body.nick,
            birth : req.body.birth,
            email : req.body.email,
            mobile : req.body.mobile
        })
        res.send('join successed') //왜 내 눈에 안 보여, json도 안 돼..
        console.log('회원가입 성공')
    }
    catch (error) {
        console.error(error);
        //next(error);
    }
})

module.exports = router;