import "./updateUser.scss"
import useFetch from "../../hooks/useFetch";
import { Link , useLocation, useNavigate } from "react-router-dom";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";
import axios from "axios";
import Datatable from "../../components/datatable/Datatable";
const UpdateUser = ({inputs,title}) =>{
    // const [file, setFile] = useState("");S
    const location= useLocation()
    const id = location.pathname.split("/")[3]
    const {data,loading,error,reFetch}= useFetch(`/users/${id}`)
    // const [info,setInfo]= useState({})
    //thêm vào
    const [phone,setPhone] = useState(data.phone)
    const [country,setCountry] = useState(data.country)
    const [city,setCity] = useState(data.city)
    //
    const navigate= useNavigate()
    
    
    // const handleChange=e=>{
    //     setInfo(prev=> ({...prev,[e.target.id]:e.target.value}))
    // }
    const handleChangePhone = (e) => {
        if (e.target.value===""){
            setPhone(data.phone)
        }else{
            setPhone(e.target.value)
        }
    }

    const handleChangeCountry = (e) => {
        if (e.target.value===""){
            setCountry(data.country)
        }else{
            setCountry(e.target.value)
        }
    }
    const handleChangeCity = (e) => {
        if (e.target.value===""){
            setCity(data.city)
        }else{
            setCity(e.target.value)
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
        const updateUser= {
            phone:phone,
            city:city,
            country:country
        }
          await axios.put(`/users/${data._id}`,updateUser)
          navigate(`/users/${data._id}`)
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
                <h1>{title}</h1>
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
                    <img src= {`${data.img}`||"https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} />
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
                        <label>Phone</label>
                        <input onChange={handleChangePhone} type="text" placeholder={data.phone}  id="phone" />
                    </div>
                    <div className="formInput">
                        <label>Country</label>
                        <input onChange={handleChangeCountry} type="text" placeholder={data.country} id="country" />
                    </div>
                    <div className="formInput">
                        <label>City</label>
                        <input onChange={handleChangeCity} type="text" placeholder={data.city} id="city" />
                    </div>
                    <button onClick={handleClick}>Update</button>
                    </form>
                </div>
                </div>
            </div>
        </div>
            
    )
}

export default UpdateUser;
