const { Booking } = require('../models');
const moment = require('moment');
const { Op } = require('sequelize');

const createBooking = async (req, res) => {
  const {
    customerName,
    customerEmail,
    bookingDate,
    bookingType,
    bookingSlot,
    fromTime,
    toTime,
    userId,
  } = req.body;

  if (!customerName || !customerEmail || !bookingDate || !bookingType || !userId) {
    return res.status(400).json({ message: 'Please fill all required fields.' });
  }

  try {
    const formattedBookingDate = moment(bookingDate).startOf('day').format('YYYY-MM-DD');

    const queryOptions = {
      where: { bookingDate: formattedBookingDate },
    };

    if (bookingType === 'Full Day') {
      queryOptions.where.bookingType = 'Full Day';
      const fullDayBooking = await Booking.findOne(queryOptions);
      if (fullDayBooking) {
        return res.status(400).json({ message: 'Full Day booking already exists for this date.' });
      }

    } else if (bookingType === 'Half Day') {
      if (!bookingSlot) {
        return res.status(400).json({ message: 'Please select a slot for Half Day booking.' });
      }

      queryOptions.where.bookingType = 'Half Day';
      queryOptions.where.bookingSlot = bookingSlot;

      const halfDayBooking = await Booking.findOne(queryOptions);
      if (halfDayBooking) {
        return res.status(400).json({ message: `Booking Slot ${bookingSlot} is already taken for this date.` });
      }

      const customBookingOverlap = await Booking.findOne({
        where: {
          bookingDate: formattedBookingDate,
          [Op.or]: [
            { bookingType: 'Full Day' },
            {
              bookingType: 'Custom',
              fromTime: { [Op.lte]: toTime },
              toTime: { [Op.gte]: fromTime },
            },
          ],
        },
      });

      if (customBookingOverlap) {
        return res.status(400).json({ message: 'Booking overlap detected. Cannot book during this slot.' });
      }

    } else if (bookingType === 'Custom') {
      if (!fromTime || !toTime) {
        return res.status(400).json({ message: 'Please provide both From Time and To Time for Custom booking.' });
      }

      const overlap = await Booking.findOne({
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

      if (overlap) {
        return res.status(400).json({ message: 'Custom booking time overlaps with an existing booking.' });
      }
    }

    const newBooking = await Booking.create({
      customerName,
      customerEmail,
      bookingDate: formattedBookingDate,
      bookingType,
      bookingSlot: bookingType === 'Half Day' ? bookingSlot : null,
      fromTime: bookingType === 'Custom' ? fromTime : null,
      toTime: bookingType === 'Custom' ? toTime : null,
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
    const userId = req.params.userId;  
    console.log("hoti")
    if (!userId) {
      return res.status(400).json({ message: 'Missing userId in URL params.' });
    }
  
    try {
      const bookings = await Booking.findAll({ where: { userId } });
      res.status(200).json(bookings);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'An error occurred while fetching bookings.' });
    }
  };
  
module.exports = { createBooking, getBookingsByUser };
