const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
name:String,
lastname:String,
age:Number,
favoriteFoods:[String]
})
module.exports = mongoose.model('contactSchema',contactSchema)