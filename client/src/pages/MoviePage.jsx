import React, { Component } from 'react';

import Movie from '../components/Movie';
import UserReviews from '../components/UserReviews';

// TODO doesnt need to be a stateful component
class MoviePage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    render() {
        let movieId = localStorage.getItem('movieId');
        return (
            <div>
                <h1>Logged status: {this.props.loggedInStatus}</h1>
                <Movie movieId={movieId} />
                <UserReviews movieId={movieId} />
            </div>
        );
    }
}

export default MoviePage;