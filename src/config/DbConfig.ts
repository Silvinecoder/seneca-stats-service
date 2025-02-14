import "reflect-metadata";
import { DataSource } from "typeorm";
import { config } from "dotenv";

import { Course } from "../entities/Course";
import { LearningSessionStatic } from "../entities/LearningSessionStatic";

// Load environment variables
config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "stats_user",
  password: "stats_password",
  database: "stats_db",
  synchronize: true,
  logging: true,
  entities: [Course, LearningSessionStatic],
});