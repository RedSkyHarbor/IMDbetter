import React, { Component } from 'react';

import Movie from '../components/Movie';
import UserReviews from '../components/UserReviews';

class MoviePage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    // When page refreshes the props and state are lost
    // So on initial load of the page the movieId is sent to this component via props
    // but when page reloads the props are empty
    //solution: ????????? persist in local storage??? use express? 
    // Do a similar thing as maintaining logged in state?

    render() {
        let { movieId } = this.props.location.state;
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