import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { hotelInputs, roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import validation from "./validation";

const NewRoom = () => {
  // const [file, setFile] = useState("");
  const [info,setInfo]= useState({})
  const [hotelId,setHotelId]= useState(undefined)
  const [rooms,setRooms]= useState([])
  const {data,loading,error}=useFetch("/hotels")
  const navigate = useNavigate()

  //Show error trước khi nộp form
  const [errors,setErrors] = useState({})
  const [dataIsCorrect,setDataIsCorrect]= useState(false)
  //

  const handleChange=e=>{
    setInfo(prev=> ({...prev,[e.target.id]:e.target.value}))
  }

  const handleClick = async e =>{
    e.preventDefault()
    //Show error
    setErrors(validation(info))
    if(Object.keys(errors).length===0){
      setDataIsCorrect(true)
    }else{
      setDataIsCorrect(false)
    }
    //
    const roomNumbers = rooms.split(",").map(room=>({number:room}))
    
    try{
      await axios.post(`/rooms/${hotelId}`,{...info,roomNumbers})
      navigate("/rooms")
    }catch(err){
      console.log(err)
    }
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        {/* <Navbar /> */}
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          {/* <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div> */}
          <div className="right">
            <form>
              
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} type={input.type} placeholder={input.placeholder} onChange={handleChange} />
                  {errors[input.id] && <p style={{color:"red", fontSize:"12px"}} className='error'>{errors[input.id]}</p>}
                </div>
              ))}
              <div className="formInput">
                  <label>Rooms</label>
                  <textarea onChange={e=>setRooms(e.target.value)} placeholder="give comma between room numbers."/>
              </div>
              <div className="formInput">
                  <label>Choose a hotel</label>
                  <select id="hotelId" onChange={e=>setHotelId(e.target.value)}>
                    {loading? "loading": data.map(hotel=>(
                      <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                    ))}
                  </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
