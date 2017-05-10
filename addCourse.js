var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');
var db = mongoose.createConnection('mongodb://localhost:27017/college');

var mongoSchema= mongoose.Schema;

var addCourseSchema = {

	"course": String,
	"time": String,
	"day" : String
	
};

module.exports = db.model('addCourse',addCourseSchema);
