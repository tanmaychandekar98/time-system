var express = require('express');
var router = express.Router();

var User = require('../models/User');

/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({},function(err,users){
  	res.json(users);
  });
});

router.get('/list/:id' , function(req,res){
	User.find({admin:req.params.id} , function(err,users){
		res.render('admin' , {
			title:"Administrator",
			list:users
		});
	});
});

router.get('/:id', function(req,res){
	User.findById(req.params.id ,function(err,emp){
		User.findById(emp.admin, function(err,admin){
			if (err){res.render('error');}
			else{
				res.render('emp', {
					title : "Employee Profile",
					emp:emp,
					admin:admin
				});
			}
		});
	});
});

router.post('/find_emp', function(req,res){
	if(req.body.eid){
		User.findOne({eid:req.body.eid}, function(err,emp){
			if (err){
				res.send("<h2>"+err.message+"<hr><a href='/admin'>Go back</a></h2>")
			}
			else
				res.redirect('/users/'+emp._id);
		});
	}else
		res.send("<h2>ID field is empty<hr><a href='/admin'>Go back</a></h2>")
});

module.exports = router;
