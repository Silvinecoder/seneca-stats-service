import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Course } from "./Course";  // Import the related entity

@Entity("learning_session_static")
export class LearningSessionStatic {
    @PrimaryGeneratedColumn("uuid")
    sessionId: string;

    @Column()
    sessionName: string;

    @Column("int")
    totalModulesStudied: number;

    @Column("float")
    averageScore: number;

    @Column("int")
    timeStudied: number;

    @ManyToOne(() => Course, (course) => course.sessions)
    @JoinColumn({ name: "courseId" })
    course: Course;

    // Initialize the learning_session_static object
    constructor(sessionId: string, sessionName: string, totalModulesStudied: number, averageScore: number, timeStudied: number, course: Course) {
        this.sessionId = sessionId;
        this.sessionName = sessionName;
        this.totalModulesStudied = totalModulesStudied;
        this.averageScore = averageScore;
        this.timeStudied = timeStudied;
        this.course = course;
    }
}