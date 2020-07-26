/* Movies */ 
CREATE TABLE movies (
	ID SERIAL PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	slug VARCHAR(255) NOT NULL,
	summary VARCHAR(511) NOT NULL,
	release_year INTEGER NOT NULL,
	avg_rating DOUBLE PRECISION DEFAULT NULL,
	picture_url VARCHAR(255) NOT NULL
);

/* Users */ 
CREATE TABLE users (
	ID SERIAL PRIMARY KEY,
	uname VARCHAR(255) NOT NULL,
	pword VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	is_admin BOOLEAN DEFAULT FALSE
);

/* comments */
CREATE TABLE comments (
	ID SERIAL PRIMARY KEY,
	movieID INTEGER REFERENCES movies(ID) NOT NULL,
	userID INTEGER REFERENCES users(ID) NOT NULL,
	comment VARCHAR(2055) NOT NULL,
	rating DOUBLE PRECISION NOT NULL
);

/* movie ratings */
CREATE TABLE movie_ratings (
	ID SERIAL PRIMARY KEY,
	movieID INTEGER REFERENCES movies(ID) NOT NULL,
	userID INTEGER REFERENCES users(ID) NOT NULL,
	rating DOUBLE PRECISION NOT NULL
);

/* Users */ 
INSERT INTO users (uname, pword, email, is_admin) VALUES ('admin', 'admin', 'admin@gmail.com', TRUE);
