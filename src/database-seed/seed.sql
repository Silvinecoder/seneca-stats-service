-- CREATE TABLE for Courses
CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    course_code VARCHAR(50) NOT NULL UNIQUE
);

-- CREATE TABLE for SessionStatic
CREATE TABLE IF NOT EXISTS LearningSessionStatic (
    session_uuid UUID PRIMARY KEY,
    session_name VARCHAR(255) NOT NULL,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE
);

-- Insert data into courses table
INSERT INTO courses (name, description, course_code) VALUES
('Course 1', 'Intro to TypeScript', 'TS101'),
('Course 2', 'Advanced Node.js', 'NODE201');

-- Insert data into sessionstatic table
INSERT INTO LearningSessionStatic (session_uuid, session_name, course_id) VALUES
('5d8b4b85-bdce-4f58-b3bc-cfb9cfe9a2bc', 'Session 1', 1),
('74ab9f84-0e9e-4400-aee1-b1cbb4f9decc', 'Session 2', 2);
