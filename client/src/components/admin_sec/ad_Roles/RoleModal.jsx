import React, { useState } from "react";
import axios from "axios"; // Import axios for HTTP requests

const RoleModal = ({ handleCloseModal }) => {
  const [name, setName] = useState("");
  const [readPermission, setReadPermission] = useState(false);
  const [writePermission, setWritePermission] = useState(false);
  const [deletePermission, setDeletePermission] = useState(false);

  const handlePermissionChange = (permission) => {
    switch (permission) {
      case "read":
        setReadPermission((prev) => !prev);
        break;
      case "write":
        setWritePermission((prev) => !prev);
        break;
      case "delete":
        setDeletePermission((prev) => !prev);
        break;
      default:
        break;
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Form validation (Optional: check if role name and at least one permission is selected)
    if (!name) {
      alert("Role name is required.");
      return;
    }
  
    // Create the new role object
    const newRole = { name, readPermission, writePermission, deletePermission };
  
    try {
      // Send POST request to the backend
      const response = await axios.post("http://localhost:3000/api/role-create", newRole);
  
      // Handle success (Optional: show a success message or log the response)
      if (response.status === 201) {
        console.log("New Role Added:", response.data);
        alert("Role created successfully!");
      } else {
        console.error("Failed to add role:", response);
        alert("Failed to create role.");
      }
  
      // Close the modal after submitting
      handleCloseModal();
    } catch (error) {
      // Handle errors (e.g., network issues or validation errors from the backend)
      console.error("Error while adding role:", error);
      alert("An error occurred while creating the role.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
        {/* Modal Header */}
        <h2 className="text-2xl font-bold mb-4">Add Role</h2>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Role Name Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700">Role Name</label>
            <select
              className="w-full px-4 py-2 border rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Role
              </option>
              <option value="admin">Admin</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>

          {/* Permissions Checkboxes */}
          <div className="mb-4">
            <label className="block text-gray-700">Permissions</label>
            <div className="flex flex-wrap">
              <label className="mr-4">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={readPermission}
                  onChange={() => handlePermissionChange("read")}
                />
                Read
              </label>
              <label className="mr-4">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={writePermission}
                  onChange={() => handlePermissionChange("write")}
                />
                Write
              </label>
              <label className="mr-4">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={deletePermission}
                  onChange={() => handlePermissionChange("delete")}
                />
                Delete
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add Role
            </button>
          </div>
        </form>

        {/* Close Modal Button (optional icon for better UX) */}
        <button
          onClick={handleCloseModal}
          className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 focus:outline-none"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default RoleModal;
