
const validation = (info) => {
    
    let errors={}
    if(!info.name){
        errors.name="Name is required."
    }
    if(!info.type){
        errors.type="Type is required."
    }
    if(!info.city){
        errors.city="City is required"
    }
    if(!info.address){
        errors.address="Address is required."
    }
    if(!info.distance){
        errors.distance="Distance is required."
    }
    if(!info.title){
        errors.title="Title is required."
    }
    if(!info.desc){
        errors.desc="Description is required."
    }
    if(!info.cheapestPrice){
        errors.cheapestPrice="Price is required."
    }
  return errors;
}

export default validation