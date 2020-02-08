DROP TABLE IF EXISTS books;

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR (255),
  author VARCHAR (255),
  isbn NUMERIC,
  image_url TEXT,
  description TEXT,
)