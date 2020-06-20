DROP DATABASE IF EXISTS moviegoat_db;

CREATE DATABASE moviegoat_db;
USE moviegoat_db;

-- Table definitions below are only for reference. 
-- CREATE TABLE movies (
-- 	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
--     movie_name varchar(50) NOT NULL,
--     createdAt DATETIME NOT NULL,
--     updatedAt DATETIME NOT NULL
-- );

-- CREATE TABLE users (
-- 	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
--     user_name varchar(50) NOT NULL,
--     createdAt DATETIME NOT NULL,
--     updatedAt DATETIME NOT NULL
-- );

-- CREATE TABLE reviews (
-- 	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
--     review_title varchar(200) NOT NULL,
--     review_text varchar(4000) NOT NULL,
--     review_rating INT DEFAULT 0,
--     user_id INT NOT NULL,
--     movie_id INT NOT NULL,
--     createdAt DATETIME NOT NULL,
--     updatedAt DATETIME NOT NULL
-- );