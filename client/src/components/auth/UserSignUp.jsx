import React, { Component } from 'react';
import axios from 'axios';

class UserSignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSwitchView = (viewName) =>{
        this.props.onSelectView(viewName);
    }

    handleSubmit = (event) => {
        const { email, password, username } = this.state;
        console.log(username, password, email);
        axios.post('/api/registration', {
            user: {
                username: username,
                email: email,
                password: password
            }
        },
        { withCredentials: true }
        )
        

        console.log("form submitted");
        event.preventDefault();
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <fieldset>
                    <legend>Sign Up</legend>
                    <ul>
                        <li>
                            <label htmlFor='username'>Username:</label>
                            <input
                                type='text'
                                id='username' 
                                name='username' 
                                value={this.state.username}
                                onChange={this.handleChange}
                                required 
                            />
                        </li>
                        <li>
                            <label htmlFor='email'>Email:</label>
                            <input
                                type='email'
                                id='email' 
                                name='email' 
                                value={this.state.email}
                                onChange={this.handleChange}
                                required 
                            />
                        </li>
                        <li>
                            <label htmlFor='password'>Password:</label>
                            <input 
                                type='password' 
                                id='password' 
                                name='password'
                                value={this.state.password} 
                                onChange={this.handleChange}
                                required 
                            />
                        </li>
                        <li>
                            <button type='submit'>Register</button>
                            <button type='button' onClick={ () => this.handleSwitchView('login')}>Return to Log In</button>
                        </li>
                    </ul>
                </fieldset>
            </form>
        );
    }
}

export default UserSignUp;