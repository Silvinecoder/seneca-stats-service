import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { LearningSessionStatic } from "./LearningSessionStatic";  // Import the related entity

@Entity("course")
export class Course {
    @PrimaryGeneratedColumn("uuid")
    courseId: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    courseCode: string;

    @CreateDateColumn()
    createdAt: Date;

    // Relationship with LearningSessionStatic: One Course can have many Sessions
    @OneToMany(() => LearningSessionStatic, (session) => session.course)
    sessions: LearningSessionStatic[];

    // Initialize the course table
    constructor(courseId: string, name: string, description: string, courseCode: string, createdAt: Date, sessions: LearningSessionStatic[]) {
        this.courseId = courseId;
        this.name = name;
        this.description = description;
        this.courseCode = courseCode;
        this.createdAt = createdAt;
        this.sessions= sessions;
    }
}