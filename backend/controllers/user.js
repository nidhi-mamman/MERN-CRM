const user=require('../models/user');



//register new user
const register=async(req,res)=>{
    const {Name,Email,Password,Department,BatchYear}=req.body
    try{
        const existingUser=await user.findOne({Email})

if(existingUser){
res.send({Statuscode:2,Msg:"User already exists"})

}
else{
    const newuser=new user({
        Name,
        Email,
        Password,
        Department,
        BatchYear,
        UserType:"Alumni"
    })
    await newuser.save()
    res.send({Statuscode:1,Msg:"User registered successfully"
    })
}

    } catch(error){
        res.send({Statuscode:0,Msg:"Error registering user",Error:error.message})
    }

}



//Login user

const Login=async(req,res)=>{
    const {Email,Password}=req.body
    try{


        if(Email=="admin@gmail.com" && Password=="Admin@12345"){
            res.send({
                Statuscode:3,
                Msg:"Admin Login successful",
                Data:{
                    id:"admin",
                    name:"Admin",
                    userType:"Admin"
                }
            })
        }
        else{
      const existingUser=await user.findOne({Email})
if(existingUser){
    if(existingUser.Password==Password){
        res.send({
            Statuscode:1,
            Msg:"Login successful",
            Data:{
                id:existingUser._id,
                name:existingUser.Name,
                userType:existingUser.UserType || "Alumni"
            }
        })
    }else{
        res.send({Statuscode:2,Msg:"Invalid email or password"})
    }
    }else{
        res.send({Statuscode:2,Msg:"Invalid email or password"})    
    
    }
        }
  
    }
    catch(error){
        res.send({Statuscode:0,Msg:"Error logging in",Error:error.message})
    }
}

const getusers=async(req,res)=>{
    try{
        const users=await user.find().sort({createdAt:-1})
        res.send({Statuscode:1,Msg:"Users fetched successfully",Data:users})
    }
    catch(error){
        res.send({Statuscode:0,Msg:"Error fetching users",Error:error.message})
    }
}

const getuserById=async(req,res)=>{
    try{
        const userId=req.params.id
        const existingUser=await user.findById(userId)
        if(!existingUser){
            return res.send({Statuscode:2,Msg:"User not found"})
        }
        res.send({Statuscode:1,Msg:"User fetched successfully",Data:existingUser})
    }
    catch(error){
        res.send({Statuscode:0,Msg:"Error fetching user",Error:error.message})
    }
}

const updateUser=async(req,res)=>{
    try{
        const userId=req.params.id
        const {Name,Email,Department,BatchYear,Password} = req.body

        const updateData = { Name, Email, Department, BatchYear }
        if (Password) {
            updateData.Password = Password
        }

        const updatedUser = await user.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        )

        if(!updatedUser){
            return res.send({Statuscode:2,Msg:"User not found"})
        }

        const responseUser = {
            Name: updatedUser.Name,
            Email: updatedUser.Email,
            Department: updatedUser.Department,
            BatchYear: updatedUser.BatchYear,
            UserType: updatedUser.UserType,
        }

        res.send({Statuscode:1,Msg:"Profile updated successfully",Data:responseUser})
    }
    catch(error){
        res.send({Statuscode:0,Msg:"Error updating profile",Error:error.message})
    }
}

module.exports={register,Login,getusers,getuserById,updateUser}
