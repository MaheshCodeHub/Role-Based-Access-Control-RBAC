import userModel from "../models/userModel.js"; // Add `.js` extension
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

// console.log(JWT_SECRET);
// Register user
const registerUser = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    const register = await newUser.save();
    res.status(200).json(register);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Unable to register user, something went wrong" });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params; // Assuming the user's ID is passed as a URL parameter

    // Find and delete the user by ID
    const deletedUser = await userModel.findByIdAndDelete(id);

    if (deletedUser) {
      res.status(200).json({
        status: "ok",
        message: "User deleted successfully",
        data: deletedUser, // Return the deleted user's details if needed
      });
    } else {
      res.status(404).json({ status: "error", message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "error", message: "Unable to delete user", error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params; // User ID from URL
    const updatedData = req.body; // Fields to update from request body

    // Check if password is included in the request body
    if (updatedData.password) {
      // If password is provided, hash it
      const salt = await bcrypt.genSalt(10);
      updatedData.password = await bcrypt.hash(updatedData.password, salt);
    } else {
      // If password is not provided, remove it from the update data
      delete updatedData.password;
    }

    // Find and update the user
    const updatedUser = await userModel.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated document
      runValidators: true, // Validate fields against the schema
    });

    if (updatedUser) {
      res.status(200).json({
        status: "ok",
        message: "User updated successfully",
        data: updatedUser,
      });
    } else {
      res.status(404).json({ status: "error", message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "error", message: "Unable to update user", error });
  }
};

// Get User by ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params; // User ID from URL
    const user = await userModel.findById(id);

    if (user) {
      res.status(200).json({ status: "ok", data: user });
    } else {
      res.status(404).json({ status: "error", message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: "error", message: "Unable to fetch user", error });
  }
};

//get All User
const getAllUser = async (req, res) => {
  try {
    const register = await userModel.find();
    res.status(201).json({ status: "ok", data: register });
  } catch (error) {
    res.status(500).json({ error: "Unable to get students" });
    // throw new Error(error.message);
  }
};

// User Login
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("All fields are required.");
    }

    const user = await userModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
        expiresIn: "1d",
      });

      res.cookie("token", token, { httpOnly: true });
      res
        .status(200)
        .json({ message: "Login successful", token, userType: user.userType });
    } else {
      res.status(401);
      throw new Error("Invalid credentials.");
    }
  } catch (error) {
    next(error);
  }
};

// User Logout
const logoutUser = (req, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: "Logged out successfully" });
};

const getUserDataFromToken = async (req, res) => {
  const { token } = req.body;

  try {
    const user = jwt.verify(token, JWT_SECRET);
    const useremail = user.email;

    const data = await userModel.findOne({ email: useremail });

    if (data) {
      res.send({ status: "ok", data: data });
    } else {
      res.status(404).send({ status: "error", data: "User not found" });
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.send({ status: "error", data: "Token expired" });
    }
    console.error(error);
    res.status(500).json({ error: "Unable to get user data" });
  }
};

export {
  registerUser,
  deleteUser,
  updateUser,
  getUserById,
  getAllUser,
  loginUser,
  logoutUser,
  getUserDataFromToken,
};
