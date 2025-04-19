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
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  bookingType: {
    type: DataTypes.ENUM('Full Day', 'Half Day', 'Custom'),
    allowNull: false,
  },
  bookingSlot: {
    type: DataTypes.ENUM('First Half', 'Second Half'),
    allowNull: true,
  },
  fromTime: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  toTime: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false, 
  },
}, {
  indexes: [
    {
      name: 'booking_date_index',
      fields: ['bookingDate'],
    },
    {
      name: 'user_id_index',
      fields: ['userId'], 
    },
  ],
});

module.exports = Booking;
