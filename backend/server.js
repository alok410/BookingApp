const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

const authRoutes = require("./routes/auth.route");
const bookingRoutes = require("./routes/booking.route");
const { sequelize } = require("./models");

// Enable CORS - You can move origin to .env if needed
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true,
}));

app.use(express.json());


app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);


app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running 🚀" });
});


const PORT = process.env.PORT || 5000;

sequelize.sync()
  .then(() => {
    console.log("✅ Database synced successfully.");
    app.listen(PORT, () => console.log(`🚀 Server started on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Error syncing database:", err);
    process.exit(1);
  });
