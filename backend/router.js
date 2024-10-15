const express=require('express')
const UserProfile=require('./schema')
const mongoose=require('mongoose')

const router=express.Router()

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
module.exports=router


