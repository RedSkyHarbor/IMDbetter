import React, { Component } from 'react';

import Header from '../components/header/Header';
import UserLogin from '../components/auth/UserLogin';
import UserResetPassword from '../components/auth/UserResetPassword';
import UserSignUp from '../components/auth/UserSignUp';


class UserAuthPage extends Component {
    constructor(props) {
        super(props);
        this.state = { currentView: "login" };
        this.handleUpdateView = this.handleUpdateView.bind(this);
        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    }

    handleUpdateView = (viewVal) => {
        this.setState({ currentView: viewVal });
    }

    handleSuccessfulAuth = (data) => {
        this.props.handleLogin(data);
        this.props.history.push('/'); //redirect the user
    }


    currentView = () => {
        switch(this.state.currentView) {
            case 'login':
                return <UserLogin
                    onSelectView={this.handleUpdateView}
                />
            case 'signup':
                return <UserSignUp 
                    onSelectView={this.handleUpdateView}
                    handleSuccessfulAuth={this.handleSuccessfulAuth}
                />
            case 'reset':
                return <UserResetPassword 
                    onSelectView={this.handleUpdateView}
                />
            default:
                return <div>Error!</div>
        }
    }

    render() {
        return (
            <div>
                <Header />
                <h1>Logged status: {this.props.loggedInStatus}</h1>
                {this.currentView()}
            </div>
        );
    }
}

export default UserAuthPage;