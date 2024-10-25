const axios=require('axios')
const express=require('express')
const UserProfile=require('./schema')
const mongoose=require('mongoose')

const router=express.Router()

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

//add a single skill
router.patch('/add/:email',async (req,res)=>{
  const { email } = req.params;
  const { User } = req.body;

  const updateFields = {};

  if (User?.Skills?.learning_skills) {
      updateFields["User.Skills.learning_skills"] = User.Skills.learning_skills;
  }

  if (User?.Skills?.teaching_skills) {
      updateFields["User.Skills.teaching_skills"] = User.Skills.teaching_skills;
  }

  console.log(updateFields)

  const Userdata = await UserProfile.findOneAndUpdate(
      { "User.Personal_info.Email": email },
      { $addToSet: updateFields },
      { new: true }
  );

  if (!Userdata) {
      return res.status(404).json({ error: 'No such user' });
  }
  res.status(200).json(Userdata);

})


module.exports=router


