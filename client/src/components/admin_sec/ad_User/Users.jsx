import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify"; // Import react-toastify
import UserModal from "./UserModal";
import UserEditModal from "./UserEditModal";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null); // Track selected user ID

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/getallregister"
      );
      setUsers(response.data.data);
    } catch (error) {
      toast.error("Error fetching users. Please try again.");
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
      );
      if (!confirmDelete) {
        return; // Exit if the user cancels
      }
      await axios.delete(`http://localhost:3000/api/user-delete/${id}`);
      setUsers(users.filter((user) => user._id !== id));
      toast.success("User deleted successfully.");
    } catch (error) {
      toast.error("Error deleting user. Please try again.");
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      <button
        className="mb-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded"
        onClick={() => setShowUserModal(true)}
      >
        Add User
      </button>

      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 border border-gray-300 text-center text-gray-600 font-medium">
                Name
              </th>
              <th className="py-3 px-4 border border-gray-300 text-center text-gray-600 font-medium">
                Email
              </th>
              <th className="py-3 px-4 border border-gray-300 text-center text-gray-600 font-medium">
                Role
              </th>
              <th className="py-3 px-4 border border-gray-300 text-center text-gray-600 font-medium">
                Status
              </th>
              <th className="py-3 px-4 border border-gray-300 text-center text-gray-600 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                <td className="py-2 px-4 border border-gray-300 text-center">
                  {user.name}
                </td>
                <td className="py-2 px-4 border border-gray-300 text-center">
                  {user.email}
                </td>
                <td className="py-2 px-4 border border-gray-300 text-center">
                  {user.userType}
                </td>
                <td className="py-2 px-4 border border-gray-300 text-center">
                  {user.status ? "Active" : "Inactive"}
                </td>
                <td className="py-2 px-4 border border-gray-300 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                      onClick={() => {
                        setSelectedUserId(user._id); // Set selected user ID
                        setShowUserModal(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                      onClick={() => deleteUser(user._id)}
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

      <div className="block sm:hidden">
        {users.map((user) => (
          <div
            key={user._id}
            className="mb-4 p-4 border border-gray-300 rounded bg-white shadow-sm"
          >
            <p className="text-gray-700 font-medium">
              <span className="font-semibold">Name: </span> {user.name}
            </p>
            <p className="text-gray-700 font-medium">
              <span className="font-semibold">Email: </span> {user.email}
            </p>
            <p className="text-gray-700 font-medium">
              <span className="font-semibold">Role: </span> {user.userType}
            </p>
            <p className="text-gray-700 font-medium">
              <span className="font-semibold">Status: </span>{" "}
              {user.status ? "Active" : "Inactive"}
            </p>
            <div className="flex justify-start gap-2 mt-4">
              <button
                className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                onClick={() => {
                  setSelectedUserId(user._id); // Set selected user ID
                  setShowUserModal(true);
                }}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                onClick={() => deleteUser(user._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pass selectedUserId as prop to UserEditModal */}
      {showUserModal && (
        <UserModal onClose={() => setShowUserModal(false)} />
      )}
      {showUserModal && (
        <UserEditModal
          userId={selectedUserId} // Pass the user ID here
          onClose={() => setShowUserModal(false)}
        />
      )}
    </div>
  );
};

export default Users;
