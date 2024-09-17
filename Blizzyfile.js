const express=require('express')
const app=express()    //express app


//get request for browser
app.get('/',(req,res)=>{
  res.json({msg:"Welcome to the browser"})
})



//listening to request
app.listen(4000,()=>{
  console.log("Listening on port 4000")
})
