//express builds app
var express = require("express");
var app = express();
//http communications
var http = require('http').Server(app);
//websockets, on establised http listener
var io = require('socket.io')(http);

var users = [];
var messagelogs = [];

var {allUsers,authenticate,registerPatient} = require('./database_access.js');

//response for get response for applet
app.use(express.static('public'));
app.get('/users', function(req, res){
    var result = allUsers();
    res.send(result);
});

app.post('/authenticate', function(req, res){
    var result = authenticate(req.query.username, req.query.password);
    res.send(result);
});

app.post('/register', function(req, res){
    var result = registerPatient(req.query.email, req.query.password,req.query.name,req.query.dob,req.query.sin);
    res.send(result);
});

app.post('/registerDoctor', function(req, res){
    var result = registerPatient(req.query.email, req.query.password,req.query.name,req.query.dob,req.query.sin,req.query.doctorNum);
    res.send(result);
});

//handle all connections, and what happens
io.on('connection', function(socket){

});

//listen on microsft azure ports
http.listen((process.env.PORT || 8080), function(){
});