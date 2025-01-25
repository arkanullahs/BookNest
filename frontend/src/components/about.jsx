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
            Welcome to <span className="highlight">BookNest</span>, your ultimate destination for book enthusiasts! 
            At BookNest, we believe in the power of stories and the joy of reading. 
            Our platform offers a curated collection of books across various genres 
            to cater to readers of all tastes.
          </p>
          <p className="about-text">
            Whether you're looking for timeless classics, the latest bestsellers, 
            or hidden gems, <span className="highlight">BookNest</span> has it all. Join our community of readers, 
            share reviews, and embark on a literary journey like no other.
          </p>
          <p className="about-text">
            <strong>Explore. Discover. Connect.</strong> Welcome to your new book haven!
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
