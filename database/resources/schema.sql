DROP DATABASE IF EXISTS reviews;
CREATE DATABASE reviews;

USE reviews;

CREATE TABLE reviews (
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  rating INT NOT NULL,
  title TEXT,
  body TEXT NOT NULL,
  recommended BOOLEAN NOT NULL,
  name TEXT NOT NULL,
  verified BOOLEAN NOT NULL,
  helpfulYes INT NOT NULL,
  helpfulNo INT NOT NULL,
  date TEXT NOT NULL,
  dateNum INT NOT NULL,
  size INT NOT NULL,
  width INT NOT NULL,
  comfort INT NOT NULL,
  quality INT NOT NULL
);
