import React, { Component} from 'react';
import axios from 'axios';

class UserReviews extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            comments: [],
            review : '',
            rating: 1
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
        console.log(review, rating);
        axios
            .post('/api/review', {
                comment: {
                    review: review,
                    rating: rating,
                    movieId: localStorage.getItem('movieId')
                }
            },
            { withCredentials: true }
        )
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log('submit review err', err);
        })
        event.preventDefault();
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    // TODO check if userId already has a comment with this movieId, this.props.movieId
    // TODO comment must be editable

    render() {
        const { comments } = this.state;
        const loggedIn = this.props.loggedInStatus === "LOGGED_IN" ? true : false;
        console.log('logged in', loggedIn)
        return (
            <div>
                <h3>User Reviews</h3>
                <form style={{ display: loggedIn ? 'block' : 'none' }} onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Review this movie</legend>
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