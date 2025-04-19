// models/index.js
const User = require('./usermodel');
const Booking = require('./bookingmodel');
const sequelize = require('../config/db'); 

User.hasMany(Booking, { foreignKey: 'userId' });
Booking.belongsTo(User, { foreignKey: 'userId' });

module.exports = { User, Booking, sequelize };
