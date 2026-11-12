const express= require("express")
const dotenv=require("dotenv").config()
const cors=require ("cors")
const app=express()
app.use(cors())
app.use(express.json())
const userRouter=require("./router/user")
const jobRouter=require("./router/job")
const eventRouter=require("./router/event")
const announcementRouter=require("./router/announcement")

const conncetdb=require("./config/db")
conncetdb()



app.use("/api",userRouter)
app.use("/api",jobRouter)
app.use("/api",eventRouter)
app.use("/api",announcementRouter)


app.listen(9000,()=>{
    console.log("server is running")
})
