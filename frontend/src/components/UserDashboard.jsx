import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from './logout';
import Navbar from './navbar';
import Footer from './footer';

const UserDashboard = () => {
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
            <Navbar/>
        
        <div>
            <h2>User Dashboard</h2>
            {user ? (
                <div>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                    <button onClick={() => logout(navigate)}>Logout</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
            </div>
            <Footer/>
        </div>
    );
};

export default UserDashboard;
