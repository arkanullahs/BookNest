import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
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
            <h1>Successfully registered!</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default WelcomePage;