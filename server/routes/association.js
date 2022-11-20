const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    fs.createReadStream("../test.csv")
    .pipe(parse({delimiter:',',from_line:2}))
    .on("data",function(row){
        res.json({
            SO_K : row[0],
            SO_E : row[1],
            homepage : row[2],
            telephone : row[3],
            email : row[4],
            logo : row[5]
        })
    })
    .on("end",function() {
        console.log("finish")
    })
    .on("error",function (error) {
        console.error(error.message)
    })
})