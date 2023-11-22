const mongoose = require('mongoose')
const SMSchema = new mongoose.Schema({
    
}, 
{
    timestamps: true
});

const Faculty_marksModel = mongoose.model("faculty_marks", SMSchema);
module.exports= Faculty_marksModel