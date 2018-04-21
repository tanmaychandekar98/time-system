/*
This is the configuratin file for passport module
Passport module is used to authenticate the user on login
Local strategy - Users info is stored locally in a database
*/

//Require modules which are used
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');
var config = require('../config/database');
var passport = require('passport');


module.exports = function(passport){
	passport.use(new LocalStrategy(function(eid,password,done){   //Local strategy is used
		User.findOne({eid:eid},function(err,user){  //Find the user by eid
			if(err) throw err;
			if(!user)
				return done(null,false,{message:"No User Found !"});  // If no user is found
			if(password==user.password){
				return done(null,user); //Return 'user' variable if user is found
			}
			else
				return done(null,false,{message:"Incorrect Password !"});
		});
	}));
	passport.serializeUser(function(user, done) {
		done(null, user.id);  //sort the users acc. to user id
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
		done(err, user);
		});
	});
}
