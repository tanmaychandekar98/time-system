var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Time Cards Clock' });
});

router.get('/contactus', function(req, res, next) {
  res.render('contact', { title: 'Contact Us' });
});

router.get('/docs', function(req, res, next) {
  res.render('docs', { title: 'Documentation' });
});

//sign-up routes
router.get('/signup/admin', function(req, res, next) {
  res.render('admin_signup', { title: 'Admin Signup' });
});

router.get('/signup/emp', function(req, res, next) {
  res.render('emp_signup', { title: 'Employee Signup' });
});


//Profile page routes
router.get('/admin', function(req, res, next) {
  //res.send("Admin profile page");
  res.render('admin' , {
  	title:"Administrator"
  });
});

//Login route
router.get('/login',function(req,res){
	res.render('login',{title:"Login"});
});


//Post requests
router.post('/register/admin', function(req,res){
	var user= new User();
	user.name=req.body.name;
	user.company=req.body.cname;
	user.eid=req.body.id;
	user.password=req.body.password;
	user.admin="admin";
	user.save(function(err){
		if (err) {
			console.log(err);
			res.send(err);
		}else{
			//res.send("Registered");
			res.redirect('/admin');
		}
	});
});

router.post('/register/emp', function(req,res){
	User.findById(req.body.key,function(err,admin){
		if (err) { res.send ("<h1>Invalid Key</h1><hr><a href='/signup/emp'>Go back</a></h2>"); }
		else if(!admin){
			res.send("<h1>Invalid Key</h1><hr><a href='/signup/emp'>Go back</a></h2>");
		}else if(admin.admin=="admin"){
			//console.log(usr.name);
			var user= new User();
			user.name=req.body.name;
            user.job=req.body.job;
            user.email=req.body.email;
            user.hiredate=req.body.hdate;
			user.company=admin.company;
			user.eid=req.body.id;
			user.password=req.body.password;
			user.admin=req.body.key;
			user.save(function(err){
				if (err) {
					console.log(err);
					res.send("<h2>"+err.message+"<hr><a href='/signup/emp'>Go back</a></h2>");
				}else{
					//res.send("Registered 1 employee");
					res.redirect('/');
				}
			});
		}
		else{
			res.send("<h1>Invalid Key - 2</h1><hr><a href='/signup/emp'>Go back</a></h2>");
		}
	});
});


router.post('/login',function(req,res,next){
	passport.authenticate('local',{
		successRedirect:'/',
		failureRedirect:'/login'
	})(req,res,next);
});

router.get('/logout',function(req,res){
	req.logout();
	res.redirect('/login');
});

module.exports = router;
