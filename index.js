const express = require('express');
const path = require('path');
const port = process.env.PORT || 5000;

const app = express();

// Serve static files from the React application
app.use(express.static(path.join(__dirname, 'client/build')));

// API endpoints
app.get('/hello', (req, res) => {
	res.json({ info: 'Hello World!' });
});

// Any request that matches none of the above endpoints returns React application's index page
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(port, () => {
	console.log(`Express server is listening on port ${port}`);
});
