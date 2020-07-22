import React, { Component} from 'react';

class UserReviews extends Component {
    constructor(props) {
        super(props);
        this.state = { comments: [] }
    }

    componentDidMount() {
        fetch('/api/comments/' + this.props.movieId)
            .then(res => res.json())
                .then(comments => this.setState({ comments }));
    }

    render() {
        const { comments } = this.state;
        return (
            <div>
                <h3>User Reviews</h3>
                <ul>
                    { comments.map(comment => 
                    <li key={comment.id}>
                        <p>Rated {comment.rating} out of 10</p>
                        <p>{comment.created.substr(0,10)}</p>
                        <p>{comment.comment}</p>
                    </li> 
                    )}
                </ul>
            </div>
        );
    }
}

export default UserReviews;