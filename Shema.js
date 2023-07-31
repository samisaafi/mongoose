const mongoose = require('mongoose')

const personSchema = mongoose.Schema({
name:String,
lastname:String,
age:Number,
favoriteFoods:[String]
})
module.exports = mongoose.model('personSchema',personSchema)
