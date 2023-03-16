import Comment from "../models/Comment.js";
import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";
export const addComment = async (req,res,next) =>{
    const newComment = new Comment({...req.body,userId:req.user.id})
    try {
        const savedComment = await newComment.save()
        res.status(200).send(savedComment)
    } catch (err) {
        next(err)
    }
}

export const deleteComment = async (req,res,next) =>{
    try {
        // const comment = await Comment.findById(res.params.id)
        // const hotel = await Hotel.findById(res.params.id)
        const comment = await Comment.findById(req.params.id)
        const hotel = await Hotel.findById(req.params.id)
        if(req.user.id=== comment.userId){
            await Comment.findByIdAndDelete(req.params.id)
            res.status(200).json("The comment has been deleted")
        }else{
            return next(createError(403,"You cannot delete your comment"))
        }
        
    } catch (err) {
        next(err)
    }
}

export const getComments = async (req,res,next) =>{
    try {
        const comments = await Comment.find({ hotelId: req.params.hotelId });
        res.status(200).json(comments);
    } catch (err) {
        next(err)
    }
}