var fs = require('fs');
var SQL = require('./node_modules/sql.js/js/sql');
var passwordHash = require('password-hash');

var filebuffer = fs.readFileSync('./test.db');

// Load the db
var db = new SQL.Database(filebuffer);
function allUsers(){
    var result = db.exec("SELECT * from Patient");
    return result;
}

function authenticate(email, password){
    var stmt = db.prepare("SELECT password FROM Credentials WHERE email=:val");
    var result = stmt.getAsObject({':val' : email});
    console.log(result.password);
    return passwordHash.verify(result.password,password);
}

function registerPatient(email,password,name,dob,sin){
    var hashedPassword = passwordHash.generate(password);
    db.run("Insert into Credentials (email,password) values (?,?)",[email,hashedPassword]);
    var stmt = db.prepare("SELECT * FROM Credentials WHERE email=:val1 and password=:val2");
    var result = stmt.getAsObject({':val1' : email, ':val2' : hashedPassword});

    db.run("Insert into Patient (user_id,email,name,dob,sin) values (?,?,?,?,?)",[result.user_id,email,name,dob,sin]);
    console.log(result);
    var data = db.export();
    var buffer = new Buffer(data);
    fs.writeFileSync("test.db", buffer);

}

function registerDoctor(email,password,name,dob,sin,docRef){
    var hashedPassword = passwordHash.generate(password);
    db.run("Insert into Credentials (email,password) values (?,?)",[email,hashedPassword]);
    var stmt = db.prepare("SELECT * FROM Credentials WHERE email=:val1 and password=:val2");
    var result = stmt.getAsObject({':val1' : email, ':val2' : hashedPassword});

    db.run("Insert into Doctor (user_id,email,name,dob,sin,doctorReference) values (?,?,?,?,?,?)",[result.user_id,email,name,dob,sin,docRef]);
    console.log(result);
    var data = db.export();
    var buffer = new Buffer(data);
    fs.writeFileSync("test.db", buffer);
}
module.exports={
    authenticate: authenticate,
    allUsers: allUsers,
    registerPatient:registerPatient
};
