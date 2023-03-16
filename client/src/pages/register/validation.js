const validation = (values) => {
    let errors={}
    if(!values.username){
        errors.username="Name is required."
    }
    if(!values.email){
        errors.email="Email is required."
    }else if(!/\S+@\S+\.\S+/.test(values.email)){
        errors.email="Email is invalid."
    }
    if(!values.password){
        errors.password="Password is required"
    }else if(values.password.length<4){
        errors.password= "Password must be more than 4 characters."
    }
    if(!values.country){
        errors.country="Country is required."
    }
    if(!values.city){
        errors.city="City is required."
    }
    if(!values.phone){
        errors.phone="Phone is required."
    }
  return errors;
}

export default validation