// server.js (or index.js)
const express = require("express");
const app = express();
require("dotenv").config();
const authRoutes = require("./routes/auth.route");
const bookingRoutes = require("./routes/booking.route");


const { sequelize } = require("./models"); 
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/bookings",bookingRoutes)

sequelize.sync()
  .then(() => {
    console.log("Database synced successfully.");
    app.listen(5000, () => console.log("Server started on http://localhost:5000"));
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
    process.exit(1); 
  });
