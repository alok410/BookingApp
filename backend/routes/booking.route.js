const express = require('express');
const { createBooking, getBookingsByUser } = require('../controllers/booking.controller');
const router = express.Router();

router.post('/createBooking', createBooking);

router.get('/:userId', getBookingsByUser);

module.exports = router;
