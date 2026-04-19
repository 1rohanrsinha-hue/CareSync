import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:10000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid credentials");
        return;
      }

      //  Store user
      localStorage.setItem("user", JSON.stringify(data));

      // Redirect
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
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
        <h2 className="text-center mb-4">CareSync Login</h2>

        {error && (
          <div className="alert alert-danger py-2">{error}</div>
        )}

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
          onClick={handleLogin}
        >
          Login
        </button>

        {/* SIGN UP LINK */}
        <div className="text-center mt-3">
          <small>
            Don’t have an account?{" "}
            <span
              style={{ color: "#0d6efd", cursor: "pointer", fontWeight: "500" }}
              onClick={() => navigate("/register")}
            >
              Sign Up
            </span>
          </small>
        </div>
      </div>
    </div>
  );
}

export default Login;