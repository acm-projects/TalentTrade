require ('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const admin = require ("./firebaseAdmin")
const cors = require("cors")

const app = express()    //express app
const userRoutes =  require('./routes/userRoutes') // user routes

// middleware + cors for getting resources from external server
app.use(cors());

app.use(express.json())

//get request for browser
app.get('/',(req,res)=>{
  res.json({"From the backend side":"Welcome to TalentTrade!"})
})

//routes
app.use('/api/users', userRoutes)

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


// verify id token, if it it not verified error is sent to client
async function verifyToken (req, res, next) {
  const idToken = req.headers.authorization;

  if (!idToken) {
    return res.status(401).send("Unauthorized Login");
  }

  try {
    const decodedToken = await admin.auth().verfiyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).send("Unauthorized Login")
  }
}