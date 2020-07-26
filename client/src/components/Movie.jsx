import React, { Component } from 'react';

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
            <>
                {this.state.data.map(d =>
                    <div key={d.id}>
                        <img alt='movie poster' style={{ width: 200, height: 300 }} src={d.picture_url} />
                        <h1>{d.title}</h1>
                        <p>({d.release_year})</p>
                        <p>{d.avg_rating ? `Average rating: ${d.avg_rating} out of 10` : 'No user reviews yet'}</p>
                        <p>{d.summary}</p>
                    </div>  
                )}
            </>
        );
    }
}

export default Movie;