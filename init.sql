DROP TABLE IF EXISTS movies CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS comments CASCADE;

/* Movies */ 
CREATE TABLE movies (
	ID SERIAL PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	slug VARCHAR(255) NOT NULL,
	summary VARCHAR(511) NOT NULL,
	rating DOUBLE PRECISION NOT NULL,
	release_year INTEGER NOT NULL,
	picture_url VARCHAR(255) NOT NULL
);

INSERT INTO movies (title, slug, summary, rating, release_year, picture_url)
VALUES ('Spaceballs', 'Spaceballs', 'A star pilot and his sidekick must come to the rescue of a Princess and save the galaxy from a ruthless race of beings known as Spaceballs.', 7.1, 1987, 'https://i.imgur.com/WJ4IcNG.jpg');

INSERT INTO movies (title, slug, summary, rating, release_year, picture_url)
VALUES ('Young Frankenstein', 'Young-Frankenstein', 'An American grandson of the infamous scientist, struggling to prove that his grandfather was not as insane as people believe, is invited to Transylvania, where he discovers the process that reanimates a dead body.', 8.0, 1974, 'https://i.imgur.com/hOg8EGj.jpg');

INSERT INTO movies (title, slug, summary, rating, release_year, picture_url)
VALUES ('Robin Hood: Men in Tights', 'Robin-Hood-Men-In-Tights', 'A spoof of Robin Hood in general, and Robin Hood: Prince of Thieves (1991) in particular.', 6.7, 1993, 'https://i.imgur.com/xe9mRUm.jpg');

INSERT INTO movies (title, slug, summary, rating, release_year, picture_url)
VALUES ('The Producers', 'The-Producers', 'A stage-play producer devises a plan to make money by producing a sure-fire flop.', 7.6, 1967, 'https://i.imgur.com/twgL1fA.jpg');

/* Users */ 
CREATE TABLE users (
	ID SERIAL PRIMARY KEY,
	uname VARCHAR(255) NOT NULL,
	pword VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	is_admin BOOLEAN DEFAULT FALSE
);

INSERT INTO users (uname, pword, email)
VALUES ('Jesse', 'jesse123', 'PenelloJ2@gmail.com');

INSERT INTO users (uname, pword, email, is_admin)
VALUES ('TechFlex', 'adminaccount', 'admin@TechFlex.com', TRUE);

/* Comments */
CREATE TABLE comments (
	ID SERIAL PRIMARY KEY,
	movieID INTEGER REFERENCES movies(ID),
	userID INTEGER REFERENCES users(ID),
	comment VARCHAR(2055) NOT NULL,
	rating DOUBLE PRECISION NOT NULL,
	created TIMESTAMP NOT NULL
);

INSERT INTO comments (movieID, userID, comment, rating, created)
VALUES (1, 1, 'One of my favorites - better than star wars itself', 9.0, current_timestamp);

INSERT INTO comments (movieID, userID, comment, rating, created)
VALUES (2, 1, 'A funny remake of the classic story of Frankenstein', 8.5, current_timestamp);

INSERT INTO comments (movieID, userID, comment, rating, created)
VALUES (3, 1, 'Not the best but still better then twilight', 6.5, current_timestamp);

INSERT INTO comments (movieID, userID, comment, rating, created)
VALUES (4, 1, 'I prefer the remake that came out in 2005, still funny though', 6, current_timestamp);