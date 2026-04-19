const express = require("express");
const router = express.Router();

const {
  createAppointment,
  getAppointments,
} = require("../controllers/appointmentcontroller");

router.post("/", createAppointment);
router.get("/", getAppointments);

module.exports = router;

const { deleteAppointment } = require("../controllers/appointmentcontroller");
router.delete("/:id", deleteAppointment);