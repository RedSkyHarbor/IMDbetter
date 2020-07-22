const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { pool } = require('./config');
const port = process.env.PORT || 5000;

const app = express();

// Serve static files from the React application
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

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
	})
}

const getMovieById = (request, response) => {
	const movieId = parseInt(request.params.id);
	pool.query('SELECT * FROM movies WHERE id = $1', [movieId], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	})
}

// Any request that matches none of the above endpoints returns React application's index page
//app.get('*', (req, res) => {
//	res.sendFile(path.join(__dirname + '/client/build/index.html'));
//});

app.route('/api')
	.get(getAllMovies)

app.route('/api/movie/:id')
	.get(getMovieById)


// Starts server
app.listen(port, () => {
	console.log(`Express server is listening on port ${port}`);
});
