import React, { Component } from 'react';

class UserSignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        }
    }

    handleSwitchView = (viewName) =>{
        this.props.onSelectView(viewName);
    }

    render() {
        return (
            <form>
                <fieldset>
                    <legend>Sign Up</legend>
                    <ul>
                        <li>
                            <label htmlFor='username'>Username:</label>
                            <input type='text' id='username' required />
                        </li>
                        <li>
                            <label htmlFor='email'>Email:</label>
                            <input type='email' id='email' required />
                        </li>
                        <li>
                            <label htmlFor='password'>Password:</label>
                            <input type='password' id='password' required />
                        </li>
                        <li>
                            <button>Submit</button>
                            <button type='button' onClick={ () => this.handleSwitchView('login')}>Have an account?</button>
                        </li>
                    </ul>
                </fieldset>
            </form>
        );
    }
}

export default UserSignUp;