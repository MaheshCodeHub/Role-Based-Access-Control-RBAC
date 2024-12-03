import React, { useState, useEffect } from "react";

function Notes() {
  const storedUserType = localStorage.getItem("userType");
  const [roles, setRoles] = useState([]);
  const [userPermissions, setUserPermissions] = useState({
    read: false,
    write: false,
    delete: false,
  });
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Fetch roles and notes from API on component mount
  useEffect(() => {
    const fetchRolesAndNotes = async () => {
      try {
        // Fetch roles
        const rolesResponse = await fetch("http://localhost:3000/api/getroles");
        const rolesData = await rolesResponse.json();
        setRoles(rolesData.data);

        // Fetch notes
        const notesResponse = await fetch(
          "http://localhost:3000/api/getallnotes"
        );
        const notesData = await notesResponse.json();
        setNotes(notesData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRolesAndNotes();
  }, []);

  // Set permissions based on the user type
  useEffect(() => {
    const role = roles.find((role) => role.name === storedUserType);
    if (role) {
      setUserPermissions(role.permissions);
    }
  }, [roles, storedUserType]);

  // Handle input change
  const handleInputChange = (e) => {
    setNote(e.target.value);
  };

  // Handle form submission to add or update a note
  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!userPermissions.write) {
      alert("You do not have permission to add notes.");
      return;
    }

    if (note.trim()) {
      try {
        // Send note to the backend to be saved
        const response = await fetch("http://localhost:3000/api/notes-create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: note,
            userType: storedUserType,
          }),
        });

        if (response.ok) {
          const newNote = await response.json();
          setNotes((prevNotes) => [...prevNotes, newNote]);
          setNote("");
        } else {
          alert("Failed to save the note.");
        }
      } catch (error) {
        console.error("Error adding note:", error);
      }
    } else {
      alert("Please enter a note!");
    }
  };

  // Handle edit note
  const handleEditNote = (index) => {
    if (!userPermissions.write) {
      alert("You do not have permission to edit notes.");
      return;
    }
    setIsEditing(true);
    setEditIndex(index);
    setNote(notes[index].content);
  };

  // Handle delete note
  const handleDeleteNote = async (index) => {
    if (!userPermissions.delete) {
      alert("You do not have permission to delete notes.");
      return;
    }

    const noteToDelete = notes[index];
    try {
      const response = await fetch(
        `http://localhost:3000/api/notes-delete/${noteToDelete._id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        setNotes(notes.filter((_, i) => i !== index));
      } else {
        alert("Failed to delete the note.");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Notes</h1>

      {/* Form to add or update a note */}
      {userPermissions.write && (
        <form onSubmit={handleAddNote} className="mb-4">
          <textarea
            className="w-full p-2 border rounded"
            placeholder="Enter your note here..."
            value={note}
            onChange={handleInputChange}
            rows="4"
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            {isEditing ? "Update Note" : "Add Note"}
          </button>
        </form>
      )}

      {/* Display added notes */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Your Notes</h2>
        {notes.length === 0 ? (
          <p>No notes added yet.</p>
        ) : (
          <div className="space-y-4">
            {notes.map((note, index) => (
              <div
                key={note._id}
                className="p-4 border border-gray-300 rounded bg-gray-50"
              >
                <p>{note.content}</p>
                <div className="mt-2 flex gap-2">
                  {userPermissions.write && (
                    <button
                      onClick={() => handleEditNote(index)}
                      className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                    >
                      Edit
                    </button>
                  )}
                  {userPermissions.delete && (
                    <button
                      onClick={() => handleDeleteNote(index)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Notes;
