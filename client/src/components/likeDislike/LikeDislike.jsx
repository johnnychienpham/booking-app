import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import useFetch from '../../hooks/useFetch'

const LikeDislike = ({hotelData}) => {
    const {user,loading,error} = useContext(AuthContext)
    const [like,setLike]= useState(hotelData.likes?.length)
    const [dislike,setDisLike]= useState(hotelData.dislikes?.length)
    const [changeColorLike,setChangeColorLike] = useState(hotelData.likes?.includes(user._id))
    const [changeColorDislike,setChangeColorDislike] = useState(hotelData.dislikes?.includes(user._id))
    const {data,reFetch} = useFetch(`/hotels/find/${hotelData._id}`)

    const handleLike = async (e)=>{
        await axios.put(`/users/like/${hotelData._id}`)
        const res= await axios.get(`/hotels/find/${hotelData._id}`)
        // console.log("like"+res.data.likes.length)
        setLike(res.data.likes.length)
        setDisLike(res.data.dislikes.length)
        setChangeColorLike(res.data.likes?.includes(user._id))
        setChangeColorDislike(res.data.dislikes?.includes(user._id))
        // console.log(res.data.likes?.includes(user._id))
        // console.log(res.data.dislikes?.includes(user._id))
        
      }
    
    const handleDislike = async ()=>{
        await axios.put(`/users/dislike/${hotelData._id}`)
        const res= await axios.get(`/hotels/find/${hotelData._id}`)
        // console.log("dislike"+res.data.dislikes.length)
        setDisLike(res.data.dislikes.length)
        setLike(res.data.likes.length)
        setChangeColorDislike(res.data.dislikes?.includes(user._id))
        setChangeColorLike(res.data.likes?.includes(user._id))
        // console.log(res.data.dislikes?.includes(user._id))
        // console.log(res.data.likes?.includes(user._id))
    }

    
    
    
  return (
    <div>
        {/* <button onClick={handleLike}>{hotelData.likes?.includes(user._id)? (<FontAwesomeIcon style={{color:"#0071C2"}} icon={faThumbsUp} />): (<FontAwesomeIcon icon={faThumbsUp}/>)}{" "}{like}</button>
        <button onClick={handleDislike}>{hotelData.dislikes?.includes(user._id)? (<FontAwesomeIcon style={{color:"red"}} icon={faThumbsDown} />): (<FontAwesomeIcon  icon={faThumbsDown}/>)}{" "}{dislike}</button> */}
        <button onClick={handleLike}>{changeColorLike? (<FontAwesomeIcon style={{color:"#0071C2"}} icon={faThumbsUp} />): (<FontAwesomeIcon icon={faThumbsUp}/>)}{" "}{like}</button>
        <button onClick={handleDislike}>{changeColorDislike? (<FontAwesomeIcon style={{color:"red"}} icon={faThumbsDown} />): (<FontAwesomeIcon  icon={faThumbsDown}/>)}{" "}{dislike}</button>
    </div>
  )
}

export default LikeDislike