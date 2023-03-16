import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import validation from "./validation";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info,setInfo]= useState({})
  const navigate = useNavigate()

  //Show error trước khi nộp form
  const [errors,setErrors] = useState({})
  const [dataIsCorrect,setDataIsCorrect]= useState(false)
  //

  const handleChange=e=>{
    setInfo(prev=> ({...prev,[e.target.id]:e.target.value}))
  }

  // const handleClick = async e =>{
  //   e.preventDefault()
  //   const data = new FormData()
  //   data.append("file",file)
  //   data.append("upload_preset","upload")
  //   try {
  //     const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/duvhvl5pq/image/upload",data)
  //     const {url}= uploadRes.data

  //     const newUser = {
  //       ...info,
  //       img:url
  //     }
  //     await axios.post("/auth/register",newUser)
  //     navigate("/users")
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  const handleClick = async e =>{
    e.preventDefault()
    const data = new FormData()
    data.append("file",file)
    data.append("upload_preset","upload")
    //Show error
    setErrors(validation(info))
    if(Object.keys(errors).length===0){
      setDataIsCorrect(true)
    }else{
      setDataIsCorrect(false)
    }
    //
    try {
      const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/duvhvl5pq/image/upload",data)
      const {url}= uploadRes.data

      const newUser = {
        ...info,
        img:url
      }
      await axios.post("/auth/register",newUser)
      navigate("/users")
    } catch (err) {
      console.log(err)
    }
  }
  // console.log(info)
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
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input onChange={handleChange} type={input.type} placeholder={input.placeholder} id={input.id} />
                  {errors[input.id] && <p style={{color:"red", fontSize:"12px"}} className='error'>{errors[input.id]}</p>}
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
