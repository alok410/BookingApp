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
  },
  bookingDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  bookingType: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['Full Day', 'Half Day', 'Custom']],
    },
  },
  bookingSlot: {
    type: DataTypes.STRING,
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
});


module.exports = Booking;
