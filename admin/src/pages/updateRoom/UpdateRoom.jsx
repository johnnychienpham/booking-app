import "./updateRoom.scss"
import useFetch from "../../hooks/useFetch";
import { Link , useLocation, useNavigate } from "react-router-dom";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";
import axios from "axios";
import Datatable from "../../components/datatable/Datatable";
const UpdateRoom = () =>{
    // const [file, setFile] = useState("");S
    const location= useLocation()
    const id = location.pathname.split("/")[3]
    const {data,loading,error,reFetch}= useFetch(`/rooms/${id}`)
    // const [info,setInfo]= useState({})
    //thêm vào
    const [title,setTitle] = useState(data.title)
    const [desc,setDesc] = useState(data.desc)
    const [price,setPrice] = useState(data.price)
    const [maxPeople,setMaxPeople] = useState(data.maxPeople)
    // const [city,setCity] = useState(data.city)
    //
    const navigate= useNavigate()
    
    
    // const handleChange=e=>{
    //     setInfo(prev=> ({...prev,[e.target.id]:e.target.value}))
    // }
    const handleChangeTitle = (e) => {
        if (e.target.value===""){
            setTitle(data.title)
        }else{
            setTitle(e.target.value)
        }
    }

    const handleChangeDesc = (e) => {
        if (e.target.value===""){
            setDesc(data.desc)
        }else{
            setDesc(e.target.value)
        }
    }
    const handleChangePrice = (e) => {
        if (e.target.value===""){
            setPrice(data.price)
        }else{
            setPrice(e.target.value)
        }
    }

    const handleChangeMaxPeople = (e) => {
        if (e.target.value===""){
            setMaxPeople(data.maxPeople)
        }else{
            setMaxPeople(e.target.value)
        }
    }
   
    const handleClick = async e =>{
        e.preventDefault()
        // const data = new FormData()
        // data.append("file",file)
        // data.append("upload_preset","upload")
        
        try {
        //   const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/duvhvl5pq/image/upload",data)
        //   const {url}= uploadRes.data
        //   const updateUser = {
        //     ...info
        //     // img:url
        //   }
        const updateRoom= {
            title:title,
            desc:desc,
            price:price,
            maxPeople:maxPeople
        }
          await axios.put(`/rooms/${data._id}`,updateRoom)
          navigate(`/rooms/${data._id}`)
        } catch (err) {
          console.log(err)
        }
      }

    return (
        <div className="new">
            <Sidebar />
            <div className="newContainer">
                {/* <Navbar /> */}
                <div className="top">
                <h1>Update Room</h1>
                </div>
                <div className="bottom">
                <div className="left">
                    {/* <img
                    src={
                        file
                        ? URL.createObjectURL(file)
                        : `${data.img}`
                    }
                    alt=""
                    /> */}
                    {/* <img src= {`${data.img}`} /> */}
                </div>
                <div className="right">
                    <form>
                    {/* <div className="formInput">
                        <label htmlFor="file">
                        Image: <DriveFolderUploadOutlinedIcon className="icon" />
                        </label>
                        <input
                        type="file"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{ display: "none" }}
                        />
                    </div> */}
                    <div className="formInput">
                        <label>Title</label>
                        <input onChange={handleChangeTitle} type="text" placeholder={data.title}  id="title" />
                    </div>
                    <div className="formInput">
                        <label>Description</label>
                        <input onChange={handleChangeDesc} type="text" placeholder={data.desc} id="desc" />
                    </div>
                    <div className="formInput">
                        <label>Price</label>
                        <input onChange={handleChangePrice} type="number" placeholder={data.price} id="price" />
                    </div>
                    <div className="formInput">
                        <label>Max People</label>
                        <input onChange={handleChangeMaxPeople} type="number" placeholder={data.maxPeople} id="city" />
                    </div>
                    <button onClick={handleClick}>Update</button>
                    </form>
                </div>
                </div>
            </div>
        </div>
            
    )
}

export default UpdateRoom;
