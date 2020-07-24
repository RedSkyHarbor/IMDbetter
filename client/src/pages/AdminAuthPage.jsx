import React from 'react';

import AdminLogin from '../components/auth/AdminLogin';

const AdminAuthPage = (props) => {
    return (
        <div>
            <h1>{props.loggedInStatus}</h1>
            <AdminLogin />
        </div>
    )
}

export default AdminAuthPage;