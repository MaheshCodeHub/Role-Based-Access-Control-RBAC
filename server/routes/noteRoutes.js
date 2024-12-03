// routes/noteRoutes.js
import express from 'express';
import { createNote, getAllNotes, getNoteById, updateNote, deleteNote } from '../controllers/noteController.js';

const router = express.Router();

// Route to create a new note
router.post('/notes-create', createNote);

// Route to get all notes
router.get('/getallnotes', getAllNotes);

// Route to get a note by ID
router.get('/getnotes-single/:id', getNoteById);

// Route to update a note
router.put('/notes/:id', updateNote);

// Route to delete a note
router.delete('/notes-delete/:id', deleteNote);

export default router;
