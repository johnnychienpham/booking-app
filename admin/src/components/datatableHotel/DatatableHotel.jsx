import "./datatableHotel.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link , useLocation } from "react-router-dom";
import { useState } from "react";
import useFetch from "../../hooks/useFetch"
import { useEffect } from "react";
import axios from "axios";


const DatatableHotel = ({columns}) => {
  const location = useLocation()
  const path = location.pathname.split("/")[1]
  const[list,setList]=useState([])
  const {data,loading,error,reFetch}= useFetch(`/${path}`)
  
  

  useEffect(()=>{
    setList(data)
  },[data]) // khi data thay đổi, list sẽ thay đổi

  const handleDelete = async (id) => {
    try{
      await axios.delete(`/${path}/${id}`)
      setList(list.filter((item) => item._id !== id));
    }catch(err){

    }
    
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to={`/${path}/find/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div  className="viewButton">View</div>
            </Link>

            {/* UPDATE BUTTON */}
            <Link to={`/${path}/update/${params.row._id}`} style={{ textDecoration: "none" }}>
              <div  className="updateButton">Update</div>
            </Link>
            
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        // pageSize={9}
        // rowsPerPageOptions={[9]}
        pageSize={4}
        rowsPerPageOptions={[4]}
        // checkboxSelection
        getRowId={row=>row._id}
      />
    </div>
  );
};

export default DatatableHotel;
