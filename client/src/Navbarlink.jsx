import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/dashboard/Dashboard";
import Notfound from "./Notfound";

function Navbarlink() {
  const isUserSignedIn = !!localStorage.getItem("token");

  return (
    <Routes>
      {/* Root Route */}
      {!isUserSignedIn && <Route path="/" element={<Home />} />}

      {/* Dashboard Route (handles all navigation after login) */}
      {isUserSignedIn && <Route path="/dashboard/*" element={<Dashboard />} />}

      {/* Redirect Logged-In Users from "/" to Dashboard */}
      {isUserSignedIn && <Route path="/" element={<Navigate to="/dashboard" />} />}

      {/* Fallback for Unmatched Routes */}
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
}

export default Navbarlink;
