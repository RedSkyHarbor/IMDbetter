import React, { Component } from 'react';

class UserLogin extends Component {
    constructor(props){
        super(props);
        this.state = { 
            username: '',
            password: '',
        }
    }

    handleSwitchView = (viewName) =>{
        this.props.onSelectView(viewName);
    }

    render() {
        return(
            <form>
                <fieldset>
                    <legend>Log In</legend>
                    <ul>
                        <li>
                            <label htmlFor="username">Username:</label>
                            <input type="text" id="username" required/>
                        </li>
                        <li>
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" required/>
                        </li>
                        <li>
                            <button>Submit</button>
                            <button type='button' onClick={ () => this.handleSwitchView('reset')}>Forgot Password?</button>
                            <button type='button' onClick={ () => this.handleSwitchView('signup')}>Don't Have an Account?</button>
                        </li>
                    </ul>
                </fieldset>

            </form>
        );
    }

}

export default UserLogin;