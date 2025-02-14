import { AppDataSource } from "../config/DbConfig";

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("✅ Database connected!");
  } catch (error) {
    console.error("❌ Database connection error:", error);
    process.exit(1);
  }
};
