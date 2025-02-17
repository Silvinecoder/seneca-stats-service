import { Request, Response, RequestHandler } from "express";
import { AppDataSource } from "../config/DatabaseConfig";
import { Course } from "../entities/Course";
import { LearningSessionStatic } from "../entities/LearningSessionStatic";

const courseRepository = AppDataSource.getRepository(Course);
const sessionRepository = AppDataSource.getRepository(LearningSessionStatic);

/**
 * @route POST /courses/{courseId}/sessions
 * @description Creates a new learning session for a specific course
 */
export const createSession: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { courseId } = req.params;  // This should extract the courseId
        const { sessionName, totalModulesStudied, averageScore, timeStudied } = req.body;

        // Find the course by courseId
        const course = await courseRepository.findOne({ where: { courseId } });
        if (!course) {
           res.status(404).json({ error: "Course not found" });
           return;
        }

        // Create the learning session
        const session = sessionRepository.create({
            sessionName,
            totalModulesStudied,
            averageScore,
            timeStudied,
            course,
        });

        await sessionRepository.save(session);
        res.status(201).json({ message: "Session recorded successfully", session });
    } catch (error) {
        console.error("Error creating session:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

/**
 * @route GET /courses/{courseId}/sessions/stats
 * @description Fetches aggregated stats for all sessions of a specific course
 */
export const getSessionStats: RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { courseId } = req.params;

        // Find the course
        const course = await courseRepository.findOne({ where: { courseId } });
        if (!course) {
            res.status(404).json({ error: "Course not found" });
            return;
        }

        // Find all sessions for the given course
        const sessions = await sessionRepository.find({ where: { course: { courseId } } });

        if (sessions.length === 0) {
            res.status(404).json({ error: "No sessions found for this course" });
            return;
        }

        // Aggregate session stats
        const totalModulesStudied = sessions.reduce((sum, session) => sum + session.totalModulesStudied, 0);
        const totalTimeStudied = sessions.reduce((sum, session) => sum + session.timeStudied, 0);
        const averageScore = sessions.reduce((sum, session) => sum + session.averageScore, 0) / sessions.length;

        // Return aggregated stats
        res.status(200).json({
            totalModulesStudied,
            averageScore,
            totalTimeStudied,
            numberOfSessions: sessions.length
        });
    } catch (error) {
        console.error("Error fetching session stats:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};