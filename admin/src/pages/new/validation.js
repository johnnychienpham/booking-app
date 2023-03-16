import axios from "axios";


const validation = (info) => {
    
    let errors={}
    if(!info.username){
        errors.username="Name is required."
    }
    if(!info.email){
        errors.email="Email is required."
    }else if(!/\S+@\S+\.\S+/.test(info.email)){
        errors.email="Email is invalid."
    }
    if(!info.password){
        errors.password="Password is required"
    }else if(info.password.length<4){
        errors.password= "Password must be more than 4 characters."
    }
    if(!info.country){
        errors.country="Country is required."
    }
    if(!info.city){
        errors.city="City is required."
    }
    if(!info.phone){
        errors.phone="Phone is required."
    }
  return errors;
}

export default validation