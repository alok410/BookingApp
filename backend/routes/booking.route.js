const express = require('express');
const { createBooking, getBookingsByUser } = require('../controllers/booking.controller');
const router = express.Router();

// POST - Create booking
router.post('/createBooking', createBooking);

// GET - Get all bookings for a user (using query param ?userId=...)
router.get('/getBookingsByUser', getBookingsByUser);

module.exports = router;
