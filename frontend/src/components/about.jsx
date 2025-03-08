import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
import './about.css';

function About() {
  return (
    <div>
      <Navbar />
      <div className="about-container">
        <div className="about-content">
          <h1 className="about-title">About BookNest</h1>
          <p className="about-text">
            Welcome to <span className="highlight">BookNest</span>, a sanctuary for book lovers! 
            We celebrate the magic of storytelling and the joy of reading. 
            Our carefully curated collection spans across diverse genres, ensuring there's something for everyone.
          </p>
          <p className="about-text">
            Whether you're drawn to timeless classics, the latest bestsellers, 
            or hidden literary treasures, <span className="highlight">BookNest</span> is your perfect reading companion. 
            Join our vibrant community, share insights, and embark on an unforgettable literary adventure.
          </p>
          <p className="about-text">
            <strong>Explore. Discover. Connect.</strong> Your next great read awaits!
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
