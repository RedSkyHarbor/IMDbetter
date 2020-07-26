import React, { Component } from 'react';
//import axios from 'axios';

import Movie from '../components/Movie';
import UserReviews from '../components/UserReviews';

// TODO check if reviewed already here
class MoviePage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        //this.getReview = this.getReview.bind(this);
        //this.updateReview = this.updateReview.bind(this);
        //this.checkIfFirstReview = this.checkIfFirstReview.bind(this);
    }
    
    /*
    componentDidMount(){
        if (this.props.loggedInStatus === 'LOGGED_IN') {
            this.checkIfFirstReview();
        }
    }

    checkIfFirstReview = () => {
        axios
            .post('/api/review/check', {
                review: {
                    movieId: localStorage.getItem('movieId')
                }
            },
            { withCredentials: true }
        )
        .then(res => {
            console.log(res);
            this.setState({
                num_reviews: res.data
            })
        })
        .catch(err => {
            console.log('checkIfFirstReview', err);
        })
    }

    getReview = () => {
        console.log('getReview called');
        axios
            .post('/api/review/get_review', {
                comment: {
                    movieId: localStorage.getItem('movieId')
                }
            },
            { withCredentials: true }
        )
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log('getReview error', err);
        })
    }

    updateReview = () => {

    }
    */

    render() {
        let movieId = localStorage.getItem('movieId');
        return (
            <div className='container'>
                <h1>Logged status: {this.props.loggedInStatus}</h1>
                <Movie movieId={movieId} />
                <UserReviews
                    movieId={movieId}
                    loggedInStatus={this.props.loggedInStatus}
                />
            </div>
        );
    }
}

export default MoviePage;