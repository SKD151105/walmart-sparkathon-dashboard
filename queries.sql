-- Database used: Postgers15
-- Db-setup()

-- (1) Create the database (run this only once manually if needed)
-- NOTE: You cannot create a DB inside a DB, so run this outside psql or separately
-- CREATE DATABASE walmartDb;

-- (2) Setup the .env file (refer .env.example)

-- (3) Create the following tables using query tool in postgers
CREATE TABLE AuthUsers (
  srno SERIAL PRIMARY KEY,
  walmartid VARCHAR(10) UNIQUE
);

INSERT INTO AuthUsers (walmartid) VALUES
('W-00001'),
('W-00010'),
('W-00011'),
('W-00100'),
('W-00101');

CREATE TABLE users (
  name VARCHAR(50),
  gender VARCHAR(10),
  occupation VARCHAR(20),
  walmartid VARCHAR(10) PRIMARY KEY,
  email VARCHAR(50) UNIQUE,
  password VARCHAR(100)
);
