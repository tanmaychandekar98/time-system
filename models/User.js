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
	},
	in:{
		type:Boolean,
		required:true,
		default:false
	},
	intime:{  //null if not working else in-punch time
		type:Date
	},
	intime_id:{  //null if not working else intime object
		type:String
	},
	sickleaves:{  //max 12 leaves are allowed to a user
		type:Number,
		required:true,
		default:0
	},
	casualleaves:{  //max 12 leaves are allowed to a user
		type:Number,
		required:true,
		default:0
	},
	trainingleaves:{  //max 12 leaves are allowed to a user
		type:Number,
		required:true,
		default:0
	}
},{collection:'users'});

var User = module.exports =mongoose.model('User',userSchema);
