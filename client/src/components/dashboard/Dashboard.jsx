import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Home from "./Home";
import Users from "../admin_sec/ad_User/Users";
import Roles from "../admin_sec/ad_Roles/Roles";
import Notes from "./Notes";
// import Permissions from "./Permissions";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userType, setUserType] = useState(""); // 'admin' or 'student'

  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/token-data", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: localStorage.getItem("token") }),
        });

        const data = await response.json();
        if (data.data === "token expired") {
          alert("Session expired. Please log in again.");
          localStorage.clear();
          window.location.href = "/";
        } else {
          setUserType(data.data.userType);
        }
      } catch (error) {
        console.error("Failed to fetch user type:", error);
      }
    };

    fetchUserType();
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Sidebar
        userType={userType}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="flex-1 p-6 bg-gray-100">
        <button
          className="md:hidden mb-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? "Close Menu" : "Open Menu"}
        </button>

        {/* Define Routes for Each View */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="manage-users" element={<Users />} />
          <Route path="roles" element={<Roles />} />
          <Route path="notes" element={<Notes />} />
          {/* <Route path="permissions" element={<Permissions />} /> */}
          {/* Add more routes for other views */}
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
