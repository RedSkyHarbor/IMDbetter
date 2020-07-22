import React, { Component } from 'react';
import './App.css';

class App extends Component {
	state = { response: {} }
  
	componentDidMount() {
		this.getInfo();
	}

	getInfo = () => {
		fetch('/hello')
		  .then(res => res.json())
			  .then(response => this.setState({ response }));
	}

	render(){
		const { response } = this.state;
		return (
			<div className="App">
				<header className="App-header">
					<p>test</p>
					<p>{ response.info }</p>
				</header>
			</div>
		);
	}
}

export default App;
