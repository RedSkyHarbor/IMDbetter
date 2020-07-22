import React from 'react';

import Movie from '../components/Movie';

const MoviePage = ({ match }) => {
    let { id } = match.params; 
    return (
        <div>
            <Movie movieId={id} />
            <p>comment section / user reviews</p>
        </div>
    );
}

export default MoviePage;