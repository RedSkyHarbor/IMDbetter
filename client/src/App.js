import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import axios from 'axios';

import Header from './components/header/Header';
import HomePage from './pages/HomePage';
import MoviePage from './pages/MoviePage';
import UserAuthPage from './pages/UserAuthPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

import './App.scss';

class App extends Component {
	constructor() {
		super();
		this.state = {
			loggedInStatus: 'NOT_LOGGED_IN',
			user: {}
		}
		this.handleLogin = this.handleLogin.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}

	componentDidMount() {
		this.checkLoginStatus();
	}

	checkLoginStatus = () => {		
		axios.get('/api/logged_in/', { withCredentials: true })
		.then(res => {
			if (res.data !== 'no cookie' && this.state.loggedInStatus === 'NOT_LOGGED_IN') {
				this.setState({
					loggedInStatus: 'LOGGED_IN',
					user: { username: res.data },
				});
			}
		})
		.catch(err => {
			console.log('logged in cookie error', err);
		});
		
	}

	handleLogin = (data) => {
		this.setState({
			loggedInStatus: "LOGGED_IN",
			user: data
		});
	}

	handleLogout = () => {
		this.setState({
			loggedInStatus: "NOT_LOGGED_IN",
			user: {}
		});
		window.location.replace('/');
	}

	render() {
		return (
			<Router>
				<Header handleLogout={this.handleLogout}/>
				<Switch>
					<Route 
						exact 
						path='/' 
						render={props => (
							<HomePage 
								{...props} 
								loggedInStatus={this.state.loggedInStatus} 
							/>
						)}
					/>
					<Route
						path='/movie/:slug' 
						render={props => (
							<MoviePage
								{...props} 
								loggedInStatus={this.state.loggedInStatus} 
							/>
						)}
					/>
					<Route 
						path='/registration' 
						render={props => (
							<UserAuthPage 
								{...props} 
								handleLogin={this.handleLogin}
								loggedInStatus={this.state.loggedInStatus} 
							/>
						)}
					/>
					<Route 
						path='/admin/dashboard'
						render={props => (
							<AdminDashboardPage 
								{...props}
								loggedInStatus={this.state.loggedInStatus}
							/>
						)}
					/>
					<Route 
						path='/admin'
						render={props => (
							<AdminLoginPage
								{...props}
								handleLogin={this.handleLogin}
								loggedInStatus={this.state.loggedInStatus}
							/>
						)}
						
					/>

				</Switch>
			</Router>
		)
	}
}

export default App;