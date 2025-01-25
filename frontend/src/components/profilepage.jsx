import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
import './profilepage.css';

const ProfilePage = () => {
  return (
    <div className="profile-page">
      {/* Navbar */}
      <Navbar />

      {/* Profile Section */}
      <div className="profile-header">
        <h2>My Profile</h2>
        <div className="profile-image-wrapper">
          <div className="profile-image"></div>
          <button className="upload-btn">Upload</button>
        </div>
      </div>

      {/* Profile Details */}
      <div className="profile-details">
        <ul>
          <li>
            <span className="icon">👤</span>
            <span className="detail-text">Hasin Labib</span>
          </li>
          <li>
            <span className="icon">📅</span>
            <span className="detail-text">10/07/2003</span>
          </li>
          <li>
            <span className="icon">📞</span>
            <span className="detail-text">01742284803</span>
          </li>
          <li>
            <span className="icon">📸</span>
            <span className="detail-text">No Instagram Account Added</span>
          </li>
          <li>
            <span className="icon">✉️</span>
            <span className="detail-text">ahnaflabib56@gmail.com</span>
          </li>
          <li>
            <span className="icon">🔒</span>
            <span className="detail-text">Password</span>
          </li>
        </ul>
        <div className="edit-btn-wrapper">
          <button className="edit-profile-btn">Edit Profile</button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProfilePage;
