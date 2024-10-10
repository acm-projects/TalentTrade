const express=require('express')
const UserProfile=require('./schema')
const mongoose=require('mongoose')

const router=express.Router()

//getting single user data
router.get('/email/:email',async (req,res)=>{
  const {email}=req.params

  //if(!mongoose.Types.ObjectId.isValid(id)){
    //return res.status(404).json({error:'No such user'})
  //}

  const Userdata=await UserProfile.findOne({'User.Personal_info.Email':email})

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


//deleting a user data
router.delete('/:id',async (req,res)=>{
  const {id}=req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:'No such user'})
  }

  const Userdata=await UserProfile.findOneAndDelete({_id:id})

  if(!Userdata){
    return res.status(404).json({error: 'No such user'})
  }
  res.status(200).json(Userdata)

}


//updating user data

)
router.patch('/:id',async (req,res)=>{
  const {id}=req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:'No such user'})
  }

  const Userdata=await UserProfile.findOneAndUpdate({_id:id},{
    ...req.body
  },{ new: true})

  if(!Userdata){
    return res.status(404).json({error: 'No such user'})
  }
  res.status(200).json(Userdata)

})
module.exports=router

