var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');
var db = mongoose.createConnection('mongodb://localhost:27017/college');

var mongoSchema= mongoose.Schema;

var userSchema = {

	"rollno": String,
	"password": String,
	"email" : String,
	"name" : String,
	"branch" : String
	
};

module.exports = db.model('mylogins',userSchema);
