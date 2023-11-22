const mongoose = require('mongoose')
const SMSchema = new mongoose.Schema({
    enroll: String,
    eng : String,
    tel : String,
    hin : String,
    mat : String,
    sci : String,
    ss : String,
   
    
}, {
    timestamps: true
});

const MarksModel = mongoose.model("marks", SMSchema);
module.exports= MarksModel