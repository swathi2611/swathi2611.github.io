DROP DATABASE IF EXISTS aumdb; 
CREATE DATABASE aumdb; 
USE aumdb;

-- creating the student table
CREATE TABLE students (
  id                INT             PRIMARY KEY   AUTO_INCREMENT,
  name              VARCHAR(255)    NOT  NULL,
  gender            VARCHAR(12)     NOT NULL,
  birth_date        DATETIME       DEFAULT NULL,
  address           VARCHAR(255)   DEFAULT NULL, 
  email             VARCHAR(255)    NOT NULL      UNIQUE,
  password          VARCHAR(60)    NOT NULL
);

-- creating the instructor table
CREATE TABLE instructors (
  id                INT             PRIMARY KEY   AUTO_INCREMENT,
  name              VARCHAR(255)    NOT  NULL,
  gender            VARCHAR(12)     NOT NULL,
  birth_date        DATETIME       DEFAULT NULL,
  address           VARCHAR(255)   DEFAULT NULL, 
  email             VARCHAR(255)    NOT NULL      UNIQUE,
  password          VARCHAR(60)    NOT NULL
);

CREATE TABLE courses (
  course_id         VARCHAR(10)    PRIMARY KEY UNIQUE,
  course_name       VARCHAR(255)    NOT NULL,
  time              VARCHAR(32)    NOT NULL,
  classroom         VARCHAR(32)    NOT NULL,
  semester          VARCHAR(32)    NOT NULL,
  instructor_id     INT    NOT NULL,
  CONSTRAINT courses_fk_instructors
    FOREIGN KEY (instructor_id)
    REFERENCES instructors (id)
);

CREATE TABLE student_enrolled_courses(
  id                INT            PRIMARY KEY      AUTO_INCREMENT,
  student_id        INT            NOT NULL, 
  course_id         VARCHAR(10)    NOT NULL, 
  CONSTRAINT student_enrolled_courses_fk_students 
    FOREIGN KEY (student_id)
    REFERENCES students (id),
  CONSTRAINT student_enrolled_courses_fk_courses
    FOREIGN KEY (course_id)
    REFERENCES courses (course_id) 
);

-- Insert data into the tables
INSERT INTO students (id,name,gender,birth_date,address,email,password) VALUES
(1,'Midhun','Male',NULL,'100 East Ridgewood Ave. , Paramus NJ - 07652','midhun@mail.com','PAssWORD'),
(2,'Kelly M','Female',NULL,NULL,'Kelly@email.com','PAssWORD'),
(3,'sidharth','Male',NULL,NULL,'sid56@email.com','PAssWORD');


INSERT INTO instructors (id,name,gender,birth_date,address,email,password) VALUES
(1111,'lee wui','Male',null,NULL,'ashdefat@mail.com','PAssWORD'),
(1112,'Semih Dinc','Male',NULL,NULL,'sdinc@aum.com','PAssWORD'),
(1342,'hua yean','Female',NULL,NULL,'hua@aum.com','PAssWORD');



INSERT INTO courses (course_id, course_name, classroom, semester , time, instructor_id) VALUES
('CNIT 445','Advanced Neural Network','TuTh 10:30 AM', 'E1-S10','FALL',1111),
('CS00 635','Advance Database','Wed 2:30 PM', 'E1-S10','Spring',1112),
('CS00 632','Cloud computing','Fr 11:30 AM', 'E1-S10','Summer',1112),
('CSNT 232','Front end Development','Mo 2:30 PM', 'E6-S10','spring',1342);

INSERT INTO student_enrolled_courses ( id, student_id, course_id ) VALUES
(1,1,'CNIT 445'),
(2,1,'CS00 635'),
(3,2,'CS00 632'),
(4,3,'CS00 635');

-- Create a user named aumuser

GRANT SELECT, INSERT, UPDATE, DELETE
ON *
TO aumuser@localhost
IDENTIFIED BY 'Pass5Word';
