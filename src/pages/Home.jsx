import React, { useEffect, useState } from "react";
import DoctorCard from "../components/DoctorCard";
import Navbar from "../components/Navbar";

function Home() {
  const [doctors, setDoctors] = useState([]);

  // Fetch doctors from backend
  useEffect(() => {
    fetch("http://localhost:10000/api/doctors")
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA FROM BACKEND:", data);
        setDoctors(data);
      })
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <>
      <div
        style={{
          backgroundColor: "#FDF1E6",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {/*  Navbar added */}
        <Navbar />

        {/* Main Content */}
        <div className="container py-5" style={{ flex: 1 }}>

          {/* Heading */}
          <div className="text-center mb-5">
            <h1 className="display-3 fw-bold text-primary">
              CareSync
            </h1>
            <p className="lead text-muted">
              Smart Healthcare. Seamless Appointments. Trusted Specialists.
            </p>
          </div>

          <h3 className="text-center mb-4">Our Specialists</h3>

          <div className="row">
            {doctors.length > 0 ? (
              doctors.map((doc) => (
                <DoctorCard key={doc._id} doctor={doc} />
              ))
            ) : (
              <p className="text-center">No doctors available</p>
            )}
          </div>
        </div>

        {/* Animation Bar */}
        <div className="bg-primary text-white py-2 overflow-hidden">
          <div className="bottom-animation">
            Healing with Heart and Innovation
          </div>
        </div>

        <style>
          {`
            .bottom-animation {
              display: inline-block;
              white-space: nowrap;
              font-size: 1rem;
              font-weight: 600;
              padding-left: 100%;
              animation: scrollBottom 12s linear infinite;
            }

            @keyframes scrollBottom {
              0% { transform: translateX(0); }
              100% { transform: translateX(-100%); }
            }
          `}
        </style>

        {/* Footer (sticky style) */}
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
    </>
  );
}

export default Home;