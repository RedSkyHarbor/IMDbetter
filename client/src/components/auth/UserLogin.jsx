import React, { Component } from 'react';
import axios from 'axios';

class UserLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            is_admin: false,
            display_error_message: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSwitchView = (viewName) =>{
        this.props.onSelectView(viewName);
    }

    handleSubmit = (event) => {
        const { password, username, is_admin } = this.state;
        axios
            .post('/api/sessions', {
                user: {
                    username: username,
                    password: password,
                    is_admin: is_admin
                }
            },
            { withCredentials: true }
        )
        .then(res => {
            // TODO res.data === 1 may fail if two accounts exist with same credentials
            // DB does not currently enforce usernames and emails to be unique
            if (res.status === 200 && res.data === 1) {
                this.props.handleSuccessfulAuth(JSON.parse(res.config.data));
            }
        })
        .catch(err => {
            console.log('login error', err);
            this.setState({ display_error_message: true });
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
                    <legend>Log In</legend>
                    <h2 style={{ display: this.state.display_error_message ? 'block' : 'none' }}>Account not found</h2>
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
                            <button type='submit'>Log In</button>
                            {/* <button type='button' onClick={ () => this.handleSwitchView('reset')}>Reset Password</button> */ }
                            <button type='button' onClick={ () => this.handleSwitchView('signup')}>Create Account</button>
                        </li>
                    </ul>
                </fieldset>
            </form>
        );
    }
}

export default UserLogin;