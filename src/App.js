import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register"; // ✅ ADD THIS
import Appointments from "./pages/Appointments";
import BookAppointment from "./pages/BookAppointment";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Router>
      <Routes>

        {/* Default route */}
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/login" />}
        />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* ✅ THIS FIXES IT */}

        {/* Protected routes */}
        <Route
          path="/appointments"
          element={user ? <Appointments /> : <Navigate to="/login" />}
        />

        <Route
          path="/book/:id/:dept"
          element={user ? <BookAppointment /> : <Navigate to="/login" />}
        />

      </Routes>
    </Router>
  );
}

export default App;