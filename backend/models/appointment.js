const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctorId: String,
  doctorName: String,
  patientName: String,
  date: String,
  time: String,
  userId: String,
});

module.exports = mongoose.model("Appointment", appointmentSchema);