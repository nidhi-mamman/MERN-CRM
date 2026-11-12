const express= require("express")
const craeteuser=require("../controllers/user")
    const router=express.Router()
//register route
    router.post("/register",craeteuser.register)
    //login route
    router.post("/login",craeteuser.Login)
    router.get("/users",craeteuser.getusers)
    router.get("/users/:id", craeteuser.getuserById)
    router.put("/users/:id", craeteuser.updateUser)



    module.exports=router
