import User from "../models/User.js"
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import jwt from 'jsonwebtoken'

//user register function
export const register = async (req,res,next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password,salt)

        const newUser = new User({
            ...req.body,
            password: hash
        })// req.body lấy tất cả các property username, email, country, city, phone
        await newUser.save()
        res.status(200).send("User has been created.")
    }catch(err){
        next(err)
    }
}

//login function
export const login = async (req,res,next) => {
    try {
        const user= await User.findOne({username:req.body.username})
        if(!user) return next(createError(404,"User not found!"))
        
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect) 
            return next(createError(400,"Wrong password or username!"))

        const token = jwt.sign({id:user._id, isAdmin:user.isAdmin},process.env.JWT) 

        const{password, isAdmin, ...otherDetails}= user._doc // vì trong user._doc có cái trường password, isAdmin, ...
        res.cookie("access_token",token,{httpOnly:true},).status(200).json({details:{...otherDetails},isAdmin}) // nếu đúng hết thì gửi lại user nhưng ko có gửi lại password, isAdmin field
    }catch(err){
        next(err)
    }
}