//Load/require the modules required in this file
var express = require('express');  //Express module
var router = express.Router();  //Router module
var passport = require('passport');  //Passport module for auth.


// Require the User model from the mongodb database
var User = require('../models/User');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Time Cards Clock' });     //Renders the index page
});


// Get contacts us page
router.get('/contactus', function(req, res, next) {
  res.render('contact', { title: 'Contact Us' });     //Renders the contact page
});


//GEt Docs page
router.get('/docs', function(req, res, next) {
  res.render('docs', { title: 'Documentation' });     //Renders the docs page
});


//------sign-up routes----------

//Get the admin(company) sign-up page
router.get('/signup/admin', function(req, res, next) {
  res.render('admin_signup', { title: 'Admin Signup' });     //Renders the admin sign-up page page
});


//Get the employee sign-up page
router.get('/signup/emp', function(req, res, next) {
  res.render('emp_signup', { title: 'Employee Signup' });     //Renders the emp signup page
});


//-------Profile page routes--------

//Get the admin home page
router.get('/admin', function(req, res, next) {
  res.render('admin' , {
	title:"Administrator"  //sends the 'title' as a variable 
  });
});

//Get the login page
router.get('/login',function(req,res){
	res.render('login',{title:"Login"}); //send the 'title' as a variable
});


//---------Post requests----------

//Function to register a new admin/company to the database
router.post('/register/admin', function(req,res){
	var user= new User();  //create a new user instance
	user.name=req.body.name;  // Assign the appropriate attributes to the user var
	user.company=req.body.cname;
	user.eid=req.body.id;
	user.password=req.body.password;
	user.admin="admin";  // THe admin attribute of the user instance is set to "admin"
	user.job="boss";
	user.save(function(err){  //Save the new user instance
		if (err) {
			console.log(err);
			res.send(err);  //If error it is send to the client
		}else{
			res.redirect('/login');  // After succesfull registration , redirect to the login page
		}
	});
});


//Function to register a new employee to the database
router.post('/register/emp', function(req,res){
	User.findById(req.body.key,function(err,admin){  // Find the company if it exists by the input key
		if (err) { res.send ("<h1>Invalid Key</h1><hr><a href='/signup/emp'>Go back</a></h2>"); }
		else if(!admin){
			res.send("<h1>Invalid Key</h1><hr><a href='/signup/emp'>Go back</a></h2>");
		}else if(admin.admin=="admin"){  // If the company exists for the key in the database
			var user= new User();  //create a new user instance
			user.name=req.body.name;
			user.job=req.body.job;            // Assign the
			user.email=req.body.email;        // appropriate  
			user.hiredate=req.body.hdate;     // attributes to 
			user.company=admin.company;       // the user var
			user.eid=req.body.id;
			user.password=req.body.password;
			user.admin=req.body.key;  // The admin attribute of the user instance is set to the key of the company
			user.save(function(err){
				if (err) {
					console.log(err);
					res.send("<h2>"+err.message+"<hr><a href='/signup/emp'>Go back</a></h2>");
				}else{
					res.redirect('/login'); // After succesfull registration , redirect to the login page
				}
			});
		}
		else{
			res.send("<h1>Invalid Key - 2</h1><hr><a href='/signup/emp'>Go back</a></h2>");
		}
	});
});

//Function to log in a registered user
router.post('/login',
	passport.authenticate('local'),  // authenticate the user details to log in
	function(req, res) {
		// If this function gets called, authentication was successful.
		// `req.user` contains the authenticated user.
		if (req.user.admin=="admin")  //if user is admin , redirect to admin page
			res.redirect('/admin');
		else
			res.redirect('/users/' + req.user._id); //else redirect to employee page
	});

//Function to log off a user from the application
router.get('/logout',function(req,res){
	req.logout();  // function for logout of the requested user
	res.redirect('/login');  //redirected to the login page 
});

//Export this module to use it outside this file
module.exports = router;
