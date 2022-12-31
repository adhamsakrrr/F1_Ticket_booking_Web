const express = require('express');
const cookie = require('cookie-parser');
const path = require('path');
const router = express.Router();
//const bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded({extended: false}));
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

var mysql = require("mysql2");
const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'cai.aast.edu',
    user            : 'web_17',
    password        : '3016',
    database        : 'web_17'
});
app.get('/dash',function(req,res){
    res.sendFile(path.join(__dirname+'/dashboard.html'));
});
  
app.get('/signup', function (req, res) {

    res.sendFile(__dirname + '/sign_up.html');

});

app.get('/users', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from users', (err, rows) => {
            connection.release() 

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
            console.log('The data from users table are: \n', rows)
        })
    })
});
app.post('/signUp', (req, res)=>{
        var first = req.body.first
        var last = req.body.last
        var usr = req.body.usr
        var email = req.body.email;
        var pass = req.body.pass;
        var confirm = req.body.confirm
        var number = req.body.number
        //if(email == '' || pass == '' || first == '' || last == '' || confirm == '' || usr == '' || number == ''){
            //return res.end('some fields are empty');
        //}
        console.log(first, last, email, usr, pass, confirm, number);
        res.end('received');
        pool.query(`INSERT INTO users(user_id, username, email, password) VALUES (102,${usr},${email},${pass})`,function(err, result)      
{                                                      
  if (err)
     throw err;
});
})

app.listen(7000, () => {
    console.log("Server running......");
  });