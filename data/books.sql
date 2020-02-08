DROP TABLE IF EXISTS books;

CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title TEXT,
  author TEXT,
  isbn NUMBER,
  image_url TEXT,
  description TEXT
);

INSERT INTO books
  (title, author, isbn, image_url, description)
VALUES
  ('TITLE', 'AUTHOR', 'ISBN','https://img.clipartlook.com/book-20clipart-clip-art-of-a-book-1754_1240.jpg', 'BOOK DESCRIP')