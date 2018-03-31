var express = require('express');
var router = express.Router();

var User = require('../models/User');
var Time = require('../models/Time');

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

router.get('/payroll/:id' ,function(req,res){
    Time.find({eid:req.params.id} ,function(err,times){
        User.findById(req.params.id ,function(err,user){
            if(err){res.send(err);}
            else{
                User.findById(user.admin ,function(err,admin){
                    Time.find({category:"leave" , eid:user._id} , function(err , leaves){
                        if(err) res.send(err);
                        console.log(leaves);
                        res.render('payroll',{
                            title:'Employee Pay',
                            times:times,
                            emp:user,
                            admin:admin,
                            leaves:leaves
                        });
                    });
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

router.post('/intime/:id', function(req,res){
    User.findById(req.params.id , function(err,emp){
        if(err){res.send(err);}
        else{
            var intime= new Time();
            intime.eid = emp._id;
            intime.intime = Date.now();
            emp.in = true;
            emp.intime_id = intime._id;
            emp.intime = intime.intime;
            emp.save();
            intime.save(function(err){
                if(err){res.send(err);}
                else {
                    res.redirect('/users/'+emp._id);
                }
            });
        }
    });
});

router.post('/outtime/:id', function(req,res){
    User.findById(req.params.id , function(err,emp){
        if(err){res.send(err);}
        else{
            Time.findById(emp.intime_id , function(err,time){
                if (err){res.send(err);}
                else{
                    time.outtime = Date.now();
                    emp.in = false;
                    emp.intime_id = null;
                    emp.intime = null;
                    time.duration=(((time.outtime - time.intime)/1000)/3600).toFixed(4);
                    time.complete = true;
                    time.category = "regular";
                    time.save(function(err){
                        if(err){res.send(err);}
                        else{
                            emp.save();
                            res.redirect('/users/'+emp._id);
                        }
                    });
                }
            });
        }
    });
});

router.post('/leave/:id' ,function(req,res){
    User.findById(req.params.id ,function(err,user){
        if (err){res.send(err+"1");}
        else{
            var time = new Time();
            var reason = req.body.selleave;
            if(reason=="Sick" && user.sickleaves <10){
                time.duration = 5;
                user.sickleaves+=1;
            }
            else if(reason=="Casual" && user.casualleaves < 10){
                time.duration = 3;
                user.casualleaves += 1;
            }
            else if (reason=="Training" &&user.trainingleaves < 10){
                time.duration = 7;
                user.trainingleaves += 1;
            } else {
                time.duration = 0;
            }
            time.eid = user._id;
            time.category = "leave";
            time.leavetype = reason;
            time.intime = new Date(req.body.ldate);
            time.complete = true;
            time.save(function(err){
                if (err) res.send(err+"2");
                else{
                    user.save();
                    res.redirect('/users/'+user._id);
                }
            });
        }
    });
});

module.exports = router;
