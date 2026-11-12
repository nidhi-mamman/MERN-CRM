const mongoose =require('mongoose');

const userSchema=new mongoose.Schema({
    Name:{
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
    Department:{
        type:String,
        default:""
    },
    BatchYear:{
        type:String,
        default:""
    },
    UserType:{
        type:String,
        default:"Alumni"
    }
},{
    timestamps:true
})

const User=mongoose.model("User",userSchema)
module.exports=User

