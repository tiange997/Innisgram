"use strict";

//importing modules
var express = require('express');
var bodyParser = require('body-parser');
var fileUpload = require('express-fileupload');
var session = require('express-session');
var mysql = require('mysql');

//create app instance
var app = express();

//configure middleware
app.use(express.static("static"));
app.set("view-engine", "ejs");
app.set("views","view");
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());
app.use(session({
    secret:'byuft7g$%^&^(&*RBfyghbuytdfuynob',
    resave: false,
    saveUninitialized: true,
    cookie:{maxAge:6000000}
}));
app.use(bodyParser.json());

//Setup the database connection
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "YOURPASSWORD",
    database: "sample_db"
});

con.connect(function(err) {
    if (err)
         console.log("Error connecting to Database "+ err);
     else
        console.log("Connected to Database");
});

//set port number and put the app online
const port = 8081;
app.listen(port);
console.log('Server running on http://localhost:'+port);

//set global variables
var login = false;
var register = false;
var picID = 2; // Start from two bc by default there are two pictures


//configure routes

app.get('/', (req,res)=>{

    var pictureURL = [];

    var uploader = [];

    var dateInfo = [];

    var picName = [];

    var likes = [];

    var sql = `SELECT * FROM picture`;

    con.query(sql,function (err,results) {
        if (err){
            res.send("A database error occurred: "+err);
        } else {
            if (results.length > 0) {
                for (let i in results){
                    pictureURL.push(results[i]["URL"]);
                    uploader.push(results[i]["uploader"]);
                    dateInfo.push(results[i]["uploadingDate"]);
                    likes.push(results[i]["likes"]);
                    picName.push(results[i]["picName"]);
                }
               res.render('index.ejs',{login,pictureURL,uploader,dateInfo,likes,picName});
            }
        }
    });
});

app.post('/like',(req,res)=>{
    // get the name of the image
    //console.log(req.body);
    let picName = req.body;
    let likes = 0;
    //console.log(picName.picName);
    // with the file name, get the likes from the data base
    var sql = `SELECT likes FROM picture where picName = "${picName.picName}"`;
    con.query(sql,function (err,results) {
        if (err){
            res.send("A database error occurred: "+err);
        } else {
            if (results.length > 0) {

                likes = Number(results[0]["likes"]);

                // Increasing the number by 1
                likes++;

                // update the DB
                let update = `UPDATE picture SET likes = ${likes} WHERE picName = "${picName.picName}"`;
                con.query(update);
            }
        }
    })

    //res.json(like_number_Var)
    return res.send(req.body);
});

app.get('/getPost',(req,res)=>{
    let getPostSQL = `SELECT * FROM comments`;
    let data = [];
    con.query(getPostSQL, function (err,result) {
        if (err){
            res.send("A database error occurred: "+err);
        } else {
            if (result.length>0){
                //console.log(result);
                for (let i in result){
                    data.push({
                        "imgID":result[i]["picID"],
                        "commentID":result[i]["commentID"],
                        "content":result[i]["content"],
                        "username": result[i]["username"]
                    });
                }
                res.json(data);
            }
        }
    });
});

app.post('/postComment',(req,res)=>{
    console.log(req.body);
    let commentID = 0;
    let picID = req.body.picID;
    let msg = req.body.msg;
    let getCommentID = `SELECT * FROM comments`;

    con.query(getCommentID,function (err,result) {
        if (err) {
            res.send("A database error occurred: "+err);
        } else {
            //console.log(result);
            for (let i in result) {
                commentID = result[i]["commentID"];
            }
            commentID++;
            console.log(commentID,picID,msg,req.session.username);
            let insertSQL = `INSERT INTO comments (commentID, picID, content, username) VALUES (${commentID}, ${picID}, "${msg}", "${req.session.username}")`;
            con.query(insertSQL);
        }
    });
    return res.json({"username": req.session.username});
});

app.get('/login',(req,res)=>{
    res.redirect('/login.html');
});

app.get('/reg',(req,res)=>{
    res.redirect('/reg.html');
});

//Add the data to the database
app.post('/register',(req,res)=>{
    var inputUsername = req.body.username;
    var inputPassword = req.body.password;
    var inputFirstName = req.body.firstname;
    var inputSurname = req.body.surname;

    var pictureURL = [];
    var uploader = [];
    var dateInfo = [];
    var picName = [];
    var likes = [];

    var sql = `SELECT * FROM picture`;

    con.query(sql,function (err,results) {
        if (err){
            res.send("A database error occurred: "+err);
        } else {
            if (results.length > 0) {
                for (let i in results){
                    pictureURL.push(results[i]["URL"]);
                    uploader.push(results[i]["uploader"]);
                    dateInfo.push(results[i]["uploadingDate"]);
                    likes.push(results[i]["likes"]);
                    picName.push(results[i]["picName"]);
                }
            }
        }
    });

    //confirm four fields are filled
    if( inputUsername == '' || inputPassword == '' || inputFirstName == '' || inputSurname == ''){
        res.send("Please fill in all the fields");
    } else {
        //check whether there are repeated username in the database
        var userValidation = req.body.username;;
        var repeating = false;
        
        var sql = `SELECT * FROM users`;

        //return variable 'repeating' with true when no repeated information in the database
        con.query(sql, function(err, results) {
            if (err) {
                res.send("A database error occurred: "+err);
            } else {
                if (results.length >0) {
                    for (var i in results){
                        if(results[i]["username"] == userValidation){
                            repeating = true;
                            console.log(repeating);
                            break;
                        }
                    }

                    //add new user information

                    if(!repeating){
                        var sql2 = `INSERT INTO users (username, firstname, surname, password)
                                    VALUES ("${inputUsername}", "${inputFirstName}", "${inputSurname}", "${inputPassword}")`;
                        console.log(sql);

                        con.query(sql2, function(err, results) {
                            if (err) {
                                res.send("Database error "+err);
                            } else {
                                register = true;
                                console.log(results);
                                res.render('index.ejs',{login,pictureURL,uploader,dateInfo,likes,picName});
                            }
                        });
                    } else {
                        res.render('reg.ejs',{register});
                    }
                }
            }
        });
    }
});

app.post('/loginAccount',(req,res)=>{

    var userValidation = '';
    var passValidation = '';
    userValidation = req.body.username;
    passValidation = req.body.password;

    var sql = `SELECT * FROM users`;
    
    con.query(sql, function(err, results) {
        if (err) {
            res.send("A database error occurred: "+err);
        } else {
            if (results.length >0) {
                for (var i in results){
                    if(results[i]["username"] == userValidation && results[i]["password"] == passValidation){
                        login = true;
                        req.session.username = userValidation;
                        console.log(req.session);
                        break;
                    }
                }
                if(!login){
                    //res.send("Your username/password is incorrect");
                    res.render('login.ejs',{login});
                } else {res.redirect('/');}
            }
        }
     });
});

app.get('/profile', (req,res)=>{
    var sessionUser = req.session.username;
    console.log(req.session);
    if (sessionUser) {
        res.render('profile.ejs',{"data": sessionUser, login});
        console.log(req.session);
    } else {
        res.render('profile.ejs',{"data": "No session data found",login});
    }
});

app.get('/logout', (req,res)=>{
    req.session.destroy();
    console.log(req.session);
    login = false;
    res.redirect('/');
});

app.post('/upload', function(req, res) {
    let photo = req.files.photo;
    let picName = '';
    let uploader = [];
    let date = new Date();
    let dateOutput = date.toDateString();

    // get imgList
    let pictureURL = [];
    var sql = `SELECT * FROM picture`;

    con.query(sql,function (err,results) {
        if (err){
            res.send("A database error occurred: "+err);
        } else {
            if (results.length > 0) {
                for (let i in results){
                    pictureURL.push(results[i]["URL"]);
                    uploader.push(results[i]["uploader"]);
                }
            }
        }
    });

    picName = photo.name;
    // Placing the photo on my server
    photo.mv('./static/upload/' + photo.name, function(err) {
        if (err){
            return res.status(500).send(err);
        } else {
            picID = pictureURL.length;
            picID++; // increase the number of picID by one

            //adding picture URL to the DB
            var sql = `INSERT INTO picture (picId, URL, picName, uploader, uploadingDate, likes) VALUES (${picID}, "/upload/${picName}", "${picName}", "${req.session.username}", "${dateOutput}", 0)`;


            con.query(sql,function (err,results) {
                if (err){
                    res.send("A database error occurred: "+err);
                } else {
                    if (results.length > 0) {
                        console.log(results);
                        pictureURL.push()
                    }
                }
            });
            console.log('File uploaded!');
            res.render('upload.ejs',{"route":"/upload/"+picName});
        }
    });
});