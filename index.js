var express = require("express");

var app = express();
var bodyParser = require("body-parser");
var mongoOp = require("./mongo");
var router = express.Route();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"Extended":false}));
app.use('/',router);
router.get("/",function(req,res){

	res.json({"error":false, "message ": "Hello world"});
});

router.post('login',function(req,res){

	var rollno = req.body.rollno;
	var password = req.body.password;

	db.findOne({username:username,password:password},function(err,user){

		if(err)
		{
			console.log(err);
			return res.status(500).send();

		}
		if(!user){

			return res.status(404).send();
		}
		return res.status(200).send();

	})
});


router.post('/register', function(req,res){

	var db= new mongoOp();

	db.rollno = req.body.rollno;
	db.email = req.body.email;
	db.password = req.body.password;
	db.firstname = req.body.firstname;
	db.lastname = req.body.lastname;
	db.branch = req.body.branch;
	

	

	db.save(function(err,savedUser){

		if(err){

			console.log(err);
			return res.status(500).send();
		}

		return res.status(200).send();
	})

});




