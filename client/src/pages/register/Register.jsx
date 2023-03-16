import React, { useEffect, useState } from 'react'
import "./register.css"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {useForm} from "react-hook-form"
import validation from './validation'

function Register() {
    
    // const [info,setInfo]= useState({})
    const navigate = useNavigate()
    // const handleChange = e =>{      
    //     setInfo(prev=> ({...prev,[e.target.id]:e.target.value}))
    // }
    // // console.log(info)
    // const handleClick = async e =>{
    //     e.preventDefault()
    //     try {
    //     //   const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/duvhvl5pq/image/upload",data)
    //     //   const {url}= uploadRes.data
    
    //       const newUser = {
    //         ...info,
    //       }
    //       await axios.post("/auth/register",newUser)
    //       navigate("/login")
    //     } catch (err) {
    //       console.log(err)
    //     }
    //   }

    const[values,setValues]= useState({
      username:"",
      email:"",
      password:"",
      country:"",
      city:"",
      phone:""
    })

    const [errors,setErrors] = useState({})
    const [dataIsCorrect,setDataIsCorrect]= useState(false)
    const handleChange=(event)=>{
      setValues({
        ...values,
        [event.target.name]:event.target.value
      })
    }

    const handleFormSubmit= async (event)=>{
      event.preventDefault()
      setErrors(validation(values))
      if(Object.keys(errors).length===0){
        setDataIsCorrect(true)
      }else{
        setDataIsCorrect(false)
      }

      try{
        const newUser = {
            ...values
        }
        await axios.post("/auth/register",newUser)
        navigate("/login")
      }catch(err){
        console.log(err)
      }
    }

    return (
      <div className='container-register'>
        <div className='wrapper-register'>
          <h1 className='title-register'>CREATE AN ACCOUNT</h1>
          <form className='form-register'>
            <label>Username<text class="error">*</text></label>
            <input onChange={handleChange} id="username" className='registerInput' placeholder="john_doe" name="username" value={values.username}  />
            {errors.username && <p className='error'>{errors.username}</p>}
            
            <label>Email<text class="error">*</text></label>
            <input onChange={handleChange} type="email" id="email" className='registerInput' placeholder="john_doe@gmail.com" name="email" value={values.email} />
            {errors.email && <p className='error'>{errors.email}</p>}
            
            <label>Password<text class="error">*</text></label>
            <input type="password" onChange={handleChange} id="password" className='registerInput' placeholder="*******" name="password" value={values.password}/>
            {errors.password && <p className='error'>{errors.password}</p>}
            {/* <input onChange={handleChange} className='registerInput' placeholder="confirm password" /> */}
            <label>Country<text class="error">*</text></label>
            <input onChange={handleChange} id="country" className='registerInput' placeholder="Germany" name="country" value={values.country}  />
            {errors.country && <p className='error'>{errors.country}</p>}

            <label>City<text class="error">*</text></label>
            <input onChange={handleChange} id="city" className='registerInput' placeholder="Berlin" name="city" value={values.city}/>
            {errors.city && <p className='error'>{errors.city}</p>}

            <label>Phone<text class="error">*</text></label>
            <input onChange={handleChange} id="phone" className='registerInput' placeholder="+3722938930" name="phone" value={values.phone}  />
            {errors.city && <p className='error'>{errors.phone}</p>}
            <span className='register-agreement'>
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
            </span>
            <button onClick={handleFormSubmit} className='register-button'>CREATE</button>
          </form>
        </div>
      </div>
)
}

      

//   return (
//         <div className='container-register'>
//           <div className='wrapper-register'>
//             <h1 className='title-register'>CREATE AN ACCOUNT</h1>
//             <form className='form-register'>
//               <label>Username</label>
//               <input onChange={handleChange} id="username" className='registerInput' placeholder="john_doe" name="username"  />
              
//               <label>Email</label>
//               <input onChange={handleChange} type="email" id="email" className='registerInput' placeholder="john_doe@gmail.com" name="email" />
//               <label>Password</label>
//               <input type="password" onChange={handleChange} id="password" className='registerInput' placeholder="*******" name="password" />
//               {/* <input onChange={handleChange} className='registerInput' placeholder="confirm password" /> */}
//               <label>Country</label>
//               <input onChange={handleChange} id="country" className='registerInput' placeholder="Germany" name="country"  />
//               <label>City</label>
//               <input onChange={handleChange} id="city" className='registerInput' placeholder="Berlin" name="city"/>
//               <label>Phone</label>
//               <input onChange={handleChange} id="phone" className='registerInput' placeholder="+3722938930" name="phone"  />
//               <span className='register-agreement'>
//                 By creating an account, I consent to the processing of my personal
//                 data in accordance with the <b>PRIVACY POLICY</b>
//               </span>
//               <button onClick={handleClick} className='register-button'>CREATE</button>
//             </form>
//           </div>
//         </div>
//   )
// }

export default Register