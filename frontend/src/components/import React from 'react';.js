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
            At BookNest, we believe in the transformative power of stories and the unparalleled joy of reading. 
            Our platform offers a meticulously curated collection of books across various genres 
            to cater to readers of all tastes and preferences.
          </p>
          <p className="about-text">
            Whether you're in search of timeless classics, the latest bestsellers, 
            or hidden literary gems, <span className="highlight">BookNest</span> has it all. Join our vibrant community of readers, 
            share insightful reviews, and embark on a literary journey like no other.
          </p>
          <p className="about-text">
            <strong>Explore. Discover. Connect.</strong> Welcome to your new book haven!
          </p>
          <p className="about-text">
            At <span className="highlight">BookNest</span>, we also host regular events, author meet-and-greets, and book clubs to foster a deeper connection with the literary world. 
            Our mission is to create a space where every reader feels at home and every book finds its reader.
          </p>
          <p className="about-text">
            Thank you for being a part of our story. Together, let's celebrate the magic of books and the communities they build.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;