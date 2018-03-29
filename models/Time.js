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
    complete:{  //true when outime else false
        type:Boolean,
        required:true,
        default:false
    }
},{collection:'timestamp'});

var Time = module.exports =mongoose.model('Time',timeSchema);
