const  mongoose = require('mongoose');

const employeeShcema = new mongoose.Schema({
    photo: {type: String, required: false},
    name:{type:String ,required:true},
    email:{type:String, require:true},
    position : String,
    salary:Number
});

module.exports = mongoose.model("Employee",employeeShcema);