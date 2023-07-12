CREATE TABLE blogs(
    id SERIAL PRIMARY KEY,
    author VARCHAR(50),
    url VARCHAR(100) NOT NULL,
    title VARCHAR(50) NOT NULL,
    likes INTEGER DEFAULT 0
);

INSERT INTO blogs(author, url, title, likes) VALUES('Bill Jones', 'http://billyjones.com/blogpost', 'My latest blog', 10);
INSERT INTO blogs(author, url, title) VALUES('Bobby Jones', 'http://bobbyjones.com/blogpost', 'My oldest blog');