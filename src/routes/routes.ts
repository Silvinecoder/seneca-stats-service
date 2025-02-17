import { Router } from "express";
import { createCourse, getCourseStats } from "../controllers/CoursesController";
import { createSession, getSessionStats } from "../controllers/LearningSessionStaticController";

const router = Router();

// Route for creating a session
router.post("/courses", createCourse);

// Route for retrieving aggregated course statistics
router.get("/courses/:courseId", getCourseStats);

// Route for retrieving a specific session's statistics
router.post("/courses/:courseId/sessions", createSession);

router.get("/courses/:courseId/sessions/:sessionsId", getSessionStats)

export default router;
