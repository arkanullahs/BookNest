import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from './logout';

const AdminDashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = () => {
            // Get the token and user data from localStorage
            const token = localStorage.getItem('token');
            const userData = localStorage.getItem('user');

            // Check if token exists, otherwise redirect to login
            if (!token || !userData) {
                navigate('/login');
                return;
            }

            // Parse the user data (stored in localStorage) and set it to state
            setUser(JSON.parse(userData));
        };

        fetchUserData();
    }, [navigate]);

    return (
        <div>
            <h2>Admin Dashboard</h2>
            {user ? (
                <div>
                    <p><strong>Name:</strong> {user.name}</p> {/* Display user name */}
                    <p><strong>Email:</strong> {user.email}</p> {/* Display user email */}
                    <p><strong>Role:</strong> {user.role}</p> {/* Display user role */}
                    <button onClick={() => logout(navigate)}>Logout</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default AdminDashboard;
