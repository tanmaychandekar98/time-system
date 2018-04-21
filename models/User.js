//Require mongoose
// Mongoose is a module to communicate with the mongodb database
var mongoose = require('mongoose');


//User Schema
var userSchema = mongoose.Schema({
	eid:{               // eid stored as string
		type:String,
		required:true,
		unique:true
	},
	name:{               // name stored as string
		type:String,
		required:true
	},
	job:{               // job stored as string
		type:String,
		required:true
	},
	password:{          // password stored as string
		type:String
	},
	email:{             // email stored as string
		type:String
	},
	hiredate:{          //hiredate stored as date obj.
		type:Date
	},
	company:{           //company stored as string
		type:String
	},
	admin:{  //ObjectId for employee / 'admin' for admin
		type:String,
		required:true
	},
	in:{            // 'true' if emp is working else 'false'
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
},{collection:'users'});  // schema for users collection in the database

var User = module.exports =mongoose.model('User',userSchema);
