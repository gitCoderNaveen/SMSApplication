const mongoose = require('mongoose')
 
const clientSchema = new mongoose.Schema({
    businessname:String,
    doorno:Number,
    city:String,
    pincode:Number,
    contactperson:String,
    prefix:String,
    mobileno:Number
})

const clientModel = mongoose.model('clientsdatas', clientSchema)
module.exports = clientModel