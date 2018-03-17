var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');
var config = require('../config/database');
var passport = require('passport');
//var bcrypt = require('bcryptjs');

module.exports = function(passport){
	passport.use(new LocalStrategy(function(eid,password,done){
		User.findOne({eid:eid},function(err,user){
			if(err) throw err;
			if(!user)
				return done(null,false,{message:"No User Found !"});
			if(password==user.password){
				return done(null,user);
			}
			else
				return done(null,false,{message:"Incorrect Password !"});
		});
	}));
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
		done(err, user);
		});
	});
}
