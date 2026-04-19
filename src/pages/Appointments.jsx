import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  useEffect(() => {
    //  Redirect if not logged in
    if (!userId) {
      navigate("/login");
      return;
    }

    fetch(`http://localhost:10000/api/appointments?userId=${userId}`)
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((err) => console.error(err));

  }, [userId, navigate]);

  //  DELETE FUNCTION
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Cancel this appointment?");

    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:10000/api/appointments/${id}`, {
        method: "DELETE",
      });

      // Update UI 
      setAppointments((prev) =>
        prev.filter((appt) => appt._id !== id)
      );

    } catch (err) {
      console.error(err);
      alert("Failed to delete appointment");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#FDF1E6",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Navbar />

      <div className="container mt-5 pb-5" style={{ flex: 1 }}>
        <h2 className="text-center mb-4">My Appointments</h2>

        {appointments.length === 0 ? (
          <p className="text-center">No appointments found</p>
        ) : (
          <div className="row">
            {appointments.map((appt) => (
              <div key={appt._id} className="col-md-4 mb-3">
                <div
                  className="card shadow-sm p-3 position-relative"
                  style={{
                    backgroundColor: "#F7E4D3",
                    border: "none",
                    borderRadius: "12px"
                  }}
                >
                  {/* DELETE BUTTON */}
                  <button
                    onClick={() => handleDelete(appt._id)}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      border: "none",
                      background: "transparent",
                      fontSize: "18px",
                      cursor: "pointer",
                      color: "red"
                    }}
                  >
                    ❌
                  </button>

                  <h5>{appt.patientName}</h5>
                  <p><strong>Doctor:</strong> {appt.doctorName}</p>
                  <p><strong>Date:</strong> {appt.date}</p>
                  <p><strong>Time:</strong> {appt.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer className="bg-dark text-white py-4 mt-auto">
        <div className="container text-center">
          <h5>CareSync Healthcare Platform</h5>
          <p className="small mb-1">
            Providing accessible and organized healthcare solutions
            through modern web technologies.
          </p>
          <p className="small mb-0">
            Contact: support@caresync.com | +91 98765 43210
          </p>
          <p className="small mt-2 mb-0">
            © 2026 CareSync. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Appointments;