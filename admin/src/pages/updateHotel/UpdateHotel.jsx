import "./updateHotel.scss"
import useFetch from "../../hooks/useFetch";
import { Link , useLocation, useNavigate } from "react-router-dom";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState } from "react";
import axios from "axios";
import Datatable from "../../components/datatable/Datatable";
const UpdateHotel = () =>{
    // const [file, setFile] = useState("");S
    const location= useLocation()
    const id = location.pathname.split("/")[3]
    const {data,loading,error,reFetch}= useFetch(`/hotels/find/${id}`)
    // const [info,setInfo]= useState({})
    //thêm vào
    const [name,setName] = useState(data.name)
    const [type,setType] = useState(data.type)
    const [city,setCity] = useState(data.city)
    const [address,setAddress] = useState(data.address)
    const [distance,setDistance] = useState(data.distance)
    const [title,setTitle] = useState(data.title)
    const [desc,setDesc] = useState(data.desc)
    const [cheapestPrice,setCheapestPrice] = useState(data.cheapestPrice)
    //
    const navigate= useNavigate()
    
    
    // const handleChange=e=>{
    //     setInfo(prev=> ({...prev,[e.target.id]:e.target.value}))
    // }
    const handleChangeName = (e) => {
        if (e.target.value===""){
            setName(data.name)
        }else{
            setName(e.target.value)
        }
    }

    const handleChangeType = (e) => {
        if (e.target.value===""){
            setType(data.type)
        }else{
            setType(e.target.value)
        }
    }

    const handleChangeCity = (e) => {
        if (e.target.value===""){
            setCity(data.city)
        }else{
            setCity(e.target.value)
        }
    }

    const handleChangeAddress = (e) => {
        if (e.target.value===""){
            setAddress(data.address)
        }else{
            setAddress(e.target.value)
        }
    }

    const handleChangeDistance = (e) => {
        if (e.target.value===""){
            setDistance(data.distance)
        }else{
            setDistance(e.target.value)
        }
    }

    const handleChangeTitle = (e) => {
        if (e.target.value===""){
            setTitle(data.title)
        }else{
            setTitle(e.target.value)
        }
    }

    const handleChangeDescription = (e) => {
        if (e.target.value===""){
            setDesc(data.desc)
        }else{
            setDesc(e.target.value)
        }
    }

    const handleChangePrice = (e) => {
        if (e.target.value===""){
            setCheapestPrice(data.cheapestPrice)
        }else{
            setCheapestPrice(e.target.value)
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
        const updateHotel= {
            name:name,
            type:type,
            city:city,
            address:address,
            distance: distance,
            title:title,
            desc:desc,
            cheapestPrice:cheapestPrice,
            
        }
          await axios.put(`/hotels/${data._id}`,updateHotel)
          navigate(`/hotels/find/${data._id}`)
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
                <h1>Update Hotel</h1>
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
                        <label>Name</label>
                        <input onChange={handleChangeName} type="text" placeholder={data.name}  id="name" />
                    </div>
                    <div className="formInput">
                        <label>Type</label>
                        <input onChange={handleChangeType} type="text" placeholder={data.type} id="type" />
                    </div>
                    <div className="formInput">
                        <label>City</label>
                        <input onChange={handleChangeCity} type="text" placeholder={data.city} id="city" />
                    </div>
                    <div className="formInput">
                        <label>Address</label>
                        <input onChange={handleChangeAddress} type="text" placeholder={data.address} id="address" />
                    </div>
                    <div className="formInput">
                        <label>Distance</label>
                        <input onChange={handleChangeDistance} type="text" placeholder={data.distance} id="distance" />
                    </div>
                    <div className="formInput">
                        <label>Title</label>
                        <input onChange={handleChangeTitle} type="text" placeholder={data.title} id="title" />
                    </div>
                    <div className="formInput">
                        <label>Description</label>
                        <textarea cols={40} rows={10} onChange={handleChangeDescription} type="text" placeholder={data.desc} id="description" ></textarea>
                    </div>
                    <div className="formInput">
                        <label>Price</label>
                        <input onChange={handleChangePrice} type="text" placeholder={data.cheapestPrice} id="price" />
                    </div>
                    <button onClick={handleClick}>Update</button>
                    </form>
                </div>
                </div>
            </div>
        </div>
            
    )
}

export default UpdateHotel;
