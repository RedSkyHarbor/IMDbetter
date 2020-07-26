const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const { pool } = require('./config');

const port = process.env.PORT || 5000;
const app = express();

// Serve static files from the React application
app.use(express.static(path.join(__dirname, 'client/build')));

// Use middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(cookieParser());

// Configuration for all cookies
const cookieConfig = {
	httpOnly: false,
	sameSite: 'lax',
}

// API endpoints
const getAllMovies = (request, response) => {
	pool.query('SELECT * FROM movies', (error, results) => {
		if (error) {
			throw error;
		}
		//TODO maybe dont need this but was tryiung to get avg rating
		/*
		console.log('All movies',results.rows);
		pool.query('SELECT * FROM movie_ratings', (error, results) => {
			if (error) {
				throw error;
			}
			console.log('All reviews', results.rows);
		})
		*/
		response.status(200).json(results.rows);
	});
}

const getMovieById = (request, response) => {
	const movieId = parseInt(request.params.id);
	pool.query('SELECT * FROM movies WHERE id = $1', [movieId], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
}

const getMovieByPartialTitle = (request, response) => {
	const partialTitle = request.params.substring;
	pool.query('SELECT * FROM movies WHERE title ILIKE $1', ['%'+partialTitle+'%'], (error, results) => {
		if (error) {
			throw error
		}
		response.status(200).json(results.rows);
	});
}

const getComments = (requests, response) => {
	const movieId = parseInt(requests.params.id);
	pool.query('SELECT * FROM comments WHERE movieid = $1', [movieId], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
}

// TODO enforce only allowing unique usernames and passwords
const createAccount = (request, response) => {
	const { username, password, email, is_admin } = request.body.user;
	pool.query('INSERT INTO users (uname, pword, email) VALUES ($1, $2, $3)', [username, password, email], (error, results) => {
		if (error) {
			throw error;
		}
	});
	// query again to get userID to add to cookie
	// this is a stupid way to do it, better solution is currval()
	pool.query('SELECT max(ID) from users', (error, results) => {
		if (error) {
			throw error;
		}
		//console.log(results.rows);
		let userId = parseInt(results.rows[0].max) + 1
		let cookieData = username + '-' + userId; // so stupid
		response.cookie('userLoggedIn', cookieData, cookieConfig).status(201).send(results);
	});
}

const login = (request, response) => {
	const { username, password, is_admin } = request.body.user;
	if (is_admin) {
		pool.query('SELECT * FROM users WHERE uname=$1 AND pword=$2 AND is_admin=$3', [username, password, is_admin], (error, results) => {
			if (error) {
				throw error;
			}
			if (results.rows.length > 0){
				let cookieData = username + '-' + results.rows[0].id;
				response.cookie('adminLoggedIn', cookieData, cookieConfig).status(200).send(results.rows.length.toString());
			} else {
				response.status(401).send('Admin account not found');
			}
		})
	} else {
		pool.query('SELECT * FROM users WHERE uname=$1 AND pword=$2 AND is_admin=$3', [username, password, is_admin], (error, results) => {
			if (error){
				throw error;
			}
			if (results.rows.length > 0){
				let cookieData = username + '-' + results.rows[0].id;
				response.cookie('userLoggedIn', cookieData, cookieConfig).status(200).send(results.rows.length.toString());
			} else {
				response.status(401).send('User account not found');
			}
		});
	}
}

const checkIfLoggedIn = (request, response) => {
	/* Return same cookie stored in browser otherwise return 'no cookie' */
	if (request.cookies.userLoggedIn) {
		response.send(request.cookies.userLoggedIn);
	} else if (request.cookies.adminLoggedIn){
		response.send(request.cookies.adminLoggedIn);
	} else {
		response.send('no cookie');
	}
}

const submitReview = (request, response) => {
	const { review, rating, movieId } = request.body.comment;
	const cookie = request.cookies.userLoggedIn || request.cookies.adminLoggedIn;
	const [ username, userId ] = cookie.split('-');
	let avg_rating = 0;


	console.log('movieid', movieId, 'userid', userId);

	pool.query('SELECT COUNT(*) FROM comments WHERE movieId=$1 and userId=$2', [movieId, userId], (error, results) => {
		if (error) {
			throw error;
		}
		
		console.log('COUNT results',results.rows[0].count);
		if (results.rows[0].count == 0) {
			pool.query('INSERT INTO comments (movieId, userId, comment, rating) VALUES ($1, $2, $3, $4)', [movieId, userId, review, rating], (error, results) => {
				if (error) {
					throw error;
				}

				pool.query('INSERT INTO movie_ratings (movieId, userId, rating) VALUES ($1, $2, $3)', [movieId, userId, rating], (error, results) => {
					if (error) {
						throw error;
					}

					pool.query('SELECT COUNT(*), SUM(rating) FROM movie_ratings WHERE movieId=$1', [movieId], (error, results) => {
						if (error) {
							throw error;
						}

						console.log(results.rows);
						let num_reviews = results.rows[0].count;
						let sum_ratings = results.rows[0].sum;
						avg_rating = sum_ratings / num_reviews;

						pool.query('UPDATE movies SET avg_rating=$1 WHERE id=$2', [avg_rating, movieId], (error, results) => {
							if (error) {
								throw error;
							}
						});				
					});
				});
			});
		} else {
			response.status(405);
		}
	});

}

const checkIfFirstReview = (request, response) => {
	const { movieId } = request.body.review;
	const cookie = request.cookies.userLoggedIn || request.cookies.adminLoggedIn;
	const [ userId ] = cookie.split('-')[1];

	pool.query('SELECT COUNT(*) FROM comments WHERE movieId=$1 and userId=$2', [movieId, userId], (error, results) => {
		if (error) {
			throw error;
		}
		response.status('200').send(results.rows[0].count);
	});
}

const insert_movie = (request, response) => {
	const { title, summary, release_year, image_url } = request.body.movie;
	let slug = title.replace(/\s+/g, '-').toLowerCase();
	pool.query('INSERT INTO movies (title, slug, summary, release_year, picture_url) VALUES ($1, $2, $3, $4, $5)', [title, slug, summary, release_year, image_url], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(204).send('movie inserted');
	});
}

const logout = (request, response) => {
	response.clearCookie('userLoggedIn');
	response.clearCookie('adminLoggedIn');
	return response.sendStatus(200);
}

const getReview = (request, response) => {
	const { movieId } = request.body.comment;
	const cookie = request.cookies.userLoggedIn || request.cookies.adminLoggedIn;
	const userId  = cookie.split('-')[1];

	pool.query('SELECT comment, rating FROM comments WHERE userId=$1 AND movieId=2', [userId, movieId], (error, results) => {
		if (error) {
			throw error;
		}
		console.log(results.rows);
	})
}

app.route('/api').get(getAllMovies)
app.route('/api/movie/:id').get(getMovieById)
app.route('/api/comments/:id').get(getComments)
app.route('/api/fuzzysearch/:substring').get(getMovieByPartialTitle)
app.route('/api/registration').post(createAccount)
app.route('/api/sessions').post(login)
app.route('/api/logged_in/').get(checkIfLoggedIn)
app.route('/api/logout').delete(logout)
app.route('/api/insert_movie').post(insert_movie)

app.route('/api/review/check').post(checkIfFirstReview)
app.route('/api/review/create').post(submitReview)
app.route('/api/review/get_review').post(getReview)

// Starts server
app.listen(port, () => {
	console.log(`Express server is listening on port ${port}`);
});
