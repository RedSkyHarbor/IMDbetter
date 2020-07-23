import React, { Component } from 'react';

class UserLogin extends Component {
    constructor(props){
        super(props);
        this.state = { currentView: 'signUp'}
    }

    changeView = (view) => {
        this.setState({
            currentView: view
        });
    }

    currentView = () => {
        switch(this.state.currentView) {
            case "signUp":
                return (
                    <form>
                        <h2>Sign up</h2>
                        <fieldset>
                            <ul>
                                <li>
                                    <label for='username'>Username:</label>
                                    <input type='text' id='username' required />
                                </li>
                                <li>
                                    <label for='email'>Email:</label>
                                    <input type='email' id='email' required />
                                </li>
                                <li>
                                    <label for='password'>Password:</label>
                                    <input type='password' id='password' required />
                                </li>
                            </ul>
                            <button>Submit</button>
                            <button type='button' onClick={ () => this.changeView('logIn')}>Have an account?</button>
                        </fieldset>
                    </form>
                )
                break
            case "logIn":
                return(
                    <form>
                        <h2>Welcome Back</h2>
                        <fieldset>
                            <legend>Log In</legend>
                            <ul>
                                <li>
                                    <label for="username">Username:</label>
                                    <input type="text" id="username" required/>
                                </li>
                                <li>
                                    <label for="password">Password:</label>
                                    <input type="password" id="password" required/>
                                </li>
                                <li>
                                    <i/>
                                    <button onClick={ () => this.changeView("PWReset")} href="#">Forgot Password?</button>
                                    <button onClick={ () => this.changeView("signUp")} href="#">Don't Have an Account?</button>
                                </li>
                            </ul>
                        </fieldset>
                    </form>
                )
                break
            case "PWReset":
                return (
                    <form>
                        <h2>Reset Password</h2>
                        <fieldset>
                            <legend>Password Reset</legend>
                            <ul>
                                <li>
                                    <em>A reset link will be sent to your inbox!</em>
                                </li>
                                <li>
                                    <label for="email">Email:</label>
                                    <input type="email" id="email" required/>
                                </li>
                            </ul>
                            <button>Send Reset Link</button>
                            <button type="button" onClick={ () => this.changeView("logIn")}>Go Back</button>
                        </fieldset>
                    </form>
                )
            default:
                break
        }
    }

    render() {
        return (
            <div>
                {this.currentView()}
            </div>
        )
    }

}

export default UserLogin;