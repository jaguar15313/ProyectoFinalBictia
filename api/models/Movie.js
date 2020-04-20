const mongoose = require('mongoose');
const Schema=mongoose.Schema;

var MovieSchema=new Schema({
    // ID, lo genera por defecto
    nameMovie:String,
    category:String,
    premiere:Date, 
    // passwordAdmin:String
    
});
module.exports=mongoose.model('Movie',MovieSchema);