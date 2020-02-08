DROP TABLE IF EXISTS books;

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title TEXT,
  author TEXT,
  isbn NUMBER,
  image_url TEXT,
  description TEXT
)