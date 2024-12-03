import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const Sidebar = ({ userType, sidebarOpen, setSidebarOpen }) => {
  const adminLinks = [
    { label: "Dashboard", path: "/" },
    { label: "Manage Users", path: "/dashboard/manage-users" },
    { label: "Roles", path: "/dashboard/roles" },
    { label: "notes", path: "/dashboard/notes" },
    // { label: "permissions", path: "/dashboard/permissions" },
  ];

  const studentLinks = [
    { label: "Home", path: "/" },
    { label: "notes", path: "/dashboard/notes" },
    // { label: "Profile", path: "/dashboard/profile" },
  ];

  const links = userType === "admin" ? adminLinks : studentLinks;

  const handleLogout = () => {
    localStorage.clear(); // Clear user data
    window.location.href = "/"; // Redirect to login
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 bg-gray-800 text-white w-64 transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
    >
      <button
        className="md:hidden p-4 text-right text-white"
        onClick={() => setSidebarOpen(false)}
      >
        ✖
      </button>
      <div className="p-4">
        <h2 className="text-2xl font-bold">
          {userType === "admin" ? "Admin Panel" : "Student Panel"}
        </h2>
        <ul>
          {links.map((link) => (
            <li
              key={link.path}
              className="block w-full text-left px-4 py-2 hover:bg-gray-700 capitalize"
            >
              <Link to={link.path}>{link.label}</Link> {/* Use Link to route */}
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4">
        <button
          className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-bold rounded shadow"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
