import React from 'react';
import Navbar from './navbar.jsx';
import Footer from './footer.jsx';
import './navbar.css';
import './footer.css';
import './signup.css';

const SignupPage = () => {
  return (
    <div className="signup-page">
      {/* Navigation Bar */}
      <Navbar />

      {/* Left Container - "Are you a publisher?" */}
      <div className="publisher-container">
        <h2>Are you a publisher?</h2>
        <button className="join-us-btn">Join Us</button>
      </div>

      {/* Left Text - Outside Signup Container */}
      <div className="left-text">
        <h1>Become a BookNest Reader</h1>
      </div>

      {/* Signup Form Section */}
      <div className="signup-container">
        <div className="signup-form-container">
          <h2>Sign Up</h2>
          <form>
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Enter your name" required />
            </div>

            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" required />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter your password" required />
            </div>

            <div className="input-group">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input type="password" id="confirm-password" placeholder="Confirm your password" required />
            </div>

            {/* "I agree to the terms and privacy policy" Checkbox */}
            <div className="checkbox-group">
              <input type="checkbox" id="terms" />
              <label htmlFor="terms" className="terms-label">
                I agree to the <a href="/terms" className="terms-link">terms</a> and <a href="/privacy-policy" className="terms-link">privacy policy</a>.
              </label>
            </div>

            <button type="submit" className="submit-btn">Sign Up</button>
          </form>

          <p className="toggle-text">
            Already have an account? <a href="/login" className="toggle-link">Log in</a>
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default SignupPage;
