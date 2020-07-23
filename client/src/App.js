import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import RegistrationPage from './pages/RegistrationPage';


import './App.css';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={HomePage} />
				<Route path='/movie/:slug' component={MoviePage} />
				<Route path='/registration' component={RegistrationPage} />
			</Switch>
		</Router>
	)
}

export default App;