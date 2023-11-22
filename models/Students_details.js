const mongoose = require('mongoose')
const SMSchema = new mongoose.Schema({
    firstName : String,
    middleName : String,
    lastName : String,
    username : String,
    password : String,
    enroll : String,
    email : String,
    phnno :String,
    cls : String,
    
}, {
    timestamps: true
});

const Student_deatilsModel = mongoose.model("student_details", SMSchema);
module.exports= Student_deatilsModel
