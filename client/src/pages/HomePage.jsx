import React, { Component } from 'react';

import AllMovies from '../components/AllMovies';

class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {};

    }
    
    render() {
        return(
            <div className='container'>
                <AllMovies />
            </div>
        );
    }
}

export default HomePage;