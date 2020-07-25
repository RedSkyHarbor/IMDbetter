import React, { Component } from 'react';
import axios from 'axios';

class AdminDashboardPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            summary: '',
            image_url: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // TODO post request here
    handleSubmit = (event) => {
        const { title, summary, image_url } = this.state;
        console.log('handle submit', title, summary, image_url);
        event.preventDefault();
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        });
    }

    render () {
        return (
            <div>
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