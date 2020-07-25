import React, { Component } from 'react';
import axios from 'axios';

//TODO only accessible with admin cookie MUST BE LOCKED BEHIND THAT LOGIN
//send data to backend with axios
class AdminDashboardPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            summary: '',
            image_url: '',
            response: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // TODO post request here
    handleSubmit = (event) => {
        const { title, summary, image_url } = this.state;
        console.log('handle submit', title, summary, image_url);
        axios  
            .post('/api/insert_movie', {
                movie: {
                    title: title,
                    summary: summary,
                    image_url: image_url
                }
            },
            { withCredentials: true}
        )
        .then(res => {
            if (res.status === 204) {
                this.setState({ response: 'Movie inserted successfully'})
            }
        })
        .catch(err => {
            console.log('insert movie err', err);
            this.setState({ response: 'Error while inserting movie' })
        })
        event.preventDefault();
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    render () {
        let { response } = this.state;
        return (
            <div>
                <h2>{response}</h2>
                <form onSubmit={this.handleSubmit}>
                    <li>
                        <label htmlFor='title'>Title</label>
                        <input type='text' name='title' onChange={this.handleChange}></input>
                    </li>
                    <li>
                        <label htmlFor='summary'>Summary</label>
                        <input type='text' name='summary' onChange={this.handleChange}></input>
                    </li>
                    <li>
                        <label htmlFor='image_url'>Image</label>
                        <input type='text' name='image_url' onChange={this.handleChange}></input>
                    </li>
                    <li>
                        <button type='submit'>Add movie</button>
                    </li>
                </form>
            </div>
        )
    }
}

export default AdminDashboardPage;