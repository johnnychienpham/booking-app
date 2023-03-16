import jwt from 'jsonwebtoken'
import { createError } from './error.js'


export const verifyToken = (req,res,next) => {
    const token=req.cookies.access_token;
    if(!token){
        return next(createError(401,"You are not authenticated"))
    }

    jwt.verify(token,process.env.JWT,(err,user) => {
        if (err) return next(createError(403,"Token is not valid"));
        req.user= user // user đằng sau dấu "=" sẽ bao gồm isAdmin, userId -- có thể đổi tên req.hello, bất cứ cái nào thấy phù hợp
        next() //if everything is ok, chạy tới next()
    })
}

export const verifyUser = (req,res,next) => {
    verifyToken(req,res,next, () =>{
        //chính user đó thì mới delete được chính mình, hoặc chỉ admin mới được delete user
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            return next(createError(403,"You are not authorized"))
        }
    }) 
} 


export const verifyAdmin = (req,res,next) => {
    verifyToken(req,res,next, () =>{
        //chính user đó thì mới delete được chính mình, hoặc chỉ admin mới được delete user
        if(req.user.isAdmin){
            next()
        }else{
            return next(createError(403,"You are not authorized"))
        }
    }) 
} 