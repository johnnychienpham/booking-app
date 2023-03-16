import { useState } from "react";
import { Link } from "react-router-dom";
import "./searchItem.css";

const SearchItem = ({item}) => {
  // const [isMoreThan100,setIsMoreThan100]= useState(false)
  // if(item.cheapestPrice>100){
  //   setIsMoreThan100(true)
  // }else(
  //   setIsMoreThan100(false)
  // )
  // console.log(item.cheapestPrice)

  return (
    <div className="searchItem">
      <img
        src={item.photos[0]}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}m from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          {item.title}
        </span>
        <span className="siFeatures">
          {item.desc}
        </span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item.rating &&<div className="siRating">
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>}
        <div className="siDetailTexts">
          {/* <span className="siPrice">${item.cheapestPrice}</span> */}
          {(item.cheapestPrice>100)?(<span className="siPriceMoreThan100">${item.cheapestPrice}</span>):(<span className="siPrice">${item.cheapestPrice}</span>)}
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
            <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
