const mongoose = require('mongoose')

const SMSchema = new mongoose.Schema({
    Fac_Notice:String,
})

const Fac_NoticeModel = mongoose.model("fac_notice",SMSchema)
module.exports= Fac_NoticeModel