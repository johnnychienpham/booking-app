import Hotel from "../models/Hotel.js";
import User from "../models/User.js";


export const updateUser = async (req,res,next)=>{
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updatedUser)
    }catch(err){
        next(err);
    }
}

export const deleteUser = async (req,res,next)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")
    }catch(err){
        next(err);
    }
}

export const getUser = async (req,res,next)=>{
    try{
        const user= await User.findById(req.params.id)
        res.status(200).json(user)
    }catch(err){
        next(err);
    }
}

export const getUsers = async (req,res,next)=>{
    try{
        const users = await User.find()
        res.status(200).json(users)
    }catch(err){
        next(err);
    }
}


export const getLatestUsers = async (req,res,next)=>{
    try{
        const latestUsers = await User.find().sort({createdAt: -1 }).limit(6)
        res.status(200).json(latestUsers)
    }catch(err){
        next(err)
    }
}

export const like = async (req,res,next)=>{
    const id = req.user.id
    const hotelId = req.params.hotelId
    try{
        await Hotel.findByIdAndUpdate(hotelId,{
            $addToSet:{likes:id},
            $pull:{dislikes:id}
        })
        res.status(200).json("The hotel has been liked")
    }catch(err){
        next(err)
    }
};

export const dislike = async (req,res,next)=>{
    const id = req.user.id
    const hotelId = req.params.hotelId
    try{
        await Hotel.findByIdAndUpdate(hotelId,{
            $addToSet:{dislikes:id},
            $pull:{likes:id}
        })
        res.status(200).json("The hotel has been disliked")

    }catch(err){
        next(err)
    }
};


