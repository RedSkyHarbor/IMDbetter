import React, { Component } from 'react';
import axios from 'axios';

class UserSignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            is_admin: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSwitchView = (viewName) =>{
        this.props.onSelectView(viewName);
    }

    handleSubmit = (event) => {
        const { email, password, username, is_admin } = this.state;
        axios
            .post('/api/registration', {
                user: {
                    username: username,
                    email: email,
                    password: password,
                    is_admin: is_admin
                }
            },
            { withCredentials: true }
        )
        .then(res => {
            console.log(res);
            if (res.status === 201) {
                this.props.handleSuccessfulAuth(JSON.parse(res.config.data));
            }
        })
        .catch(err => {
            console.log('registration error', err);
        });

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