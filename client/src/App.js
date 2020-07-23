import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import UserAuthPage from './pages/UserAuthPage';
import AdminLoginPage from './pages/AdminLoginPage';

import './App.css';

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path='/' component={HomePage} />
				<Route path='/movie/:slug' component={MoviePage} />
				<Route path='/registration' component={UserAuthPage} />
				<Route path='/admin' component={AdminLoginPage} />
			</Switch>
		</Router>
	)
}

export default App;