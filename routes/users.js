//Load/require the modules required in this file
var express = require('express'); //Express module
var router = express.Router(); //Router module


// Require the User model from the mongodb database
var User = require('../models/User');

// Require the Time/timestamp model from the mongodb database
var Time = require('../models/Time');


/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find({},function(err,users){
  	res.json(users);
  });
});

//Function to get the list of employees under an admin with company key 'id'
router.get('/list/:id' , function(req,res){
	User.find({admin:req.params.id} , function(err,users){  //Find the users which have the admin with key equal to 'id'
		res.render('admin' , {      // Render the admin page again with the list of employees as 'users'
			title:"Administrator",
			list:users
		});
	});
});


//Function to display the employee page with variables 'admin' , 'emp'
router.get('/:id', function(req,res){
	User.findById(req.params.id ,function(err,emp){   //Find the employee obj.
		User.findById(emp.admin, function(err,admin){ //Find the admin obj. 
			if (err){res.render('error');}
			else{
				res.render('emp', {      // render the employee page with the apt. variables
					title : "Employee Profile",
					emp:emp,
					admin:admin
				});
			}
		});
	});
});

// Function to display the payroll page of an employee
router.get('/payroll/:id' ,function(req,res){
    Time.find({eid:req.params.id} ,function(err,times){   // Find all the timestamps for the employee
        User.findById(req.params.id ,function(err,user){  //FInd the employee 'user'
            if(err){res.send(err);}
            else{
                User.findById(user.admin ,function(err,admin){  //Find the admin of the employee
                    Time.find({category:"leave" , eid:user._id} , function(err , leaves){  //Find the leaves for the employee
                        if(err) res.send(err);
                        res.render('payroll',{  //render the payroll page with appropriate variables
                            title:'Employee Pay',
                            times:times,  //array of all timestamps
                            emp:user,    //user obj.
                            admin:admin, //admin obj.
                            leaves:leaves  //array of all the leaves object
                        });
                    });
                });
            }
        });
    });
});

//Function to search the employee by id (provided on the admin page)
// input 'eid' contains the employee id to search
router.post('/find_emp', function(req,res){
	if(req.body.eid){  
		User.findOne({eid:req.body.eid}, function(err,emp){  //Find the emp with the given eid
			if (err){
				res.send("<h2>"+err.message+"<hr><a href='/admin'>Go back</a></h2>")
			}
			else
				res.redirect('/users/'+emp._id);  //Redirect to the employee page
		});
	}else
		res.send("<h2>ID field is empty<hr><a href='/admin'>Go back</a></h2>")
});


//--------------PUNCH functions--------------

// PUNCH_IN function
router.post('/intime/:id', function(req,res){
    User.findById(req.params.id , function(err,emp){  //Find the user
        if(err){res.send(err);}
        else if(!emp){
        }
        else{
            var intime= new Time();  // Create a new timestamp instance
            intime.eid = emp._id;
            intime.intime = Date.now();  // set intime as current time
            emp.in = true;
            emp.intime_id = intime._id;  //set the intime attribute of the employee to current time
            emp.intime = intime.intime;
            emp.save(function(err){  
                if(err){res.send(err);}
                else{
                    intime.save(function(err){ // save the timstamp instance
                        if(err){res.send(err);}
                        else {
                            res.redirect('/users/'+emp._id);  //redirect to the employee page after punch-in
                        }
                    });
                }
            });
        }
    });
});


// PUNCH_OUT function
router.post('/outtime/:id', function(req,res){
    User.findById(req.params.id , function(err,emp){  //Find the user from the DB
        if(err){res.send(err);}
        else{
            Time.findById(emp.intime_id , function(err,time){  //Find the timestamp which is not complete
                if (err){res.send(err);}
                else{
                    time.outtime = Date.now();  //set outtime attribute to current time
                    emp.in = false;
                    emp.intime_id = null;
                    emp.intime = null;
                    time.duration=(((time.outtime - time.intime)/1000)/3600).toFixed(4);
                    time.complete = true;
                    time.category = "regular";
                    time.save(function(err){  //save the timestamp 
                        if(err){res.send(err);}
                        else{
                            emp.save();
                            res.redirect('/users/'+emp._id);  //redirect to the employee page
                        }
                    });
                }
            });
        }
    });
});


// APPLY_FOR_LEAVE function
//Input 'selleave' contains the reason for leave
//Input 'ldate' contains the day of leave
router.post('/leave/:id' ,function(req,res){
    User.findById(req.params.id ,function(err,user){  //find the user
        if (err){res.send(err+"1");}
        else{
            var time = new Time();  // Create a new timestamp instance
            var reason = req.body.selleave;
            if(reason=="Sick" && user.sickleaves <10){  //change attr. acc. to the leave reason
                time.duration = 5;
                user.sickleaves+=1;
            }
            else if(reason=="Casual" && user.casualleaves < 10){  //change attr. acc. to the leave reason
                time.duration = 3;
                user.casualleaves += 1;
            }
            else if (reason=="Training" &&user.trainingleaves < 10){  //change attr. acc. to the leave reason
                time.duration = 7;
                user.trainingleaves += 1;
            } else {
                time.duration = 0;
            }
            time.eid = user._id;
            time.category = "leave";  //set the category of the timestamp to 'leave'
            time.leavetype = reason;
            time.intime = new Date(req.body.ldate);  //set the time to given input date
            time.complete = true;
            time.save(function(err){
                if (err) res.send(err);
                else{
                    user.save();  // save the user
                    res.redirect('/users/'+user._id);  //redirect to the employee page
                }
            });
        }
    });
});


//Export this module to use it outside this file
module.exports = router;
