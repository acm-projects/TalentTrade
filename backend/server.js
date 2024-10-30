require ('dotenv').config()

const express=require('express')
const app=express()    //express app
const mongoose=require('mongoose')
const userRoutes=require('./router')
const cors = require('cors');

//file upload
const multer = require("multer")
const path = require("path")
const fs = require("fs")




// middleware
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000', // allow requests from frontend
  methods: ['GET','PATCH','POST', 'DELETE'], // allowed methods
  credentials: true // allowing cookies, etc
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


//get request for browser
app.get('/',(req,res)=>{
  res.json({"From the backend side":"Welcome to TalentTrade!"})
})


app.use('/api/users',userRoutes)

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

// storage for multer