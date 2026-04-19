import React from "react";
import { useNavigate } from "react-router-dom";

function DoctorCard({ doctor }) {
  const navigate = useNavigate();

  const defaultIcon =
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png";

  const handleBooking = () => {
    navigate(`/book/${doctor._id}/${doctor.department}`);
  };

  return (
    <div className="col-md-4 mb-4">
      <div
        className="card shadow-sm h-100 d-flex flex-column text-center p-3"
        style={{
          backgroundColor: "#F7E4D3",
          border: "none",
          borderRadius: "12px"
        }}
      >
        <img
          src={defaultIcon}
          alt="doctor"
          className="rounded-circle mx-auto"
          width="100"
        />

        <h5 className="mt-3">{doctor.name}</h5>

        {/* FIXED */}
        <p className="fw-semibold">{doctor.department}</p>

        {/* OPTIONAL improvement */}
        <p className="small text-muted">
          Specialist in {doctor.specialization || doctor.department}
        </p>

        <div className="mt-auto">
          <button
            className="btn btn-outline-primary mt-3 w-100"
            onClick={handleBooking}
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}

export default DoctorCard;