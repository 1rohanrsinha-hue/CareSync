import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:10000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      alert("Account created successfully! Please login.");

      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Server error. Try again.");
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#FDF1E6",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="card shadow p-4"
        style={{
          width: "350px",
          backgroundColor: "#F7E4D3",
          border: "none",
          borderRadius: "12px",
        }}
      >
        <h2 className="text-center mb-4">Create Account</h2>

        {error && (
          <div className="alert alert-danger py-2">{error}</div>
        )}

        <input
          className="form-control mb-3"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="btn btn-primary w-100"
          onClick={handleRegister}
        >
          Sign Up
        </button>

        {/* Back to Login */}
        <div className="text-center mt-3">
          <small>
            Already have an account?{" "}
            <span
              style={{ color: "#0d6efd", cursor: "pointer", fontWeight: "500" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </small>
        </div>
      </div>
    </div>
  );
}

export default Register;