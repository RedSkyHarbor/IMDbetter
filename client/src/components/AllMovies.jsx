import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './AllMovies.module.scss';

class AllMovies extends Component {
    constructor(props) {
        super(props);
        this.state = { movies: [] };
        this.handleChange = this.handleChange.bind(this);
        this.addMovieIdToLocalStorage = this.addMovieIdToLocalStorage.bind(this);
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

    addMovieIdToLocalStorage = (id) => {
        localStorage.setItem('movieId', id);
    }

    render() {
        const { movies } = this.state;
        return (
            <div className={styles.all_movies}>
                <input className={styles.search} type='text' placeholder='Search IMDbetter' onChange={this.handleChange} />
                <div className={styles.movies_container}>
                        { movies.map(movie =>
                            <div className={styles.movie} key={movie.id}>
                                <img className={styles.poster} alt='movie poster' src={movie.picture_url} />
                                <p className={styles.rating}>
                                    <i style={{color: 'gold'}} class="fas fa-star"></i>
                                    {movie.avg_rating ? ` ${movie.avg_rating.toString().substr(0,3)}` : ' No user reviews yet'}
                                </p>
                                    <NavLink
                                        className={styles.title}
                                        onClick={() => this.addMovieIdToLocalStorage(movie.id)}
                                        to={{pathname: `/movie/${movie.slug}`}}
                                        >
                                            {movie.title}
                                    </NavLink>
                            </div>
                        )}
                </div>
            </div>
        );
    }
}

export default AllMovies;