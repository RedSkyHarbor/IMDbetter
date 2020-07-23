import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AllMovies extends Component {
    constructor(props) {
        super(props);
        this.state = { movies: [] };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        fetch('/api')
            .then(response => response.json())
                .then(movies => this.setState({ movies }));
    }

    handleChange(event) {
        /* Handles partial searches */
        let { value } = event.target;
        if (value.length === 0){ 
            fetch('/api')
            .then(response => response.json())
                .then(movies => this.setState({ movies }));
        } else if (value.length > 0) {
            fetch('/api/fuzzysearch/' + value)
                .then(res => res.json())
                    .then(movies => this.setState({ movies }));
        }
    }

    render() {
        const { movies } = this.state;
        return (
            <div>
                <input type='text' placeholder='Search IMDbetter' onChange={this.handleChange} />
                <ul>
                    { movies.map(movie =>
                        <li key={movie.id}>
                            <h1><Link to={{
                                pathname: `/movie/${movie.slug}`,
                                state: { movieId: movie.id }
                            }}>{movie.title}</Link></h1>
                            <img alt='movie poster' style={{ width: 200, height: 300 }} src={movie.picture_url} />
                            <p>{movie.summary}</p>
                            <p>{movie.rating}</p>
                            <p>{movie.release_year}</p>
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default AllMovies;