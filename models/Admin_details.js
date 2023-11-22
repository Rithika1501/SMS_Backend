const mongoose = require('mongoose')
const SMSchema = new mongoose.Schema({
    firstName : String,
    middleName : String,
    lastName : String,
    username : String,
    password : String,
    id : String,
    email : String,
    phnno :String,
    gender : String,
    
}, 
{
    timestamps: true
});

const Admin_detailsModel = mongoose.model("admin_details", SMSchema);
module.exports= Admin_detailsModel