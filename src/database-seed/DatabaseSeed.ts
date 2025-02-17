import { AppDataSource } from "../config/DatabaseConfig";
import { Course } from "../entities/Course";
import { LearningSessionStatic } from "../entities/LearningSessionStatic";

const seedData = async () => {
  const courseRepo = AppDataSource.getRepository(Course);
  const sessionRepo = AppDataSource.getRepository(LearningSessionStatic);

  try {
    await AppDataSource.initialize();
    console.log('✅ Database connected!');
    
    // Check if there are any existing courses in the database
    let existingCourses = await courseRepo.find();
    
    if (existingCourses.length === 0) {
      existingCourses = await courseRepo.save([
        { name: 'Course 1', description: 'Intro to TypeScript', courseCode: 'TS101' },
        { name: 'Course 2', description: 'Advanced Node.js', courseCode: 'NODE201' },
      ]);
      console.log('✅ Courses seeded!');
    }

    // Ensure we have the courses before creating sessions
    const [course1, course2] = existingCourses;

    // Check if there are any existing learning sessions
    const existingSessions = await sessionRepo.find();
    if (existingSessions.length === 0) {
      const sessions = [
        { sessionName: 'Session 1', totalModulesStudied: 10, averageScore: 85.5, timeStudied: 120, course: course1 },
        { sessionName: 'Session 2', totalModulesStudied: 15, averageScore: 92.0, timeStudied: 180, course: course2 },
      ];

      await sessionRepo.save(sessions);
      console.log('✅ Learning sessions seeded!');
    }
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  } finally {
    await AppDataSource.destroy();
  }
};

seedData();
