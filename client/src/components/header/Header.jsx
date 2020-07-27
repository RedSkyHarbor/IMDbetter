import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Header.module.scss';

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
            <header className={styles.header}>
                <div className={styles.logo}>
                    <Link to='/'>IMDbetter</Link>
                </div>
                
                <div className={styles.log_switch}>
                    {this.props.loggedInStatus === "LOGGED_IN" ? (
                        <button onClick={() => this.handleLogoutClick()}>Logout</button>
                    ):(
                        <Link to='/registration'>Log in</Link>
                    )}
                </div>
            </header>
        );
    }

}

export default Header;