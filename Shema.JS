const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
name:String,
lastname:String,
age:Number,
email:{
    type:String,
    required:true,
    unique:true
}
})
module.exports = mongoose.model('contactSchema',contactSchema)