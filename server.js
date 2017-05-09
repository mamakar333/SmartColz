var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// defining the database here 
var User = require("./mongo");

var Course = require("./courses");

var router = express.Router();



app.use(bodyParser.json());

app.use(bodyParser.urlencoded({"estended ": false}));

router.get("/",function(req,res){

	res.json({"error":false, "message ": "Hello world"});
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
                response = {"error" : false,"message" : user};
            }
            res.json(response);
        });
        //});
    })

   

router.get('/login',function(req,res){

    res.sendfile("./login.html");
});
////////////////////////////////////////////////////////////////////////////////////////////
//router.post("/login")
// the login fucnion to check for the user login credentials 
    router.post('/login',function(req,res){
       // var response = {};
       // User.find({},function(err,data){
        // Mongo command to fetch all data from collection.
              var response = {};
        var rollno = req.body.rollno;
    var password = req.body.password;

    User.findOne({rollno:rollno,password:password},function(err,user){

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