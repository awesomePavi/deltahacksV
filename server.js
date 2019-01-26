//express builds app
var express = require("express");
var app = express();
//http communications
var http = require('http').Server(app);
//websockets, on establised http listener
var io = require('socket.io')(http);

var users = [];
var messagelogs = [];

var {allUsers,authenticate,registerPatient} = require(__dirname + '/database_access.js');

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

// Track what users are online and there current session
var users = {};

// *********************************************************************************
// REST
// *********************************************************************************

// Handle any and all API endpoints
const SocketRESTCalls = {};
SocketRESTCalls["LOGIN"] = function(data, callback) {
	if (data.username === "user" && data.password === "password") {
		callback(true, {UID: "001410729"})

		// Could be used to check if a user is logged in from two locations since each one has its own "TOKEN"
		users["001410729"] = data.token;
	} else {
		callback(false, {msg: "invalid user"})
	}
}

// *********************************************************************************
// Sockets
// *********************************************************************************
io.on('connection', function(socket){

	// Hanlde generic data call from client
	socket.on('data', function(package){
		console.log(package);

		// The package id is key to help the client determine what call this data is for
		var responsePackage = {
			id: package.id,
			status: "failure",
			data:{},
		}

		if (!package.type) {
			responsePackage.data = {
				msg: "ERROR: Action type is required"
			}
			io.emit('response', responsePackage);
		} else {
			const toCall = SocketRESTCalls[package.type];
			if (!toCall) {
				responsePackage.data = {
					msg: "ERROR: Action type is required"
				}
				io.emit('response', responsePackage);
			} else {
				toCall(package.data, (success, data) => {
					responsePackage.status = success ? "success" : "failure";
					responsePackage.data = data;
				});
				io.emit('response', responsePackage);
			}
		}
  	});

});

//listen on microsft azure ports
http.listen((process.env.PORT || 8080), function(){
});