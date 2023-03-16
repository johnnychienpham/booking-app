import "./singleRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { Link , useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Datatable from "../../components/datatable/Datatable";

const SingleRoom = () => {
  const location= useLocation()
  const path = location.pathname.split("/")[1]
  const id = location.pathname.split("/")[2]
  const {data,loading,error,reFetch}= useFetch(`/${path}/${id}`)
  
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        {/* <Navbar /> */}
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              {/* <img
                // src={data.img? data.img: "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
                src={data.img|| "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
                alt=""
                className="itemImg"
              /> */}
              <div className="details">
                <h1 className="itemTitle">{data.title}</h1>
                <div className="detailItem">
                  <span className="itemKey">Max People:</span>
                  <span className="itemValue">{data.maxPeople}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">{data.desc}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Price:</span>
                  <span className="itemValue">{data.price}</span>
                </div>

              </div>
            </div>
          </div>
          {/* <div className="right">
            <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
          </div> */}
        </div>
        {/* <div className="bottom">
        <h1 className="title">Last Transactions</h1>
          <List/>
        </div> */}
      </div>
    </div>
  );
};

export default SingleRoom;
