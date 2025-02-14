import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { LearningSessionStatic } from "./LearningSessionStatic";  // Import the related entity

@Entity('courses')
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
}