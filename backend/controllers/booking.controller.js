const { Booking } = require('../models');
const moment = require('moment');
const { Op } = require('sequelize');

// Create a new booking
const createBooking = async (req, res) => {
  const { customerName, customerEmail, bookingDate, bookingType, bookingSlot, fromTime, toTime, userId } = req.body;

  // Validate required fields
  if (!customerName || !customerEmail || !bookingDate || !bookingType || !userId) {
    return res.status(400).json({ message: 'Please fill all required fields.' });
  }

  try {
    const bookingDateMoment = moment(bookingDate).startOf('day');
    const formattedBookingDate = bookingDateMoment.format('YYYY-MM-DD');

    // General query options to avoid repeating code
    const queryOptions = {
      where: { bookingDate: formattedBookingDate },
    };

    // Check for conflicts based on booking type
    if (bookingType === 'Full Day') {
      queryOptions.where.bookingType = 'Full Day';
      const fullDayBooking = await Booking.findOne(queryOptions);
      if (fullDayBooking) {
        return res.status(400).json({ message: 'Full Day booking already exists for this date.' });
      }
    } else if (bookingType === 'Half Day') {
      // Check for Half Day conflict in the selected slot
      queryOptions.where.bookingType = 'Half Day';
      queryOptions.where.bookingSlot = bookingSlot;
      const halfDayBooking = await Booking.findOne(queryOptions);
      if (halfDayBooking) {
        return res.status(400).json({ message: `Booking Slot ${bookingSlot} is already taken for this date.` });
      }

      // Check for Full Day or Custom overlap with Half Day booking slots
      const customBookingOverlap = await Booking.findOne({
        where: {
          bookingDate: formattedBookingDate,
          [Op.or]: [
            { bookingType: 'Full Day' },
            {
              bookingType: 'Custom',
              fromTime: { [Op.lte]: toTime }, // Overlap check for fromTime
              toTime: { [Op.gte]: fromTime }, // Overlap check for toTime
            },
          ],
        },
      });
      if (customBookingOverlap) {
        return res.status(400).json({ message: 'Booking overlap detected. Cannot book Full Day or Custom during the selected time slot.' });
      }
    } else if (bookingType === 'Custom') {
      // Check for Custom booking time overlap
      const timeOverlapBooking = await Booking.findOne({
        where: {
          bookingDate: formattedBookingDate,
          bookingType: 'Custom',
          [Op.or]: [
            {
              fromTime: { [Op.lte]: toTime },
              toTime: { [Op.gte]: fromTime },
            },
          ],
        },
      });

      if (timeOverlapBooking) {
        return res.status(400).json({ message: 'Custom booking time overlaps with an existing booking.' });
      }
    }

    // Create new booking if no conflict
    const newBooking = await Booking.create({
      customerName,
      customerEmail,
      bookingDate: formattedBookingDate,
      bookingType,
      bookingSlot: bookingType === 'Half Day' ? bookingSlot : null, // Half Day should have a slot
      fromTime: bookingType === 'Custom' ? fromTime : null, // Custom should have fromTime
      toTime: bookingType === 'Custom' ? toTime : null, // Custom should have toTime
      userId,
    });

    res.status(201).json({
      message: 'Booking created successfully!',
      booking: newBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while creating the booking.' });
  }
};

const getBookingsByUser = async (req, res) => {
  const userId = req.user.id; 

  try {
    const bookings = await Booking.findAll({ where: { userId } });
    res.status(200).json(bookings);yield
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching bookings.' });
  }
};

module.exports = { createBooking, getBookingsByUser };
