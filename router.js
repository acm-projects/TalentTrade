const express=require('express')
const UserProfile=require('./schema')

const router=express.Router()

router.get('/:id',(req,res)=>{
  res.json({msg:"GET a user profile"})

})

router.post('/', async (req,res)=>{

  try{
    const {User}=req.body;
    const Userdata= await UserProfile.create({User})
    res.status(200).json({Userdata})

  }catch(error){
    res.status(400).json({error:error.message})

  }

})


router.delete('/:id',(req,res)=>{
  res.json({msg:"DELETE a user profile"})

})

router.patch('/:id',(req,res)=>{
  res.json({msg:"UPDATE a user profile"})

})

module.exports=router


