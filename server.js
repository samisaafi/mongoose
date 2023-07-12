const express = require('express')
const app = express()
 const port = 4000
 const connectdb =require('./connectdb') 
 connectdb()

app.use(express.json())


app.use('/code',Code)


 app.get('/', (req,res)=>{
    try{
        res.send('hello you are great')
    }catch(err){
        console.log(err)
    }
 })

 app.listen(port,err=>{
    err?console.log(err): console.log(`go to the port => ${port}`)
 })