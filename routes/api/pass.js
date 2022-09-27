var express = require('express');
const jwt = require('jsonwebtoken');
var router = express.Router();
var dbConn = require('../../config/db');

//INSERT
// @routes POST api/temperature/add
// @desc Insert Data to Database
// @access Pubic
router.post('/add',(req,res) =>{   
const token = req.headers.authorization.split(' ')[1]
if(!token){
    res.status(200).json({success:false, msg:'Error, Token was not found'});
}
const decodedToken = jwt.verify(token,'GGsecretSC')
console.log(decodedToken);

    var passenger_id = req.body.passenger_id;
    var Fname = req.body.Fname;
    var Lname = req.body.Lname;
    var contact_Num = req.body.contact_Num;
    var email = req.body.email;
    var age = req.body.age;


    // connect to mysql database and perform INSERT Query

    sqlQuery = `INSERT INTO passenger (passenger_id,Fname,Lname,contact_Num, email,age) VALUES ("${passenger_id}","${Fname}","${Lname}",${contact_Num},"${email}",${age})`

    dbConn.query(sqlQuery,  function( error, results, fields ){ 

         if (error) throw error;

        res.status(200).json(results);

    });

});
// SELECT or (VIEW)
// @routes GET api/temperature/view

// @desc View Data from the Database

// @access Pubic

router.get('/view', (req, res) => {

    dbConn.query('SELECT * FROM passenger', function (
    
        error,
    
        results,
    
        fields
    
      ) {
    
        if (error) throw error;
    
            res.status(200).json(results);  
    
      });
    
    });
// UPDATE

// DELETE

module.exports = router;