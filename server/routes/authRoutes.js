import express from "express";
import {
  registerUser,
  deleteUser,
  updateUser,
  getUserById,
  getAllUser,
  loginUser,
  logoutUser,
  getUserDataFromToken,
} from "../controllers/authController.js"; // Add `.js` extension for ES modules

const router = express.Router();

router.post("/register", registerUser);
router.delete("/user-delete/:id", deleteUser);
router.put("/user-update/:id", updateUser);
router.get("/get-user/:id", getUserById); 
router.get("/getallregister", getAllUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/token-data", getUserDataFromToken);

export default router;
