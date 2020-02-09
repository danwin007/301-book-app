DROP TABLE IF EXISTS books;

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title TEXT,
  author TEXT,
  isbn TEXT,
  image_url TEXT,
  description TEXT
);

INSERT INTO books
  (title, author, isbn, image_url, description)
VALUES
  ('TITLE', 'AUTHOR', 'ISBN','https://via.placeholder.com/150', 'BOOK DESCRIP');