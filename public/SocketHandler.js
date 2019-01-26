// *********************************************************************************
// HELPERS
// *********************************************************************************
//https://www.w3resource.com/javascript-exercises/javascript-math-exercise-23.php
function UUID_GEN(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

// *********************************************************************************
// Socket Handler used by all
// *********************************************************************************
// Create a Session Hanlder obejct for use
function SH() {
  // Get Session token if non-existent then creates one
  this.SessionToken = window.localStorage.getItem('SESSION_TOKEN');
  if (!this.SessionToken) {
    this.SessionToken = UUID_GEN();
    window.localStorage.setItem('SESSION_TOKEN', this.SessionToken);
  }
}

SH.prototype.login = function(username, password) {
  const package = {
    type:"LOGIN",
    data: {
      username,
      password,
      token:this.SessionToken
    }
  }

  return new Promise((resolve, reject) => {
    socketSender(package, response => {
      console.log(response);
      if (response.status === "success") {
        this.UID = response.data.UID;
        resolve(response.data.UID);
      } else {
        reject(response.data.msg)
      }
    });
  });
};


// *********************************************************************************
// Sockets
// *********************************************************************************
var socket = io();

const onCompleteCallbacks = {};
function socketSender(package, callback) {
  console.log(socket)
  package.id = UUID_GEN();
  socket.emit('data', package);
  onCompleteCallbacks[package.id] = callback
}

socket.on('response', function(package){
  const callback = onCompleteCallbacks[package.id];
  callback(package);
});


// *********************************************************************************
// TESTING
// *********************************************************************************
function resolved(result) {
  console.log(result);
}

function rejected(result) {
  console.log(result);
}

console.log("done")
var j = new SH();
j.login("user", "password").then(resolved, rejected);
console.log(j)