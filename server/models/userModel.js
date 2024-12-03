import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please fill a valid email address'], // Added email regex validation
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Ensuring the password has a minimum length of 6
    },
    userType: {
      type: String,
      enum: ["student", "admin", "teacher"], // Specifying allowed user types
      default: "student",
    },
    status: {
      type: Boolean,
      default: true, // Updated to camelCase
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("register", userSchema);

export default userModel;
