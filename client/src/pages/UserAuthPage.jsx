import React from 'react';

import Header from '../components/header/Header';
import UserLogin from '../components/auth/UserLogin';

const UserAuthPage = () => {
    return (
        <div>
            <Header />
            <UserLogin />
        </div>
    );
}

export default UserAuthPage;