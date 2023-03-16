import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetch from "../../hooks/useFetch";
import "./featuredProperties.css";

const FeaturedProperties = () => {

  const {data,loading,error} = useFetch("/hotels?featured=true&limit=4")

  return (
    <div className="fp">
      {loading ? "Loading" : <>
        {data.map((item) =>(

          <div className="fpItem" key={item._id}>
            <img
              src={item.photos[0]}
              alt=""
              className="fpImg"
            />
            <span className="fpName">{item.name}</span>
            <span className="fpCity">{item.city}</span>
            <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
            {item.likes.length>=1 &&<div className="fpRating">
              <button>{item.likes.length} <FontAwesomeIcon style={{color:"#e8a2b9"}} icon={faHeart}></FontAwesomeIcon></button>
              <span>for this place</span>
            </div>}
          </div>
        ))}
      </>}
      
    </div>
  );
};

export default FeaturedProperties;
