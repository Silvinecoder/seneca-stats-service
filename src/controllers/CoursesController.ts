import { Request, Response, RequestHandler } from "express";  // Ensure RequestHandler is imported
import { AppDataSource } from "../config/DatabaseConfig";
import { Course } from "../entities/Course";
import { LearningSessionStatic } from "../entities/LearningSessionStatic";

const courseRepository = AppDataSource.getRepository(Course);
const sessionRepository = AppDataSource.getRepository(LearningSessionStatic);

/**
 * @route POST /courses
 * @description Creates a new course
 */
export const createCourse: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description, courseCode } = req.body;

        // Create a new course
        const course = courseRepository.create({
            name,
            description,
            courseCode,
        });

        await courseRepository.save(course);
        res.status(201).json({ message: "Course created successfully", course });
    } catch (error) {
        console.error("Error creating course:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

/**
 * @route GET /courses/{courseId}
 * @description Fetches aggregated course statistics
 */
export const getCourseStats: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { courseId } = req.params;
        const userId = req.header("userId");

        if (!userId) {
            res.status(400).json({ error: "User ID is required in the header" });
            return;
        }

        const sessions = await sessionRepository.find({ where: { course: { courseId } } });

        if (sessions.length === 0) {
            res.status(404).json({ error: "No statistics found for this course" });
            return;
        }

        const totalModulesStudied = sessions.reduce((sum, session) => sum + session.totalModulesStudied, 0);
        const totalTimeStudied = sessions.reduce((sum, session) => sum + session.timeStudied, 0);
        const averageScore =
            sessions.length > 0
                ? sessions.reduce((sum, session) => sum + session.averageScore, 0) / sessions.length
                : 0;

        res.status(200).json({
            totalModulesStudied,
            averageScore,
            timeStudied: totalTimeStudied,
        });
    } catch (error) {
        console.error("Error fetching course stats:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
