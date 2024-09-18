const express=require('express')
const app=express()    //express app
const mongoose=require('mongoose')

//get request for browser
app.get('/',(req,res)=>{
  res.json({msg:"Welcome to the browser"})
})

//connect to db
mongoose.connect("mongodb+srv://shehaansunay:Sunay123@profileschema.5isd0.mongodb.net/")
.then(()=>{
  app.listen(4000,()=>{
    console.log('Connected to DB and Listening on port',4000)
  })
})
.catch((error)=>{
  console.log(error)
})



//listening to request

//testing