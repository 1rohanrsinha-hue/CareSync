import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function BookAppointment() {
  const { id, dept } = useParams();
  const navigate = useNavigate();

  const [showSuccess, setShowSuccess] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedDate = e.target.appointmentDate.value;
    const selectedTime = e.target.appointmentTime.value;
    const patientName = e.target[0].value;

    //  Get logged in user
    const user = JSON.parse(localStorage.getItem("user"));

    //  If not logged in → redirect
    if (!user) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    //  Validation
    if (selectedDate < today) {
      alert("Please select a valid date (today or future).");
      return;
    }

    if (selectedTime < "09:00" || selectedTime > "18:00") {
      alert("Please select a time between 9:00 AM and 6:00 PM.");
      return;
    }

    const data = {
      doctorId: id,
      doctorName: dept,
      patientName,
      date: selectedDate,
      time: selectedTime,
      userId: user._id, 
    };

    try {
      const res = await fetch("http://localhost:10000/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log("Saved:", result);

      setShowSuccess(true);
    } catch (error) {
      console.error("Error saving appointment:", error);
      alert("Failed to book appointment");
    }
  };

  const closeModal = () => {
    setShowSuccess(false);
    navigate("/appointments"); 
  };

  return (
    <>
      <div style={{ backgroundColor: "#FDF1E6", minHeight: "100vh" }}>
        <Navbar />

        <div className="container mt-5 mb-5">

          {/* Doctor Details */}
          <div
            className="card shadow p-4 mb-4"
            style={{
              backgroundColor: "#F7E4D3",
              border: "none",
              borderRadius: "12px"
            }}
          >
            <h4 className="mb-3">Doctor Details</h4>
            <p><strong>Doctor ID:</strong> {id}</p>
            <p><strong>Department:</strong> {dept}</p>
          </div>

          {/* Appointment Form */}
          <form
            className="card shadow p-4"
            style={{
              backgroundColor: "#F7E4D3",
              border: "none",
              borderRadius: "12px"
            }}
            onSubmit={handleSubmit}
          >
            <h5 className="mb-4">Patient Information</h5>

            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-control" required />
            </div>

            <div className="mb-3">
              <label className="form-label">Age</label>
              <input type="number" className="form-control" required />
            </div>

            <div className="mb-3">
              <label className="form-label">Gender</label>
              <select className="form-select" required>
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Appointment Date</label>
              <input
                type="date"
                name="appointmentDate"
                className="form-control"
                min={today}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Preferred Time</label>
              <input
                type="time"
                name="appointmentTime"
                className="form-control"
                min="09:00"
                max="18:00"
                required
              />
              <small className="text-muted">
                Available between 9:00 AM and 6:00 PM
              </small>
            </div>

            <button className="btn btn-primary w-100 mt-3">
              Submit Appointment
            </button>
          </form>
        </div>

        {/* Success Modal */}
        {showSuccess && (
          <div
            className="modal show d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header bg-success text-white">
                  <h5 className="modal-title">Appointment Confirmed</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                  ></button>
                </div>

                <div className="modal-body">
                  <p>
                    Your appointment with <strong>{dept}</strong> has been successfully scheduled.
                  </p>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-success"
                    onClick={closeModal}
                  >
                    View Appointments
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default BookAppointment;