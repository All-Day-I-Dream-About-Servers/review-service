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

-- CREATE TABLE overview (
--   id AUTO_INCREMENT NOT NULL PRIMARY KEY,
--   avgRating INT(1) NOT NULL,
--   percentRecommend INT NOT NULL,
--   avgSize INT NOT NULL,
--   avgWidth INT NOT NULL,
--   avgComfort INT NOT NULL,
--   avgQuality INT NOT NULL,
--   fiveStars INT NOT NULL,
--   fourStars INT NOT NULL,
--   threeStars INT NOT NULL,
--   twoStars INT NOT NULL,
--   oneStar INT NOT NULL,
--   totalReviews INT NOT NULL
-- );