var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');
var db = mongoose.createConnection('mongodb://localhost:27017/college');

var mongoSchema= mongoose.Schema;

var facultySchema = {

	"email": String,
	"password": String,
	"name" : String,
	"branch" : String
	
};

module.exports = db.model('faculty',facultySchema);
