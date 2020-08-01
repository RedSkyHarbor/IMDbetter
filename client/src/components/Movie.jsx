import React, { Component } from 'react';
import styles from './Movie.module.scss';


class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }
    
    componentDidMount(){
        let movieId = this.props.movieId;
        fetch('/api/movie/' + movieId)
            .then(response => response.json())
                .then(data => this.setState({ data }));
    }

    render() { 
        return (
            <div className={styles.movie_container}>
                {this.state.data.map(d =>
                    <div className={styles.movie} key={d.id}>
                        <img className={styles.movie_poster} alt='movie poster' style={{ width: 200, height: 300 }} src={d.picture_url} />
                        <div className={styles.movie_details}>
                            <h1 className={styles.title}>{d.title}</h1>
                            <p className={styles.release}>({d.release_year})</p>
                            <p className={styles.rating}><i style={{color: 'gold'}} class="fas fa-star"></i>{d.avg_rating ? ` Average rating: ${d.avg_rating.toString().substr(0,3)} out of 10` : ' No user reviews yet'}</p>
                            <p className={styles.summary}>{d.summary}</p>
                        </div>
                    </div>  
                )}
            </div>
        );
    }
}

export default Movie;