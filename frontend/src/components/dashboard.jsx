import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
    const [authToken, setAuthToken] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setAuthToken(token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div>
            <h1>Successfully logged in!</h1>
            <p>Your authentication token: {authToken}</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default DashboardPage;