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
    const endpoint = 'https://booknest-production-009d.up.railway.app/api/login';
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
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('user', JSON.stringify(data.user));



        if (data.role === 'admin') {
          navigate('/admin-dashboard');
        } else if (data.role === 'publisher') {
          navigate('/publisher-dashboard');
        } else {
          navigate('/user-dashboard');
        }
      } else {
        setError(data.message || 'Invalid credentials.');
      }
    } catch (err) {
      setError('Unable to connect to the server.');
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="wave-background">
        <div className="container">
          <div className="form-container">
            <h2>Log In</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="error">{error}</p>}
              <button type="submit" className="submit-btn">Log In</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
