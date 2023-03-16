import express from 'express'
const router = express.Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY)
import Stripe from 'stripe';
const stripe = new Stripe("sk_test_51LRZ2tCdYc1S5g9OTjBhJVB0d18YewiY0HwR5mSHtuEjmjRWketXLs6eIOtvIjCtWGTO0o5nlxMrqlsHIrGKguab003YTs3jRx");

router.post("/payment",(req,res)=>{
    stripe.charges.create(
    {
        source:req.body.tokenId,
        amount: req.body.amount,
        currency:"usd"   
    },
    (stripeErr,stripeRes)=>{
        if(stripeErr){
            res.status(500).json(stripeErr)
        }else{
            res.status(200).json(stripeRes)
        }
    })
})


export default router