import express from "express";
import { config } from "dotenv";
import { initializeDatabase } from "./db/DbConnection";

// Load environment variables
config();

const app = express();
app.use(express.json());

// Initialize the database
initializeDatabase().then(() => {
  app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
  });
});
