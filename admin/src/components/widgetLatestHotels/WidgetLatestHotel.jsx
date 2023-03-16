import { useEffect, useState } from "react";
import "./widgetLatestHotel.css";
import {format} from "timeago.js"
import useFetch from "../../hooks/useFetch";

function WidgetLatestHotel() {
  const [latestHotels, setLatestHotels] = useState([]);
    const {data,loading,error} = useFetch("hotels/latestHotels")
  useEffect(() => {
    const getLatestHotels = async () => {
      try {
        // const res = await userRequest.get("orders");
        setLatestHotels(data);
      } catch {}
    };
    getLatestHotels();
  }, [data]);
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest Created Hotels</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Hotel ID</th>
          <th className="widgetLgTh">Name</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">City</th>
          <th className="widgetLgTh">Type</th>
        </tr>
        {latestHotels.map((hotel) => (
          <tr className="widgetLgTr" key={hotel._id}>
            <td className="widgetLgUser">
              <span className="widgetLgId">{hotel._id}</span>
            </td>
            <td className="widgetLgName">{hotel.name}</td>
            <td className="widgetLgDate">{format(hotel.createdAt)}</td>
            <td className="widgetLgAmount">{hotel.city}</td>
            <td className="widgetLgStatus">
              <Button type={hotel.type} />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default WidgetLatestHotel