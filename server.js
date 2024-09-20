require ('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const admin = require ("./firebaseAdmin")
const cors = require("cors")

const app = express()    //express app

// cors for getting resources from external server
app.use(cors());

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

// post request (post user data)
app.post("/api/users", verifyToken, async (req, res) => {
  const { uid, name, email, picture } = req.user;

  let user = await User.findne({ uid });

  // if not user create one
  if (!user) {
    user = new User({ uid, name, email, picture})
    await user.save();
  }

  // if user send as a response
  res.send(user);
});