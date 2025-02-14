import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Course } from "./Course";  // Import the related entity

@Entity()
export class LearningSessionStatic {
    @PrimaryGeneratedColumn("uuid")
    sessionId: string;

    @Column()
    sessionName: string;

    @ManyToOne(() => Course, (course) => course.sessions)
    @JoinColumn({ name: "courseId" })  // Define the foreign key column
    course: Course;
}
