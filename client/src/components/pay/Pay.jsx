import React, { useState,useEffect } from 'react'
import StripeCheckout from "react-stripe-checkout"
import axios from "axios"
import { userRequest } from '../../requestMethods'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
const KEY = "pk_test_51LRZ2tCdYc1S5g9OSRXAmnJUhsjXwaxRexIwgejLjEdNnQyUyRBZlF4iosWSlkantfSsEhrYdrMLdMMBwOmMWqBm00Ou2HX6R6"

const Pay = () => {
    //thêm vào
    const location = useLocation();
    // console.log(location.state)
    const totalPrice= location.state

    //
    const navigate= useNavigate()
    const [stripeToken, setStripeToken]= useState(null)
    const onToken=(token)=>{
        // console.log(token)
        setStripeToken(token)
    }
    useEffect(()=>{
        const makeRequest= async()=>{
            try{
                const res= await userRequest.post("/checkout/payment",{
                    tokenId:stripeToken.id,
                    // amount:2000,
                    amount:totalPrice * 100,

                })
                console.log(res.data)
                navigate("/success",{state:res.data})
            }catch(err){
                console.log(err)
            }
        }
        stripeToken && makeRequest()
    },[stripeToken]) // khi stripeToken thay đổi thì make backend server request
  return (
    <div style={{height:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <StripeCheckout 
            name="BiBooking" 
            image="https://play-lh.googleusercontent.com/OSr8skhGVmspz4WJQgjGcaFy1OkIJrd_Afr_X6a9Z4tAAtq4bDdOmxlCbSznf0UFxnai"
            billingAddress
            shippingAddress
            // description='Your total is $200'
            description={`Your total is $${totalPrice}`}
            amount={totalPrice*100}
            token={onToken}
            stripeKey={KEY}
        >{/* vì stripe tính theo cent nên 20$ thành 2000 cent */}
            <button style={{border:"none", width:120, borderRadius:5, padding:"20px",backgroundColor:"#0071c2",color:"white",fontWeight:"600",cursor:"pointer"}}>
                Pay now
            </button>
        </StripeCheckout>
    </div>
  )
}

export default Pay