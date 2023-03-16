import "./listRoom.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Datatable from "../../components/datatable/Datatable"
import DatatableRoom from "../../components/datatableRoom/DatatableRoom"

const ListRoom = ({columns}) => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        {/* <Navbar/> */}
        <DatatableRoom columns={columns}/>
      </div>
    </div>
  )
}

export default ListRoom