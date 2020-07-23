import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        return (
            <header>
                <Link to='/' >IMDbetter</Link>
                <br />
                <Link to='/registration'>Log in</Link>
            </header>
        );
    }

}

export default Header;