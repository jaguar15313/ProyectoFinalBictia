const mongoose = require('mongoose');
const Schema=mongoose.Schema;

var MovieSchema=new Schema({
    fistName:String,
    lastName:String,
    email:String,
    password:String,
    image:String,
});
module.exports=mongoose.model('Movie',MovieSchema);