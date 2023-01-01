const express = require('express');
//const SECRET= "F1";
//const cookieparser= require("cookie-parser");
const path = require('path');
//const router = express.Router();
//const bodyParser = require('body-parser');
//app.use(bodyParser.urlencoded({extended: false}));
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
//app.use(cookieparser());
//const jwt= require("jsonwebtoken");
app.use(express.static(__dirname+'/public'));

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
app.get('/login',function(req,res){
    res.sendFile(path.join(__dirname+'/public/login.html'));
});
app.get('/signup', function (req, res) {

    res.sendFile(__dirname + '/public/sign_up.html');

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
app.get('/race', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from race', (err, rows) => {
            connection.release() 

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
            console.log('The data from race table are: \n', rows)
        })
    })
});
app.get('/ticket', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from ticket', (err, rows) => {
            connection.release() 

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
            console.log('The data from ticket table are: \n', rows)
        })
    })
});
app.get('/customer', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ' + connection.threadId)
        connection.query('SELECT * from customer', (err, rows) => {
            connection.release() 

            if (!err) {
                res.send(rows)
            } else {
                console.log(err)
            }
            console.log('The data from customer table are: \n', rows)
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
        if(email == '' || pass == '' || first == '' || last == '' || confirm == '' || usr == '' || number == ''){
            return res.end('some fields are empty');
        }
        console.log(first, last, email, usr, pass, confirm, number);
        res.end('received');
        pool.getConnection((err, connection) => {
            if(err) throw err
            console.log('connected as id ' + connection.threadId)
            connection.query(`INSERT INTO users(user_id, username, email, password) VALUES (103,${first},${email},${pass})`, (err, rows) => {
                connection.release() 
    
                if (!err) {
                    res.send(rows)
                } else {
                    console.log(err)
                }
                console.log('Data Inserted Successfuly \n')
                //res.redirect('/login')
            })
        })
        
})

app.post('/logIn', (req, res)=>{
    var email = req.body.email;
    var pass = req.body.pass;
    if(email == '' || pass == ''){
        return res.end('some fields are empty');
    }
    console.log(email, pass);
    //res.redirect('/dash');
    res.end('received');
    //var token = jwt.sign({email:email},SECRET);
    //res.cookie("TOKEN",token,{maxAge:10*1000});
    
})
app.listen(7000, () => {
    console.log("Server running......");
  });