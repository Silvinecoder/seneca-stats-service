import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "dotenv";

import { Course } from "../entities/Course";
import { LearningSessionStatic } from "../entities/LearningSessionStatic";

// Load environment variables
config();

export const AppDataSource = new DataSource({
	type: "postgres",
	host: process.env.STATS_DATABASE_HOST,
	port: parseInt(process.env.STATS_DATABASE_PORT || "54321"),
	username: process.env.STATS_DATABASE_USERNAME,
	password: process.env.STATS_DATABASE_PASSWORD,
	database: process.env.STATS_DATABASE_NAME,
	synchronize: true,
	logging: true,
	entities: [Course, LearningSessionStatic],
});

// Initialize the database connection
export const initializeDatabase = async () => {
	try {
	  await AppDataSource.initialize();
	  console.log("✅ Database connected!");
	} catch (error) {
	  console.error("❌ Database connection error:", error);
	  process.exit(1);
	}
  };
  