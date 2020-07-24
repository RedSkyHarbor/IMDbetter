import React, { Component } from 'react';

import Header from '../components/header/Header';
import AllMovies from '../components/AllMovies';

class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {};

    }
    
    render() {
        return(
            <div>
                <Header />
                <h1>Logged status: {this.props.loggedInStatus}</h1>
                <AllMovies />
            </div>
        );
    }
}

export default HomePage;