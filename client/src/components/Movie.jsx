import React, { Component } from 'react';

class Movie extends Component {
    state = { data: [] };
    

    componentDidMount(){
        let movieId = this.props.movieId;
        console.log(movieId);
        fetch('/api/movie/' + movieId)
            .then(response => response.json())
                .then(data => this.setState({ data }))
    }

    render() { 
        return (
            <>
            {this.state.data.map(d =>
                <div key={d.id}>
                    <h1>Title: {d.title}</h1>
                    <img style={{ width: 200, height: 300 }} src={d.picture_url} />
                    <p>Description: {d.summary}</p>
                    <p>Rating: {d.rating}</p>
                    <p>Release in: {d.release_year}</p>    
                </div>  
            )}
            </>
        );
    }
}

export default Movie;