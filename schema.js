const mongoose=require("mongoose")

const Schema = mongoose.Schema

/*const profileSchema=new Schema({
  Username:{
    Name:{
      type:String
    }
  }
})*/

const profileSchema= new Schema({
  User:{
    Personal_info:{
      Username:{
        type:String,
        required:true
      },
      Email:{
        type:String,
        required:true
      },
      Password:{
        type:String,
        required:true
      },
      Fname:{
        type:String,
        required:true
      },
      Lname:{
        type:String
      },
      DOB:{
        type:String,
        required:true
      },
      year:{
        type:String     //freshman, sophomore, alumni, etc
      }

    },
    Skills:{
      teaching_skill:{
        Name:{
          type:String
        },
        Description:{
          type:String
        },
        Rating_score:{
          type:Number
        },
        Hours_taught:{
          type:Number
        }
      },
      learning_skill:{
        Name:{
          type:String
        }
      }

    }
  }
})

module.exports=mongoose.model("UserProfile",profileSchema)