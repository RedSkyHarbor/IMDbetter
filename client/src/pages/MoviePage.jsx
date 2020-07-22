import React from 'react';

import Movie from '../components/Movie';
import UserReviews from '../components/UserReviews';

const MoviePage = ({ location }) => {
    let { movieId } = location.state; 
    return (
        <div>
            <Movie movieId={movieId} />
            <UserReviews movieId={movieId} />
        </div>
    );
}

export default MoviePage;