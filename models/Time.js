var mongoose = require('mongoose');
//var ObjectId = mongoose.Schema.Types.ObjectId;


//TimeStamp Schema
var timeSchema = mongoose.Schema({
    eid:{
    	type:String,
    	required:true
    },
    intime:{
        type:Date
    },
    outtime:{
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
    category:{
        type:String
    },
    leavetype:{
        type:String
    }
},{collection:'timestamp'});

var Time = module.exports =mongoose.model('Time',timeSchema);
