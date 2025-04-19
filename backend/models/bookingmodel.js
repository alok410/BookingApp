const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Booking = sequelize.define('Booking', {
  customerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  customerEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  bookingDate: {
    type: DataTypes.DATEONLY, // Only date, no time part
    allowNull: false,
  },
  bookingType: {
    type: DataTypes.ENUM('Full Day', 'Half Day', 'Custom'),
    allowNull: false,
  },
  bookingSlot: {
    type: DataTypes.ENUM('First Half', 'Second Half'),
    allowNull: true,
    // Only valid if bookingType is 'Half Day'
  },
  fromTime: {
    type: DataTypes.TIME,
    allowNull: true,
    // Only valid if bookingType is 'Custom'
  },
  toTime: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false, // Assume this links to the User who created the booking
  },
}, {
  indexes: [
    {
      name: 'booking_date_index',
      fields: ['bookingDate'], // Index for faster overlap lookup
    },
    {
      name: 'user_id_index',
      fields: ['userId'], // Helpful if filtering bookings by user
    },
  ],
});

module.exports = Booking;
