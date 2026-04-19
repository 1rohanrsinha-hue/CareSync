const Doctor = require("../models/doctors");

const getDoctors = async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
};

const addDoctor = async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      const doctors = await Doctor.insertMany(req.body);
      res.json(doctors);
    } else {
      const doctor = new Doctor(req.body);
      const saved = await doctor.save();
      res.json(saved);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getDoctors, addDoctor };