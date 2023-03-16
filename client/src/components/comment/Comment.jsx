import React, { useEffect, useState } from 'react'
import "./comment.css"
import axios from "axios"
import useFetch from '../../hooks/useFetch';
import { AuthContext } from '../../context/AuthContext'
import { useContext } from 'react'
import {format} from "timeago.js"

const Comment = ({comment,currentUserId}) => {
    const canDelete = currentUserId === comment.userId;
    const {user,loading,error} = useContext(AuthContext)
    const [username, setUsername] = useState({});
    // const {data}=useFetch(`/users/${comment.userId}`)
    // console.log(data)
    useEffect(() => {
        const fetchComment = async () => {
            const res = await axios.get(`/users/${comment.userId}`);
            setUsername(res.data)
            // setUsername(data)
        };
        fetchComment();
    }, [comment.userId]);

    const handleDeleteButton= async (e)=>{
        
        try {
        
            await axios.delete(`/comments/${comment._id}`)
                
        } catch (err) {
            console.log(err)
        }
        
    }

    
    return (

        <div className="container-comment">
            <img className="avatar-comment" src={username?.img} alt="img" />
            <div className='details-comment'>
                <span className="username-comment">
                    {username?.username} <span className='date-comment'>{format(comment.createdAt)}</span>
                </span>
                <span className="comment">{comment.desc}</span>   
                {canDelete&&<button className='comment-action' onClick={handleDeleteButton}>Delete</button>} 
            </div>
            {/* <div className='comment-actions'>
                {canDelete&&<button>delete</button>}
            </div> */}
        </div>
    )
}

export default Comment