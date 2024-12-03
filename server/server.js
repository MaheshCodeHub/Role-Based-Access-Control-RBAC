import dotenv from "dotenv";
dotenv.config();  // Make sure this is at the very top
import express from "express";
import configureServer from "./config/serverConfig.js"; // Import server config
import connectDB from "./config/db.js"; // Import database config
import authRoutes from "./routes/authRoutes.js"; // Import auth routes
import rolesRoutes from "./routes/roleRoutes.js"; // Import auth routes
import noteRoutes  from "./routes/noteRoutes.js"; // Import auth routes

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;





const app = express();

// Configure middlewares and server settings
configureServer(app);

// Register routes
app.use("/api", authRoutes); // Register authentication routes
app.use("/api", rolesRoutes); // Register authentication routes
app.use("/api", noteRoutes); // Register authentication routes

// Connect to database and start server
connectDB(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Node API app is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error starting server:", error);
  });
