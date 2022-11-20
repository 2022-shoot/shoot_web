const express = require('express');
const router = express.Router();

router.post('/login',(req,res)=>{ //method가 다 맞아야 함 post, /login
    console.log(req.body.username);
    res.json({
        scode : 200,
        message : "로그인 성공"
    });
});

router.get('/search/imrimee',(req,res)=>{ //get, /search/imrimee이면 이 로직 실행
    console.log(req);
    res.json({
        name : "조수현",
        age : 10
    })
})


module.exports = router; //router로 내보내주어야 함
