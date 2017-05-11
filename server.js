var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// defining the database here 
var User = require("./mongo");

var Course = require("./courses");

var Faculty = require("./facultySignup");

var AddCourse=require("./addCourse");

var router = express.Router();

var wait = require('waitfor');



app.use(bodyParser.json());

app.use(bodyParser.urlencoded({"estended ": false}));

router.get("/",function(req,res){

	res.sendfile("./index.html")
});






// route will allow you to use the same path for different HTTp requests

//So if you have same URL but with different HTTP OP such as POST,GET etc
//Then use route() to remove redundant code.


router.get('/users',function(req,res){
       // var response = {};
       // User.find({},function(err,data){
        // Mongo command to fetch all data from collection.

        var response = {};
        User.find({},function(err,user){
        // Mongo command to fetch all data from collection.
        if(err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else {
            response = {"error" : false,"message" : User};
        }
        res.json(response);
    });
        //});
    })

// router.get('/myCalender',function(req,res){
//     res.sendfile("./timetable.html");
// });
////////////////////////////////////////////////////////////////////////////////////////////
//router.post("/login")
// the login fucnion to check for the user login credentials 
router.get('/myCalender',function(req,res){
       // var response = {};
       // User.find({},function(err,data){
        // Mongo command to fetch all data from collection.
        console.log("asfsa");
        var response = {};
        var Erollno = req.params.rollno;
        Course.find({rollno:"es14btech11012"} , function(err, courseInfo){
            if(err){
                response = {"error" : true , "message" : "No courses found under the given rollno"};
            }else{
                response = {"error" : false , "message" : "data found"};
            }
            var out = [];
            //console.log(courseInfo);
            for (var i in courseInfo){
                var name = courseInfo[i].course;
                var rollno=courseInfo[i].rollno;
                var time=courseInfo[i].time;
                var day=courseInfo[i].day;
                console.log(name , rollno,time , day, " hooola");
                   }
            console.log(out);
            res.json(out);    
        });
        
});

router.get('/login',function(req,res){

    res.sendfile("./student.html");
});
////////////////////////////////////////////////////////////////////////////////////////////
//router.post("/login")
// the login fucnion to check for the user login credentials 
router.post('/login',function(req,res){
       // var response = {};
       // User.find({},function(err,data){
        // Mongo command to fetch all data from collection.
        var response = {};
        var Erollno = req.body.rollno;
        var Epassword = req.body.password;
 console.log("asfsa" , Erollno)
        User.findOne({rollno:Erollno,password:Epassword},function(err,user){
            console.log(err);
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : "logged in"};
            }
            console.log(user);
           res.sendFile('./shubham.html');
    });



  // console.log("successfully loged in");
        //});
});


router.get('/register',function(req,res){
 res.sendfile("./register.html");
});


// user resgitration fusntion . new users are added here 
router.post('/register',function(req,res){
    var newUser = new User();
    var response = {};
        // fetch email and password from REST request.
        // Add strict validation when you use this in Production.
        newUser.rollno = req.body.rollno; 
        // Hash the password using SHA1 algorithm.
        newUser.password = req.body.password;
        newUser.email = req.body.email;
        console.log("did u get shcocked");
        newUser.name = req.body.name;
        newUser.branch = req.body.branch;


        console.log(newUser);

		//md5(non_existant); // This variable does not exist
       // sha1(non_existant);                  
       newUser.save(function(err){
        // save() will run insert() command of MongoDB.
        // it will add new data in collection.
        console.log("did u get fuckedup");
        if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added mother fucker go check ur data "};
        }
        res.json(response);
    });
   });

// add the course to the data base from Professor

router.get('/profCAdd', function (req, res) {
    res.sendfile('facultyCoursesAdd.html');
});

router.post('/profCAdd',function(req,res){

    var newUser = new AddCourse();

    var response = {};
    newUser.course=req.body.course;
    newUser.time=req.body.time;
    newUser.day=req.body.day;

    console.log(req.body.day);
    newUser.save(function(err){

        if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Course Added "};
        }
        res.json(response);
    });

});


router.get('/facultySignup',function(req,res){
 res.sendfile("./facultySignup.html");
});

// Faculty resgitration function . new users are added here 
router.post('/facultySignup',function(req,res){
    var newUser = new Faculty();
    var response = {};
        // fetch email and password from REST request.
        // Add strict validation when you use this in Production.
        newUser.email = req.body.email; 
        // Hash the password using SHA1 algorithm.
        newUser.password = req.body.password;
        console.log("did u get shcocked");
        newUser.name = req.body.name;
        newUser.branch = req.body.branch;


        console.log(newUser);
        
        //md5(non_existant); // This variable does not exist
       // sha1(non_existant);                  
       newUser.save(function(err){
        // save() will run insert() command of MongoDB.
        // it will add new data in collection.
        console.log("did u get fuckedup");
        if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added mother fucker go check ur data "};
        }
           // res.json(response);
           res.sendfile('facultyCoursesAdd.html');
       });
   });







router.get('/facultyLogin',function(req,res){

    res.sendfile("./faculty.html");
});
////////////////////////////////////////////////////////////////////////////////////////////
//router.post("/login")
// the login fucnion to check for the user login credentials 
router.post('/facultyLogin',function(req,res){
       // var response = {};
       // User.find({},function(err,data){
        // Mongo command to fetch all data from collection.
        var response = {};
        var Eemail = req.body.email;
        var Epassword = req.body.password;

        Faculty.findOne({Eemail:email,Epassword:password},function(err,user){

         if(err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else {
            response = {"error" : false,"message" : user};
        }
        res.json(response);
    })

        console.log("successfully loged in");
        //});
    })






// 
 // getting the courses of a student 

    ////////////////////////////////////////////////////////////////////////////
    router.get('/users/courses',function(req,res){

        res.sendfile('./courses.html');

    });

// Courses adding here with this code

// user resgitration fusntion . new users are added here 
router.post('/users/courses',function(req,res){
    var course = new Course();
    var response = {};
        // fetch email and password from REST request.
        // Add strict validation when you use this in Production.
        course.rollno = req.body.rollno; 
        // Hash the password using SHA1 algorithm.
        course.course = req.body.course;
        course.time=req.body.time;
    course.day=req.body.day;

        //md5(non_existant); // This variable does not exist
       // sha1(non_existant);                  
       course.save(function(err){
        // save() will run insert() command of MongoDB.
        // it will add new data in collection.
        if(err) {
            response = {"error" : true,"message" : err};
        } else {
            response = {"error" : false,"message" : "Data added"};
        }
        res.json(response);
    });
   });

// courses adding ends here

router.route("/users/:id")
.get(function(req,res){
    var response = {};
    User.findById(req.params.id,function(err,data){
        // This will run Mongo Query to fetch data based on ID.
        if(err) {
            response = {"error" : true,"message" : "Error fetching data"};
        } else {
            response = {"error" : false,"message" : data};
        }
        res.json(response);
    });
})

// the put fucntion to update the users information
.put(function(req,res){

 var response= {};

    	// first lets check for the record exists or not 
    	// if it does then update it

    	User.findById(req.params.id,function(err,data){

    		if(err){

    			response = {"error": true, "message": err};
    		}
    		else{

    			if(req.body.rollno !== undefined){
    				data.rollno = req.body.rollno;
    			}
    			if(req.body.userPassword !== undefined){
    				data.userPassword = req.body.userPassword;
    			}

    			data.save(function(err){

    				if(err){


    					response = {"error": true, "message": err};
    				}
    				else
    				{
    					response  = { "error": false, "message": "data is update for "+req.params.id};
    				}
    				res.json(response);
    			});
    		}
    	});

    })

.delete(function(req,res){
    var response = {};
        // find the data
        User.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                // data exists, remove it.
                User.remove({_id : req.params.id},function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error deleting data"};
                    } else {
                        response = {"error" : true,"message" : "Data associated with "+req.params.id+"is deleted"};
                    }
                    res.json(response);
                });
            }
        });
    })

app.use('/',router);

app.listen(4000);

console.log("Listeneing in port 4000");