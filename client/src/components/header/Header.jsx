import React, { Component } from 'react';
import { Link} from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = { searchQuery: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {

    }

    handleChange(event) {
        console.log(event.target.value);
        this.setState({ searchQuery: event.target.value });
    }

    handleSubmit(event) {
        alert(this.state.searchQuery);
        event.preventDefault();
    }

    render() {
        return (
            <header>
                <Link to='/' >IMDbetter</Link>
                <form onSubmit={this.handleSubmit}>
                    <input type='text' placeholder='Search IMDbetter' onChange={this.handleChange} />
                    <input type='submit' value='Submit'/>
                </form>
            </header>
        );
    }

}

export default Header;