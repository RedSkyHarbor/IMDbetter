import React, { Component } from 'react';
import './pages.scss';

import AllMovies from '../components/AllMovies';

class HomePage extends Component {
    constructor(props){
        super(props);
        this.state = {};

    }
    
    render() {
        return(
            <div className='content'>
                <div className='container'>
                    <AllMovies />
                </div>
            </div>
        );
    }
}

export default HomePage;