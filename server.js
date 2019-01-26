//express builds app
var express = require("express");
var app = express();
//http communications
var http = require('http').Server(app);
//websockets, on establised http listener
var io = require('socket.io')(http);

var users = [];
var messagelogs = [];

var dbAccess = require('./database_access.js');

//response for get response for applet
app.use(express.static('public'));
app.get('/users', function(req, res){
    var result = dbAccess();
    res.send(result);
});

//handle all connections, and what happens
io.on('connection', function(socket){

});

//listen on microsft azure ports
http.listen((process.env.PORT || 8080), function(){
});