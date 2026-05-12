 import dotenv from "dotenv"
dotenv.config()
import express, { json } from "express"
import cors from "cors"
import mongoose from "mongoose"
import taskRoute from "./routes/taskRoute.js"
import authRoute from "./routes/authRoute.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use("/task",taskRoute)
app.use("/auth",authRoute)
const Port = process.env.PORT || 7000
console.log(process.env.PORT )
 mongoose.connect(process.env.MONGODBURL)
 .then(()=>{
    console.log("backned is connected")
    app.listen(Port,()=>{
    console.log(`server is live ,${Port}`)
})
 })
 .catch((error)=>{
    console.log(error)
 })

 
