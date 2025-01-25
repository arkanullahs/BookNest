import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './footer';
import './signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const payload = { name, email, password };
    const endpoint = 'http://127.0.0.1:8000/api/register';

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
        navigate('/welcome'); // Redirect to welcome page upon successful signup
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
      <div className="signup-page">
        <div className="publisher-container">
          <h3>Are you a publisher?</h3>
          <button className="join-us-btn">
            Join Us
          </button>
        </div>
        <div className="signup-container">
          <div className="signup-form-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

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

              <div className="input-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {error && <p className="error">{error}</p>}

              <div className="checkbox-group">
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms" className="terms-label">
                  I agree to the <a href="/terms" className="terms-link">terms</a> and <a href="/privacy-policy" className="terms-link">privacy policy</a>.
                </label>
              </div>

              <button type="submit" className="submit-btn">Sign Up</button>
            </form>

            <p className="toggle-text">
              Already have an account? <span onClick={() => navigate('/login')} className="toggle-link">Log in</span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
