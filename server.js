require ('dotenv').config()

const express=require('express')
const app=express()    //express app
const mongoose=require('mongoose')

//get request for browser
app.get('/',(req,res)=>{
  res.json({"From the backend side":"Welcome to TalentTrade!"})
})


const connectToMongoose = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    app.listen(process.env.PORT, () => {
      console.log('Connected to DB and Listening on port',process.env.PORT)
    })
  } catch (error) {
    console.log("error")
  }
}

connectToMongoose()

//listening to request

//testing