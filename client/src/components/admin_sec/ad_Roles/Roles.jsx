import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for HTTP requests
import RoleModal from "./RoleModal";

const Roles = () => {
  const [roles, setRoles] = useState([]); // Empty array to store roles
  const [showRoleModal, setShowRoleModal] = useState(false);

  // Function to fetch roles data from the backend
  const fetchRoles = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/getroles"); // Adjust URL if needed
      const fetchedRoles = response.data.data;

      // Map the permissions to human-readable values
      const mappedRoles = fetchedRoles.map((role) => ({
        ...role,
        permissions: Object.keys(role.permissions).filter(
          (permission) => role.permissions[permission]
        ),
      }));

      setRoles(mappedRoles); // Update the state with fetched roles
    } catch (error) {
      console.error("Error fetching roles:", error);
      alert("Failed to fetch roles.");
    }
  };

  // Function to delete a role
  const handleDeleteRole = async (roleId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/role-delete/${roleId}`
      );
      if (response.status === 200) {
        // Remove the role from the state after successful deletion
        setRoles((prevRoles) =>
          prevRoles.filter((role) => role._id !== roleId)
        );
        alert("Role deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting role:", error);
      alert("Failed to delete the role.");
    }
  };

  useEffect(() => {
    fetchRoles(); // Fetch roles when the component mounts
  });

  const handleAddRole = () => {
    setShowRoleModal(true);
  };

  const handleCloseRoleModal = () => {
    setShowRoleModal(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Roles</h1>
      <button
        className="mb-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded"
        onClick={handleAddRole}
      >
        Add Role
      </button>

      {/* Table for larger screens */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 border border-gray-300 text-center text-gray-600 font-medium">
                Role
              </th>
              <th className="py-3 px-4 border border-gray-300 text-center text-gray-600 font-medium">
                Permissions
              </th>
              <th className="py-3 px-4 border border-gray-300 text-center text-gray-600 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role, index) => (
              <tr
                key={role._id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="py-2 px-4 border border-gray-300 text-center">
                  {role.name}
                </td>
                <td className="py-2 px-4 border border-gray-300 text-center">
                  {role.permissions.join(", ")}
                </td>
                <td className="py-2 px-4 border border-gray-300 text-center">
                  <div className="flex justify-center gap-2">
                    {/* <button className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded">
                      Edit
                    </button> */}
                    <button
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                      onClick={() => handleDeleteRole(role._id)} // Trigger delete on click
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card layout for mobile screens */}
      <div className="block sm:hidden">
        {roles.map((role) => (
          <div
            key={role._id}
            className="mb-4 p-4 border border-gray-300 rounded bg-white shadow-sm"
          >
            <p className="text-gray-700 font-medium">
              <span className="font-semibold">Role: </span> {role.name}
            </p>
            <p className="text-gray-700 font-medium">
              <span className="font-semibold">Permissions: </span>{" "}
              {role.permissions.join(", ")}
            </p>
            <div className="flex justify-start gap-2 mt-4">
              {/* <button className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded">
                Edit
              </button> */}
              <button
                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                onClick={() => handleDeleteRole(role._id)} // Trigger delete on click
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showRoleModal && <RoleModal handleCloseModal={handleCloseRoleModal} />}
    </div>
  );
};

export default Roles;
