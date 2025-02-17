import { LearningSessionStatic } from   "../../../entities/LearningSessionStatic"
import { Course } from "../../../entities/Course"

describe("LearningSessionStatic Entity", () => {
  it("should correctly instantiate the LearningSessionStatic entity", () => {
    const course = new Course(
      "b2f0c44d-56a4-44a3-b94a-b6ec0a9fe618",
      "JavaScript for Beginners",
      "An introductory course to JavaScript.",
      "JS101",
      new Date(),
      []
    );
    
    const sessionId = "b2f0c44d-56a4-44a3-b94a-b6ec0a9fe999";
    const sessionName = "Intro to JavaScript Session";
    const totalModulesStudied = 10;
    const averageScore = 85.5;
    const timeStudied = 120;

    const learningSession = new LearningSessionStatic(
      sessionId,
      sessionName,
      totalModulesStudied,
      averageScore,
      timeStudied,
      course
    );

    expect(learningSession.sessionId).toBe(sessionId);
    expect(learningSession.sessionName).toBe(sessionName);
    expect(learningSession.totalModulesStudied).toBe(totalModulesStudied);
    expect(learningSession.averageScore).toBe(averageScore);
    expect(learningSession.timeStudied).toBe(timeStudied);
    expect(learningSession.course).toBe(course);
  });

  it("should have the correct properties after initialization", () => {
    const course = new Course(
      "b2f0c44d-56a4-44a3-b94a-b6ec0a9fe618",
      "Advanced Python",
      "A deep dive into Python.",
      "PY301", 
      new Date(),
      []
    );
    
    const sessionId = "a3f0c44d-12a4-43a3-c34a-a6dc0a9fe675";
    const sessionName = "Advanced Python Session";
    const totalModulesStudied = 15;
    const averageScore = 92.0;
    const timeStudied = 150;

    const learningSession = new LearningSessionStatic(
      sessionId,
      sessionName,
      totalModulesStudied,
      averageScore,
      timeStudied,
      course
    );

    expect(learningSession).toHaveProperty("sessionId", sessionId);
    expect(learningSession).toHaveProperty("sessionName", sessionName);
    expect(learningSession).toHaveProperty("totalModulesStudied", totalModulesStudied);
    expect(learningSession).toHaveProperty("averageScore", averageScore);
    expect(learningSession).toHaveProperty("timeStudied", timeStudied);
    expect(learningSession).toHaveProperty("course", course);
  });
});
