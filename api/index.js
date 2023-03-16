import express from 'express';
import dotenv from 'dotenv'; //ẩn URL từ file .env
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import usersRoute from './routes/users.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';
import stripeRoute from './routes/stripe.js';
import commentsRoute from './routes/comments.js';
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB.")
    } catch (error) {
        throw error
    }
};

mongoose.connection.on("Disconnected", ()=>{
    console.log("mongoDB disconnected!")
})



//middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json()) // vì express mặc định không cho gửi json

app.use("/api/auth",authRoute)
app.use("/api/users",usersRoute)
app.use("/api/hotels",hotelsRoute)
app.use("/api/rooms",roomsRoute)
app.use("/api/checkout", stripeRoute);
app.use("/api/comments", commentsRoute);
//error handling middleware
app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack
    })
})



app.listen(8800, ()=>{
    connect()
    console.log("Connected to backend.")
})
