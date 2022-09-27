var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
var dbConn = require('../../config/db');

router.post('/signup',(req,res,next)=>{
    var username = req.body.username;
    var email_a = req.body.email_a;
    var password = req.body.password;
    var userId ="";
try{
sqlQuery = `INSERT INTO account_credentials(username,email_a,password)VALUES("${username}","${email_a}","${password}")`
dbConn.query(sqlQuery, function(error,results,fields){
    userId =results.insertId
    res.status(200).json({success:true,userId:userId})
});
}catch(error){
    console.log(error);
    return next(error);
}    

});

router.post('/login',(req,res,next)=>{
    var email_a = req.body.email_a;
    var password = req.body.password;
    
try{
sqlQuery = `SELECT * FROM account_credentials WHERE email_a="${email_a}"AND password="${password}"`
dbConn.query(sqlQuery, function(error,results,fields){
    console.log(results);
    Object.keys(results).forEach(function(key){
        var row = results[key]
        var username = row.username;
        var email_a = row.email_a

        var data={
            username:row.username,
            email_a:row.email_a,
        };
        token = jwt.sign({data:data},'GGsecretSC',{expiresIn:'1h'});
        res.status(200).json({success:true,token:token});
    })
});
}catch(error){
    console.log(error);
    return next(error);
}    
});


module.exports = router;