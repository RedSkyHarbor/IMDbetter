import React, { Component } from 'react';

class AllMovies extends Component {
    state = { movies: [] }

    componentDidMount() {
        fetch('/api')
            .then(response => response.json())
                .then(movies => this.setState({ movies }));
    }

    render() {
        const { movies } = this.state;
        return (
            <ul>
                { movies.map(movie =>
                    <li key={movie.id}>
                        <h1>{movie.title}</h1>
                        <p>{movie.description}</p>
                        <p>{movie.rating}</p>
                        <p>{movie.release_year}</p>
                    </li>
                )}
            </ul>
        );
    }
}

export default AllMovies;