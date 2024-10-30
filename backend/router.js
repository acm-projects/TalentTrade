const axios=require('axios')
const express=require('express')
const UserProfile=require('./schema')
const Userchats=require('./chatSchema')
const mongoose=require('mongoose')
require ('dotenv').config()

const router=express.Router()

//file upload
const multer = require("multer")
const path = require("path")
const fs = require("fs")

//get all users
router.get('/', async (req, res) => {
  try {
    const UsersData = await UserProfile.find({}).sort({createdAt: -1}); 
    res.status(200).json(UsersData);
  } catch (error) {
    console.error('Error fetching users:', error); 
    res.status(500).json({ message: 'Error fetching users', error: error }); 
  }
})

//getting single user data by email
router.get('/:email',async (req,res)=>{
  const {email}=req.params


  const Userdata=await UserProfile.findOne({"User.Personal_info.Email":email})

  if(!Userdata){
    return res.status(404).json({error: 'No such user'})
  }
  res.status(200).json(Userdata)

}
)

router.get('/other/:username',async (req,res)=>{
  const {username}=req.params


  const Userdata=await UserProfile.findOne({"User.Personal_info.Username":username})

  if(!Userdata){
    return res.status(404).json({error: 'No such user'})
  }
  res.status(200).json(Userdata)

}
)

//creating a new user data
router.post('/', async (req, res) => {
  try {
      const { User } = req.body;
      
      // check if Email and Password are provided
      if (!User || !User.Personal_info || !User.Personal_info.Email || !User.Personal_info.Password) {
          return res.status(400).json({ error: "Email and Password are required fields." });
      }

      const Userdata = await UserProfile.create({ User });
      res.status(200).json({ Userdata });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
});

router.post('/recommendations', async (req,res)=>{
  try{
    const email=req.body.email
    const specificUser= await UserProfile.findOne({'User.Personal_info.Email': email}).lean()
    console.log(specificUser)
    
    if (!specificUser){
      return res.status(404).json({message: 'User not found'})
    }

    const username=specificUser.User.Personal_info.Username
    const allusers= await UserProfile.find({}).lean()
    console.log({username:username, usersdata:allusers})

    const flaskResponse= await axios.post('http://localhost:8000/api/getrecommendations', {
      username:username,
      usersdata: allusers
    },{
      headers: {
        'Content-Type': 'application/json'
      }});
    const recommendationsresponse=flaskResponse.data
    const usernames=recommendationsresponse.map(tuple => tuple[0])

    const userProfilePromises = usernames.map(username => 
      UserProfile.findOne({ "User.Personal_info.Username": username }).exec())

    const UserProfiles= await Promise.all(userProfilePromises)

    res.json(UserProfiles)


  }
  catch(error){
    console.error('Error:',error);
    res.status(500).json({message:'Server error'});
  }
})


//deleting a skill
router.delete('/:id',async (req,res)=>{
  const {id}=req.params
  const { skillId, skillType } = req.body;


  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:'No such user'})
  }

  const update = {};
  if (skillType === 'learning') {
    update['$pull'] = { 'User.Skills.learning_skills': { _id: skillId } };
  } else if (skillType === 'teaching') {
    update['$pull'] = { 'User.Skills.teaching_skills': { _id: skillId } };
  } else {
    return res.status(400).json({ error: 'Invalid skill type' });
  }

  try {
    const updatedUser = await UserProfile.findOneAndUpdate(
      { _id: id },
      update,
      { new: true } 
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(updatedUser); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}


//updating user data
)
router.patch('/:email',async (req,res)=>{
  const { email }=req.params

  const updateFields = {};
  const { User } = req.body;

  if (User?.Personal_info) {
    Object.keys(User.Personal_info).forEach((info) => {
      updateFields[`User.Personal_info.${info}`] = User.Personal_info[info];
    });
  }

  if (User?.Skills?.learning_skills) {
    updateFields["User.Skills.learning_skills"] = User.Skills.learning_skills;
  }
  if (User?.Skills?.teaching_skills) {
    updateFields["User.Skills.teaching_skills"] = User.Skills.teaching_skills;
  }


  const Userdata = await UserProfile.findOneAndUpdate(
    { "User.Personal_info.Email": email },
    { $set: updateFields }, 
    { new: true } 
  )

  if(!Userdata){
    return res.status(404).json({error: 'No such user'})
  }
  res.status(200).json(Userdata)

})


//FILE UPLOAD STUFF
//create uploads directory if doesnt exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

//file upload
router.patch('/uploadProfilePicture/:email', upload.single('file'), async (req, res) => {
  const { filename } = req.file;
  const { email }=req.params

  const updateFields = {}
  updateFields["User.Personal_info.profilePicture"] = `/uploads/${filename}`
  const Userdata = await UserProfile.findOneAndUpdate(
    { "User.Personal_info.Email": email },
    { $set: updateFields }, 
    { new: true } 
  )

  if(!Userdata){
    return res.status(404).json({error: 'No such user'})
  }
  res.status(200).json(Userdata)
})

router.patch('/uploadProfileBanner/:email', upload.single('file'), async (req, res) => {
  const { filename } = req.file;
  const { email }=req.params

  const updateFields = {}
  updateFields["User.Personal_info.profileBanner"] = `/uploads/${filename}`
  const Userdata = await UserProfile.findOneAndUpdate(
    { "User.Personal_info.Email": email },
    { $set: updateFields }, 
    { new: true } 
  )

  if(!Userdata){
    return res.status(404).json({error: 'No such user'})
  }
  res.status(200).json(Userdata)
})
//zoom routes begin yay

//getting access token using app credentials for any api request to zoom
const getAccessToken = async () => {
  const clientId = process.env.ClientID;
  const clientSecret = process.env.ClientSecret;
  const base64Credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  console.log('hello')
  try {
    const response = await axios.post('https://zoom.us/oauth/token', 
      `grant_type=account_credentials&account_id=${process.env.AccountID}`,
      {
        headers: {
          'Authorization': `Basic ${base64Credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    console.log(response.data.accessToken)
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error.response?.data || error.message);
    throw new Error('Failed to get access token');
  }
};

//create meeting by access token, post request to zoom url
router.post('/createMeeting', async (req, res) => {
  try {
    const {chatID}=req.body
    const accessToken = await getAccessToken();
    
    const userId = "shehaan.sunay@gmail.com"     //probably get this from frontend (auth.currentuser.email)
    const createMeetingUrl = `https://api.zoom.us/v2/users/${userId}/meetings`;
    
    const meetingData = {     //ask this information from user, frontend sends this also
      topic: "Testing Zoom Meeting API",
      type: 1,
      settings: {
        host_video: true,
        participant_video: true,
        join_before_host: true,
        mute_upon_entry: false,
        auto_recording: "none"
      }
    };

    const response = await axios.post(createMeetingUrl, meetingData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    


    const chatData= await Userchats.findOneAndUpdate(
      {_id:chatID},
      {$push:{meetings:{
        meetingID:response.data.id.toString(),
        meetingUrl:response.data.join_url,
        meetingTopic:meetingData.topic
      }}},
      {new:true}
    )
    //console.log(chatData)
    res.json({
      chatdata:chatData
    });
  } catch (error) {
    console.error('Error creating meeting:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to create meeting', 
      details: error.response?.data || error.message 
    });
  }
});

router.get('/get/meetings',async(req,res)=>{
  const {chatID}=req.body

  try{
    const currentchat= await Userchats.findOne({_id:chatID})

    if(!currentchat){
      console.log("Error, no such chat")
    }
    res.json(currentchat.meetings)
  }
  catch(error){
    console.error(error.response?.data || error.message)
    res.status(500).json({
      error: 'Failed to fetch meeting', 
      details: error.response?.data || error.message 
    })
  }
})

//deleting a meeting with meeting id, delete request to zoom url
router.delete('/delete/Meeting',async (req,res)=>{
  const accessToken= await getAccessToken();
  const {chatID,meetingID}=req.body   //get it from frontend
  const deletemeetingurl= `https://api.zoom.us/v2/meetings/${meetingID}`;
  
  try {
    const response = await axios.delete(deletemeetingurl,{
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    const chatData= await Userchats.findOneAndUpdate(
      {_id:chatID},
      {$pull:{meetings:{meetingID:meetingID}}},
      {new:true})
    res.json({
      chatData
    });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({
      error:"failed to delete meeting",
      details:error.response?.data || error.message
    })
  }
})

//patch later, first get create and delete done



module.exports=router


