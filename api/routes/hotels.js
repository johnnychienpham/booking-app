import express from 'express'
import { countByCity, countByType, createHotel, deleteHotel, getHotel, getHotelRooms, getHotels, getLatestHotels, updateHotel } from '../controllers/hotel.js';
import Hotel from '../models/Hotel.js';
import { createError } from '../utils/error.js';
import {verifyAdmin} from '../utils/verifyToken.js'
const router = express.Router();

// CREATE
router.post("/", verifyAdmin, createHotel);

//UPDATE
router.put("/:id", verifyAdmin, updateHotel);

// DELETE
router.delete("/:id",verifyAdmin, deleteHotel);

//GET
router.get("/find/:id",getHotel); // ai cũng có thể xem hotel
//GET LATEST USERS

router.get("/latestHotels",verifyAdmin,getLatestHotels)

//GET ALL
router.get("/", getHotels); // ai cũng có thể xem all hotels
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id",getHotelRooms)

export default router