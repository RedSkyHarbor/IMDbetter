const express = require('express');
const path = require('path');
const { pool } = require('./config');
const port = 5000;

const app = express();

// Serve static files from the React application
app.use(express.static(path.join(__dirname, 'client/build')));

// Testing endpoint
app.get('/hello', (req, res) => {
	res.json({ info: 'Hello World!' });
});

// API endpoints
const getMovies = (request, response) => {
	pool.query('SELECT * from movies', (error, results) => {
		if (error) {
			throw error
		}
		response.status(200).json(results.rows)
	})
}

// Any request that matches none of the above endpoints returns React application's index page
//app.get('*', (req, res) => {
//	res.sendFile(path.join(__dirname + '/client/build/index.html'));
//});

app.route('/api')
	.get(getMovies)


// Starts server
app.listen(port, () => {
	console.log(`Express server is listening on port ${port}`);
});
