import React from 'react';

const AdminLogin = () => {
    return(
        <form>
            <h2>Welcome Administrator</h2>
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
    );
}

export default AdminLogin;