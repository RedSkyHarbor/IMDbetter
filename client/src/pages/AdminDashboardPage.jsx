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
            release_year: '',
            image_url: '',
            response: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearForm = this.clearForm.bind(this);
    }

    clearForm = () => {
        document.getElementById('insert-movie-form').reset();
    }

    handleSubmit = (event) => {
        const { title, summary, release_year, image_url } = this.state;
        axios  
            .post('/api/insert_movie', {
                movie: {
                    title: title,
                    summary: summary,
                    release_year: release_year,
                    image_url: image_url
                }
            },
            { withCredentials: true}
        )
        .then(res => {
            if (res.status === 204) {
                this.setState({ response: 'Movie inserted successfully' })
               this.clearForm();
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
                <form id='insert-movie-form' onSubmit={this.handleSubmit}>
                    <li>
                        <label htmlFor='title'>Title</label>
                        <input type='text' name='title' onChange={this.handleChange} required></input>
                    </li>
                    <li>
                        <label htmlFor='summary'>Summary</label>
                        <textarea type='text' name='summary' onChange={this.handleChange} required></textarea>
                    </li>
                    <li>
                        <label htmlFor='release_year'>Year Released</label>
                        <input type='text' name='release_year' onChange={this.handleChange} required></input>
                    </li>
                    <li>
                        <label htmlFor='image_url'>Image</label>
                        <input type='text' name='image_url' onChange={this.handleChange} required></input>
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