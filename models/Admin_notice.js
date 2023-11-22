const mongoose = require('mongoose')

const SMSchema = new mongoose.Schema({
    Notice:String,
})

const NoticeModel = mongoose.model("notice",SMSchema)
module.exports= NoticeModel