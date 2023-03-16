const validation = (info) => {
    
    let errors={}
    if(!info.title){
        errors.title="Title is required."
    }
    if(!info.price){
        errors.price="Price is required."
    }
    if(!info.maxPeople){
        errors.city="City is required"
    }
    if(!info.desc){
        errors.desc="Description is required."
    }
  return errors;
}

export default validation