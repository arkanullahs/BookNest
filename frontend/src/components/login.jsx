import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./loginSignup.css";
import Navbar from './navbar.jsx';
import Footer from './footer.jsx';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = 'http://127.0.0.1:8000/api/login';
    const payload = { email, password };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.message); // Save the token
        navigate('/dashboard'); // Navigate to dashboard after login
      } else {
        setError(data.message || 'Something went wrong!');
      }
    } catch (err) {
      setError('Unable to connect to the server.');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="form-container">
          <h2>Log In</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="error">{error}</p>}

            <button type="submit" className="submit-btn">Log In</button>
          </form>

          <p className="toggle-text">
            Don't have an account?
            <span onClick={() => navigate('/signup')} className="toggle-link">
              Sign up
            </span>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
