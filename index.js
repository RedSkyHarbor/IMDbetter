const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// API endpoints
app.get('/', (req, res) => {
	res.json({ info: 'Hello World!'})
});

app.listen(port, () => {
	console.log(`Express server is listening on port ${port}`);
});
