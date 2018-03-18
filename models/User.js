var mongoose = require('mongoose');
//var ObjectId = mongoose.Schema.Types.ObjectId;


//User Schema
var userSchema = mongoose.Schema({
	eid:{
		type:String,
		required:true,
		unique:true
	},
	name:{
		type:String,
		required:true
	},
	job:{
		type:String
	},
	password:{
		type:String
	},
	email:{
		type:String
	},
	hiredate:{
		type:Date
	},
	company:{
		type:String
	},
	admin:{  //ObjectId for employee / 'admin' for admin
		type:String,
		required:true
	}
},{collection:'users'});

var User = module.exports =mongoose.model('User',userSchema);