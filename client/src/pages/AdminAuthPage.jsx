import React from 'react';

import AdminLogin from '../components/auth/AdminLogin';

const AdminLoginPage = (props) => {
    return (
        <div>
            <h1>{props.loggedInStatus}</h1>
            <AdminLogin />
        </div>
    )
}

export default AdminLoginPage;