const mongoose = require('mongoose')
const connectdb= async()=>{
    try{
      await  mongoose.connect('mongodb+srv://samisaafi:8NDc7iSKBnbP24SO@cluster0.gs624vj.mongodb.net/?retryWrites=true&w=majority')
        console.log('you are connected to ur db')
    }catch(err){
        console.log(err)
    }
}

module.exports = connectdb