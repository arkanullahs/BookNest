import React, { useState } from 'react';
import "./loginSignup.css";
import Navbar from './navbar.jsx';
import './navbar.css';
import Footer from './footer.jsx';
import './footer.css';


const LoginSignup = () => {
  const [isSignup, setIsSignup] = useState(false);

  const toggleForm = () => {
    setIsSignup((prevState) => !prevState);
  };

  return (
    <div>
      {/* Navigation Bar */}
      <Navbar />

      {/* Form Section */}
      <div className="container">
        <div className="form-container">
          <h2>{isSignup ? 'Sign Up' : 'Log In'}</h2>
          <form>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" required />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter your password" required />
            </div>

            {!isSignup && (
              <div className="options-container">
                <div className="keep-logged-in">
                  <input type="checkbox" id="keep-logged-in" />
                  <label htmlFor="keep-logged-in">Keep me logged in</label>
                </div>
                <div className="forgot-password">
                  <a href="#forgot-password">Forgot password?</a>
                </div>
              </div>
            )}

            {isSignup && (
              <div className="input-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input type="password" id="confirm-password" placeholder="Confirm your password" required />
              </div>
            )}

            <button type="submit" className="submit-btn">
              {isSignup ? 'Sign Up' : 'Log In'}
            </button>
          </form>

          <p className="toggle-text">
            {isSignup ? 'Already have an account? ' : "Don't have an account? "}
            <span onClick={toggleForm} className="toggle-link">
              {isSignup ? 'Log in' : 'Sign up'}
            </span>
          </p>

          <div className="continue-with">
            <p>Or continue with</p>
            <div className="social-icons">
              <img src="https://e7.pngegg.com/pngimages/882/225/png-clipart-google-logo-google-logo-google-search-icon-google-text-logo-thumbnail.png" alt="Google" className="social-icon" />
              <img src="https://icons.veryicon.com/png/o/application/common-icons/facebook-129.png" alt="Facebook" className="social-icon" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1200px-Instagram_icon.png" alt="Instagram" className="social-icon" />
              <img src="https://cdn.freebiesupply.com/logos/large/2x/twitter-3-logo-png-transparent.png" alt="Twitter" className="social-icon" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default LoginSignup;
