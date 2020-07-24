import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import UserAuthPage from './pages/UserAuthPage';
import AdminLoginPage from './pages/AdminLoginPage';

import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			loggedInStatus: 'NOT_LOGGED_IN',
			user: {}
		}
		this.handleLogin = this.handleLogin.bind(this);
	}

	handleLogin = (data) => {
		this.setState({
			loggedInStatus: "LOGGED_IN",
			user: data
		});
	}

	render() {
		return (
			<Router>
				<Switch>
					<Route 
						exact 
						path='/' 
						render={props => (
							<HomePage {...props} loggedInStatus={this.state.loggedInStatus} />
						)}
					/>
					<Route
						path='/movie/:slug' 
						render={props => (
							<MoviePage {...props} loggedInStatus={this.state.loggedInStatus} />
						)}
					/>
					<Route 
						path='/registration' 
						render={props => (
							<UserAuthPage {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} />
						)}
					/>
					<Route 
						path='/admin' 
						component={AdminLoginPage} 
					/>
				</Switch>
			</Router>
		)
	}
}

export default App;