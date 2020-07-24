import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { };
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleLogoutClick = () => {
        axios.delete('/api/logout', { withCredentials: true}).then(res => {
            this.props.handleLogout();
        }).catch(err => {
            console.log('logout error', err);
        });
    }

    // Conditionally show log in link vs log out button based on logged in state
    render() {
        return (
            <header>
                <Link to='/' >IMDbetter</Link>
                <br />
                <Link to='/registration'>Log in</Link>
                <button onClick={() => this.handleLogoutClick()}>Logout</button>
            </header>
        );
    }

}

export default Header;