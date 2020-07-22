CREATE TABLE movies (
	ID SERIAL PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	description VARCHAR(511) NOT NULL,
	picture bytea,
	rating DOUBLE PRECISION NOT NULL,
	release_year INTEGER NOT NULL
);


INSERT INTO movies (title, description, rating, release_year)
VALUES ('Spaceballs', 'A star pilot and his sidekick must come to the rescue of a Princess and save the galaxy from a ruthless race of beings known as Spaceballs.', 7.1, 1987);

INSERT INTO movies (title, description, rating, release_year)
VALUES ('Young Frankenstein', 'An American grandson of the infamous scientist, struggling to prove that his grandfather was not as insane as people believe, is invited to Transylvania, where he discovers the process that reanimates a dead body.', 8.0, 1974);
