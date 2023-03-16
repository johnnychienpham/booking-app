import express from 'express'
import { updateUser, deleteUser, getUser, getUsers, getLatestUsers, like, dislike } from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';


const router = express.Router();

// router.get("/checkauthentication",verifyToken, (req,res,next) =>{
//     res.send("hello user, you are logged in ")
// })

// router.get("/checkuser/:id",verifyUser, (req,res,next) =>{
//     res.send("hello user, you are logged in and you can delete your account ")
// })

// router.get("/checkadmin/:id",verifyAdmin, (req,res,next) =>{
    //     res.send("hello admin, you are logged in and you can delete all accounts ")
    // })

    //like video
    router.put("/like/:hotelId",verifyToken,like)
    
    //dislike video
    router.put("/dislike/:hotelId",verifyToken,dislike)

    //UPDATE
    router.put("/:id", verifyUser, updateUser);
    
    // DELETE
    router.delete("/:id", verifyUser, deleteUser);
    
    //GET LATEST USERS
    router.get("/latestUsers",verifyAdmin,getLatestUsers)
    
    //GET
    router.get("/:id", verifyUser,getUser);
    
    //GET ALL
    router.get("/", verifyAdmin, getUsers);
    
    
    
    
export default router