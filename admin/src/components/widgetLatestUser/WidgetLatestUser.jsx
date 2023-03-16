import "./widgetLatestUser.css";
// import { Visibility } from "@material-ui/icons";
import React,{ useEffect, useState } from "react";
// import { userRequest } from "../../requestMethods";
import useFetch from "../../hooks/useFetch";
// import { Link,useLocation } from "@mui/material";
import { Link , useLocation } from "react-router-dom";
import {format} from "timeago.js"

function WidgetLatestUser() {
    const [users, setUsers] = useState([])
    const{data,loading,error} = useFetch("users/latestUsers")
    // const location = useLocation()
    // const path = location.pathname.split("/")[1]
    
    useEffect(() => {
      const getUsers = async () => {
        try {
          
          setUsers(data);
        } catch {}
      };
      getUsers();
    }, [data]);
    
    return (
      <div className="widgetSm">
        <span className="widgetSmTitle">New Join Members</span>
        <ul className="widgetSmList">
          {users.map((user) => (
            <li className="widgetSmListItem" key={user._id}>
              <img
                src={
                  user.img ||
                  "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"
                }
                alt=""
                className="widgetSmImg"
              />
              <div className="widgetSmUser">
                <span className="widgetSmUsername">{user.username}</span>
                
              </div>
              <div className="widgetSmUser">
                
                <span className="widgetSmDate">{format(user.createdAt)}</span>
              </div>
              <Link to={`/users/${user._id}`} style={{ textDecoration: "none" }}><div className="widgetSmButton">
                {/* <Visibility className="widgetSmIcon" />  */}
                Display
              </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
}

export default WidgetLatestUser