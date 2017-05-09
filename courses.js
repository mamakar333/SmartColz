var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');
var db = mongoose.createConnection('mongodb://localhost:27017/college');

var mongoSchema= mongoose.Schema;


var studentCourses = {

	"rollno": String ,
	"course" : String

}

module.exports = db.model('courses',studentCourses);
