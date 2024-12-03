import Role from "../models/roleModel.js";

// Create a new role
const createRole = async (req, res) => {
  try {
    const { name, readPermission, writePermission, deletePermission } = req.body;

    // Validate permissions
    if (!["admin", "student", "teacher"].includes(name)) {
      return res.status(400).json({ error: "Invalid role name" });
    }

    const newRole = new Role({
      name,
      permissions: {
        read: readPermission,
        write: writePermission,
        delete: deletePermission,
      },
    });

    const savedRole = await newRole.save();
    res.status(201).json({ message: "Role created successfully", data: savedRole });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to create role" });
  }
};

// Get all roles
const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.status(200).json({ data: roles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to fetch roles" });
  }
};

// Get role by ID
const getRoleById = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await Role.findById(id);

    if (!role) {
      return res.status(404).json({ error: "Role not found" });
    }

    res.status(200).json({ data: role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to fetch role" });
  }
};

// Update a role
const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, read, write, deletePermission } = req.body;

    const updatedRole = await Role.findByIdAndUpdate(
      id,
      {
        name,
        permissions: {
          read,
          write,
          delete: deletePermission,
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedRole) {
      return res.status(404).json({ error: "Role not found" });
    }

    res.status(200).json({ message: "Role updated successfully", data: updatedRole });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to update role" });
  }
};

// Delete a role
const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRole = await Role.findByIdAndDelete(id);

    if (!deletedRole) {
      return res.status(404).json({ error: "Role not found" });
    }

    res.status(200).json({ message: "Role deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to delete role" });
  }
};

export { createRole, getAllRoles, getRoleById, updateRole, deleteRole };
