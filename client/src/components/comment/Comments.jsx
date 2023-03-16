import React, { useState, useEffect } from 'react'
import axios from "axios"
import Comment from './Comment'
import useFetch from '../../hooks/useFetch'
import "./comments.css"
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useLocation } from 'react-router-dom'

const Comments = ({hotelId}) => {
    const [newComment,setNewComment] = useState("")
    const [comments,setComments] = useState([])
    const {user,loading,error} = useContext(AuthContext)
    // const location = useLocation()
    // const id = location.pathname.split("/")[1]
    
    
    useEffect(()=>{
        const fetchComment = async()=>{
            try{
                const res = await axios.get(`/comments/${hotelId}`)
                setComments(res.data)
            }catch(err){

            }
        }  
    fetchComment()
    },[hotelId,comments])

    const handleClick= async (e)=>{
        
        try {
              const comment = {
                desc:newComment,
                hotelId:hotelId
              }
              await axios.post("/comments",comment)
              e.preventDefault();
              setComments(comments)  
        } catch (err) {
            console.log(err)
        }
        
    }
    
  return (
    
    // <div className="container-comments">
    //     <div className="newComment">
    //         <img src={user.img} /> 
    //         <input onChange={e=>setNewComment(e.target.value)} placeholder="Add a comment..." />
    //         <button onClick={handleClick}>Comment</button>
            
    //     </div>
    //     {comments.map(comment=>(
    //         <Comment key={comment._id} comment={comment}/>
    //     ))}
    // </div>
    <div>
        { user ? (
            <div className="container-comments">
                <div className="newComment">
                    <img src={user.img} alt="user avatar" /> 
                    <input onChange={e=>setNewComment(e.target.value)} placeholder="Add a comment..." />
                    <button onClick={handleClick}>Comment</button>
                    
                </div>
                {comments.slice(0).reverse().map(comment=>(
                    <Comment key={comment._id} comment={comment} currentUserId={user._id} /> 
                ))}
            </div>

        ):
        (
            <div className="container-comments">
                {comments.map(comment=>(
                    <Comment key={comment._id} comment={comment}/>
                ))}
            </div>

        )}
    </div>
  )
}

export default Comments