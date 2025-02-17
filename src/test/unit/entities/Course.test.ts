import { Course } from "../../../entities/Course"
import { LearningSessionStatic } from "../../../entities/LearningSessionStatic"

describe("Course Entity", () => {
  it("should correctly instantiate the Course entity", () => {
    const courseId = "b2f0c44d-56a4-44a3-b94a-b6ec0a9fe618";
    const name = "JavaScript for Beginners";
    const description = "An introductory course to JavaScript.";
    const courseCode = "JS101";
    const createdAt = new Date();
    const sessions: LearningSessionStatic[] = [];  // Mocking empty sessions for simplicity

    const course = new Course(courseId, name, description, courseCode, createdAt, sessions);

    expect(course.courseId).toBe(courseId);
    expect(course.name).toBe(name);
    expect(course.description).toBe(description);
    expect(course.courseCode).toBe(courseCode);
    expect(course.createdAt).toBe(createdAt);
    expect(course.sessions).toBe(sessions);
  });

  it("should have the correct properties after initialization", () => {
    const courseId = "a3f0c44d-12a4-43a3-c34a-a6dc0a9fe675";
    const name = "Advanced Python";
    const description = "A deep dive into Python.";
    const courseCode = "PY301";
    const createdAt = new Date();
    const sessions: LearningSessionStatic[] = [];

    const course = new Course(courseId, name, description, courseCode, createdAt, sessions);

    expect(course).toHaveProperty("courseId", courseId);
    expect(course).toHaveProperty("name", name);
    expect(course).toHaveProperty("description", description);
    expect(course).toHaveProperty("courseCode", courseCode);
    expect(course).toHaveProperty("createdAt");
    expect(course).toHaveProperty("sessions", sessions);
  });
});
