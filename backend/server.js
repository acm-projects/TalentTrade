require ('dotenv').config()

const express=require('express')
const app=express()    //express app
const mongoose=require('mongoose')
const userRoutes=require('./router')
const cors = require('cors');

// middleware
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:3000', // allow requests from frontend
  methods: ['GET','POST'], // allowed methods
  credentials: true // allowing cookies, etc
}));


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

//listening to request

//testing 2