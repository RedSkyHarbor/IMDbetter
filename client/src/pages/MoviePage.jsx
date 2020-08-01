import React, { Component } from 'react';
//import axios from 'axios';

import Movie from '../components/Movie';
import UserReviews from '../components/UserReviews';
import './pages.scss'

class MoviePage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    


    render() {
        let movieId = localStorage.getItem('movieId');
        return (
            <div className='content'>
                <div className='container'>
                    <Movie movieId={movieId} />
                    <UserReviews
                        movieId={movieId}
                        loggedInStatus={this.props.loggedInStatus}
                    />
                </div>
            </div>
        );
    }
}

export default MoviePage;