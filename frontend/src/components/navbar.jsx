import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-title" onClick={() => navigate('/')}>BookNest</h1>
      </div>
      <div className="navbar-center">
        <ul className="navbar-links">
          <li><Link to="/landingpage">Home</Link></li>
          <li><Link to="/books">Books</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/about">FAQ</Link></li>
          <li>
            <input type="text" className="search-bar" placeholder="Search..." />
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <button className="nav-btn" onClick={() => navigate('/login')}>Log In</button>
        <button className="nav-btn" onClick={() => navigate('/signup')}>Sign Up</button>

      </div>
    </nav>
  );
};

export default Navbar;
