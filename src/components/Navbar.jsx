import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container d-flex justify-content-between align-items-center">

        {/* Logo */}
        <Link
          to="/"
          className="navbar-brand fw-bold fs-4 text-white text-decoration-none"
        >
          CareSync
        </Link>

        {/* Buttons */}
        <div>
          <Link to="/" className="btn btn-outline-light me-2">
            Home
          </Link>

          <Link to="/appointments" className="btn btn-outline-light me-2">
            My Appointments
          </Link>

          <button
            className="btn btn-light text-primary fw-semibold"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;