// models/noteModel.js
import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true, // This will help us track user roles
      enum: ["admin", "student", "teacher"], // Limit to these roles
    },
  },
  { timestamps: true }
);

const Note = mongoose.model('Note', noteSchema);

export default Note;
