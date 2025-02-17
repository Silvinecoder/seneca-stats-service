import express from "express";
import cors from "cors";
import { config } from "dotenv";

import router from "./routes/routes";
import { initializeDatabase } from "./config/DatabaseConfig";
// Load environment variables
config();

const app = express();
app.use(express.json());

// Middleware setup
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON request bodies
app.use("/api", router); // Mount the router at /api

// Initialize the database
initializeDatabase().then(() => {
  app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
  });
});
