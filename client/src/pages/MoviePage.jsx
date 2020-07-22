import React from 'react';

import Movie from '../components/Movie';

const MoviePage = ({ location }) => {
    let { movieId } = location.state; 
    return (
        <div>
            <Movie movieId={movieId} />
            <p>comment section / user reviews</p>
        </div>
    );
}

export default MoviePage;