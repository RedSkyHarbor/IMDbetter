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

// Testing endpoint
app.get('/hello', (req, res) => {
	res.json({ info: 'Hello World!' });
});

// API endpoints
const getAllMovies = (request, response) => {
	pool.query('SELECT * FROM movies', (error, results) => {
		if (error) {
			throw error;
		}
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
	console.log('createAccount');
	const { username, password, email } = request.body.user;
	pool.query('INSERT INTO users (uname, pword, email) VALUES ($1, $2, $3)', [username, password, email], (error, results) => {
		if (error) {
			throw error;
		}
		response.cookie('userLoggedIn', username, cookieConfig).status(201).send(results);
	});
}


const login = (request, response) => {
	const { username, password, is_admin } = request.body.user;

	if (is_admin) {
		console.log('admin login');
		pool.query('SELECT * FROM users WHERE uname=$1 AND pword=$2 AND is_admin=$3', [username, password, is_admin], (error, results) => {
			if (error) {
				throw error;
			}
			if (results.rows.length > 0){
				response.cookie('adminLoggedIn', username, cookieConfig).status(200).send(results.rows.length.toString());
			} else {
				response.status(401).send('Admin account not found');
			}
		})
		
	} else {
		console.log('user login');
		pool.query('SELECT * FROM users WHERE uname=$1 AND pword=$2 AND is_admin=$3', [username, password, is_admin], (error, results) => {
			if (error){
				throw error;
			}
			if (results.rows.length > 0){
				response.cookie('userLoggedIn', username, cookieConfig).status(200).send(results.rows.length.toString());
			} else {
				response.status(401).send('User account not found');
			}
		});
	}
}

const checkIfLoggedIn = (request, response) => {
	console.log('checkIfLoggedIn');
	const cookie = request.cookies.userLoggedIn || request.cookies.adminLoggedIn;
	if (cookie) {
		response.send(cookie);
	} else {
		response.send('no cookie');
	}
}

const logout = (request, response) => {
	console.log('logout');
	response.clearCookie('userLoggedIn');
	response.clearCookie('adminLoggedIn');
	return response.sendStatus(200);
}

// Any request that matches none of the above endpoints returns React application's index page

// for prod

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'))
	if (err) {
		res.status(500).send(err)
	}
})

// For local v
/*
app.get('*', (req, res) => {
	res.sendfile(path.join(__dirname + '/public/index.html'));
});
*/

app.route('/api')
	.get(getAllMovies)

app.route('/api/movie/:id')
	.get(getMovieById)

app.route('/api/comments/:id')
	.get(getComments)

app.route('/api/fuzzysearch/:substring')
	.get(getMovieByPartialTitle)

app.route('/api/registration')
	.post(createAccount)

app.route('/api/sessions')
	.post(login)

app.route('/api/logged_in/')
	.get(checkIfLoggedIn)

app.route('/api/logout')
	.delete(logout)

// Starts server
app.listen(port, () => {
	console.log(`Express server is listening on port ${port}`);
});
