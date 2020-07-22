import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';

import './App.css';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={HomePage} />
				<Route path='/movie/:id' component={MoviePage} />
			</Switch>
		</Router>
	)
}

export default App;