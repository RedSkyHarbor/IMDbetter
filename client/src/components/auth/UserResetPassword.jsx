import React, { Component } from 'react';

class UserResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '' };
    }

    handleSwitchView = (viewName) =>{
        this.props.onSelectView(viewName);
    }

    render() {
        return (
            <form>
                <fieldset>
                    <legend>Password Reset</legend>
                    <ul>
                        <li>
                            <em>A reset link will be sent to your inbox!</em>
                        </li>
                        <li>
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" required/>
                        </li>
                        <li>
                            <button>Submit</button>
                            <button type='button' onClick={ () => this.handleSwitchView('login')}>Return to Log In</button>
                        </li>
                    </ul>
                    
                </fieldset>
            </form>
        );
    }
}

export default UserResetPassword;