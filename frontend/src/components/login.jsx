import React from 'react';
import "./login.css";
import Navbar from './navbar.jsx';
import './navbar.css';
import Footer from './footer.jsx';
import './footer.css';

const Login = () => {
  return (
    <div>
      {/* Navigation Bar */}
      <Navbar />

      {/* Form Section */}
      <div className="container">
        <div className="form-container">
          <h2>Log In</h2>
          <form>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" required />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter your password" required />
            </div>

            <div className="options-container">
              <div className="keep-logged-in">
                <input type="checkbox" id="keep-logged-in" />
                <label htmlFor="keep-logged-in">Keep me logged in</label>
              </div>
              <div className="forgot-password">
                <a href="#forgot-password">Forgot password?</a>
              </div>
            </div>

            <button type="submit" className="submit-btn">Log In</button>
          </form>

          <p className="signup-option">
            Don't have an account? <button className="signup-btn">Sign up</button>
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

export default Login;
