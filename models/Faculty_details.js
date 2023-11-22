const mongoose = require('mongoose')
const SMSchema = new mongoose.Schema({
    firstName : String,
    middleName : String,
    lastName : String,
    username:String,
    password:String,
    id : String,
    email : String,
    phnno :String,
    dept : String,
    post : String,
    gender : String,
    exp : String
}, 
{
    timestamps: true
});

const Faculty_detailsModel = mongoose.model("faculty_details", SMSchema);
module.exports= Faculty_detailsModel