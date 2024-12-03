import express from "express";
import {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
} from "../controllers/roleController.js";

const router = express.Router();

// Role routes
router.post("/role-create", createRole);  // Create a role
router.get("/getroles", getAllRoles);        // Get all roles
router.get("/getrole:id", getRoleById);     // Get a role by ID
router.put("/:id", updateRole);      // Update a role
router.delete("/role-delete/:id", deleteRole);   // Delete a role

export default router;
