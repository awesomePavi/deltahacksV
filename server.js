//express builds app
var app = require('express')();
//http communications
var http = require('http').Server(app);
//websockets, on establised http listener
var io = require('socket.io')(http);

var users = [];
var messagelogs = [];

//response for get response for applet
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

//handle all connections, and what happens
io.on('connection', function(socket){

});

//listen on microsft azure ports
http.listen((process.env.PORT || 8080), function(){
});