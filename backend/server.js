const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db"); // ✅ IMPORTANT

const app = express();

// Connect to MongoDB
connectDB(); // ✅ IMPORTANT

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const doctorRoutes = require("./routes/doctorroutes");
app.use("/api/doctors", doctorRoutes);

const appointmentRoutes = require("./routes/appointmentroutes");
app.use("/api/appointments", appointmentRoutes);

const authRoutes = require("./routes/authroutes");
app.use("/api/auth", authRoutes);