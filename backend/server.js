// server.js (or index.js)
const express = require("express");
const app = express();
require("dotenv").config();
const authRoutes = require("./routes/auth.route");

// Import db models and sequelize instance
const { sequelize } = require("./models"); // Correctly importing sequelize from models

app.use(express.json());
app.use("/api/auth", authRoutes);

// Sync DB
sequelize.sync()
  .then(() => {
    console.log("Database synced successfully.");
    app.listen(5000, () => console.log("Server started on http://localhost:5000"));
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
    process.exit(1); // Exit the process if the sync fails
  });
