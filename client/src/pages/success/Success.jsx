import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const Success = () => {
    const location = useLocation();
    var orderId= location.state.id

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#003580"
      }}
    >
    
        <h1 style={{color:'white'}}>Successfull</h1>
        <p style={{color:'white'}}>Your reservation has been created successfully.</p> 
        <p style={{color:'white'}}>If you have any problem, please contact us.</p>
      <Link to="/"><button style={{ padding: 10, marginTop: 20, backgroundColor:"#0071c2",color:"white", border:"none", borderRadius:"5px" }}>Go to Homepage</button></Link>
    </div>
  )
}

export default Success