//Require mongoose
// Mongoose is a module to communicate with the mongodb database
var mongoose = require('mongoose');


//TimeStamp Schema
var timeSchema = mongoose.Schema({
    eid:{              // eid stored as string
    	type:String,
    	required:true
    },
    intime:{           // intime stored as date object
        type:Date
    },
    outtime:{          //outtime stored as date object
        type:Date
    },
    duration:{  //duration in hrs
        type:Number
    },
    complete:{  //true when outime else false
        type:Boolean,
        required:true,
        default:false
    },
    category:{       //type of timestamp - "regular" for in/out punch ; "leave" for leaves
        type:String
    },
    leavetype:{      //If the timestamp is a leave , then "sick","casual","training" otherwise null
        type:String
    }
},{collection:'timestamp'});  // schema for timestamp collection in the database

var Time = module.exports =mongoose.model('Time',timeSchema);
