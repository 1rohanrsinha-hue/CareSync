const Appointment = require("../models/appointment");

// CREATE APPOINTMENT
const createAppointment = async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    const saved = await appointment.save();
    res.json(saved);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET APPOINTMENTS (FILTERED BASED ON USER)
const getAppointments = async (req, res) => {
  try {
    const { userId } = req.query;

    const appointments = await Appointment.find({ userId });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE APPOINTMENT
const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Appointment.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//EXPORT ALL FUNCTIONS
module.exports = {
  createAppointment,
  getAppointments,
  deleteAppointment,
};