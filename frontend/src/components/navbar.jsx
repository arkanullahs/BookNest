import React from 'react';
import './loginSignup.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-title">BookNest</h1>
      </div>
      <div className="navbar-center">
        <ul className="navbar-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#browse">Browse</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li>
            <input type="text" className="search-bar" placeholder="Search..." />
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <button className="nav-btn">Log In</button>
        <button className="nav-btn">Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
