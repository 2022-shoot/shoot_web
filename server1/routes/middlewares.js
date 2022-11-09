exports.isLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()) {
        next();
    }
    else {
        res.status(403).send('you need login')
    }
}

exports.isNotLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()) {
        next();
    }
    else {
        const message = encodeURIComponent('already logined');
        console.log(`/?error=${message}`);
    }
}