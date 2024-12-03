// controllers/noteController.js
import Note from "../models/noteModel.js";

// Create a new note
const createNote = async (req, res) => {
  try {
    const { content, userType } = req.body;

    // Check if the userType is valid
    if (!["admin", "student", "teacher"].includes(userType)) {
      return res.status(400).json({ error: "Invalid user type" });
    }

    // Create the new note
    const newNote = new Note({
      content,
      userType,
    });

    const savedNote = await newNote.save();
    res.status(201).json({ message: "Note created successfully", data: savedNote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to create note" });
  }
};

// Get all notes
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json({ data: notes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to fetch notes" });
  }
};

// Get a note by ID
const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json({ data: note });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to fetch note" });
  }
};

// Update a note
const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { content },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json({ message: "Note updated successfully", data: updatedNote });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to update note" });
  }
};

// Delete a note
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to delete note" });
  }
};

export { createNote, getAllNotes, getNoteById, updateNote, deleteNote };
