import React, { Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class UserReviews extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            comments: [],
            review : '',
            rating: 1,
            res_message: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        fetch('/api/comments/' + this.props.movieId)
            .then(res => res.json())
                .then(comments => this.setState({ comments }));
    }

    handleSubmit = (event) => {
        const { review, rating } = this.state;
        axios
            .post('/api/review/create', {
                comment: {
                    review: review,
                    rating: rating,
                    movieId: localStorage.getItem('movieId')
                }
            },
            { withCredentials: true }
        )
        .then(res => {
            // refresh comments immediately
            this.setState({ res_message: 'Thank you for your review' });
            fetch('/api/comments/' + this.props.movieId)
            .then(res => res.json())
                .then(comments => this.setState({ comments }));
        })
        .catch(err => {
            this.setState({ res_message: 'You have already submit a review for this movie' });
            console.log('submit review err', err);
        })
        event.preventDefault();

    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const { comments } = this.state;
        const loggedIn = this.props.loggedInStatus === "LOGGED_IN" ? true : false;
        return (
            <div>
                <div style={{ display: loggedIn ? 'block' : 'none' }}>
                        <form onSubmit={this.handleSubmit}>
                        <fieldset>
                            <legend>Review this movie</legend>
                            <div>{this.state.res_message}</div>
                            <ul>
                                <li>
                                    <label htmlFor='review'>Review:</label>
                                    <textarea type='text' name='review' onChange={this.handleChange} required />
                                </li>
                                <li>
                                    <select name='rating' onChange={this.handleChange}>
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                        <option value='4'>4</option>
                                        <option value='5'>5</option>
                                        <option value='6'>6</option>
                                        <option value='7'>7</option>
                                        <option value='8'>8</option>
                                        <option value='9'>9</option>
                                        <option value='10'>10</option>
                                    </select>
                                </li>
                                <li>
                                    <button type='submit'>Submit Review</button>
                                </li>
                            </ul>
                        </fieldset>
                    </form>
                </div>
                
                <div style={{ display: loggedIn ? 'none' : 'Block' }}>
                    <p>Want to leave a review?</p>
                    <Link to='/registration'>Log in or create an account</Link>
                </div>
                <h3>User Reviews</h3>
                <ul>
                    { comments.map(comment => 
                    <li key={comment.id}>
                        <p>Rated {comment.rating} out of 10</p>
                        <p>{comment.comment}</p>
                    </li> 
                    )}
                </ul>
            </div>
        );
    }
}

export default UserReviews;