import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
import './landingpage.css';

const Landingpage = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Dive into endless stories. Explore now!</h1>
          <p>Discover the magic of books and unlock your imagination.</p>
          <button className="hero-btn">Browse Collection</button>
        </div>
        <div className="hero-image">
          <img
            src="https://res.cloudinary.com/dgqe5xli6/image/upload/v1737739049/image_4_supnvz.png"
            alt="Reading illustration"
          />
        </div>
      </section>

      {/* Discover Books Section */}
      <section className="discover-books">
        <h2>Discover Your Next Favorite Book</h2>
        <p>Find books that inspire, teach, and entertain you.</p>
        <div className="book-carousel">
          {[
            {
              img: "https://res.cloudinary.com/dgqe5xli6/image/upload/v1737738857/image_3_jgpfi8.png",
              title: "Like a Summer",
              author: "John Stroud",
              price: "$19.00",
            },
            {
              img: "https://res.cloudinary.com/dgqe5xli6/image/upload/v1737738729/image_rooxq2.png",
              title: "Think Like a Monk",
              author: "Jay Shetty",
              price: "$21.00",
            },
            {
              img: "https://res.cloudinary.com/dgqe5xli6/image/upload/v1737738859/image_1_aln1qm.png",
              title: "Shatter Me",
              author: "Tahereh Mafi",
              price: "$20.50",
            },
            {
              img: "https://res.cloudinary.com/dgqe5xli6/image/upload/v1737738858/image_2_yilukz.png",
              title: "12 Rules of Love",
              author: "Jay Shetty",
              price: "$24.50",
            },
          ].map((book, index) => (
            <div className="book-card" key={index}>
              <img src={book.img} alt={book.title} />
              <h3>{book.title}</h3>
              <p>{book.author}</p>
              <p>{book.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="statistics">
        {[
          { number: "94,550", label: "Subscribers" },
          { number: "6,000", label: "Products" },
          { number: "499", label: "Free Downloads" },
          { number: "280", label: "Ebooks" },
        ].map((stat, index) => (
          <div className="stat" key={index}>
            <h3>{stat.number}</h3>
            <p>{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Featured Authors Section */}
      <section className="featured-authors">
        <h2>Meet Our Featured Authors</h2>
        <div className="author-carousel">
          {[
            {
              img: "https://res.cloudinary.com/dgqe5xli6/image/upload/v1737742427/image_5_vzjj7k.png",
              name: "Humayun Ahmed",
              role: "Author & Writer",
            },
            {
              img: "https://res.cloudinary.com/dgqe5xli6/image/upload/v1737742427/image_6_ldrhex.png",
              name: "Kazi Nazrul Islam",
              role: "Poet",
            },
            {
              img: "https://res.cloudinary.com/dgqe5xli6/image/upload/v1737742427/image_7_pv6dij.png",
              name: "Chetan Bhagat",
              role: "Writer",
            },
            {
              img: "https://res.cloudinary.com/dgqe5xli6/image/upload/v1737742426/image_8_dh77uk.png",
              name: "Oscar Wilde",
              role: "Writer",
            },
          ].map((author, index) => (
            <div className="author-card" key={index}>
              <img src={author.img} alt={author.name} />
              <h3>{author.name}</h3>
              <p>{author.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Our Readers Say</h2>
        <p>Dive into the experiences of readers who love our collection.</p>
        <div className="testimonial-content">
          <img
            src="https://res.cloudinary.com/dgqe5xli6/image/upload/v1737743798/image_9_oi7xbl.png"
            alt="Review illustration"
            className="review-img"
          />
          <blockquote>
            <p>
              "Every book holds a lesson, and sometimes, the bad ones teach us the most."
            </p>
            <div className="stars">⭐⭐⭐⭐⭐</div>
            <footer>- Elizabeth Monterary</footer>
          </blockquote>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="newsletter-container">
          <img
            src="https://res.cloudinary.com/dgqe5xli6/image/upload/v1737745460/image_10_erxjje.png"
            alt="Books and Offers"
            className="newsletter-image"
          />
          <div className="newsletter-content">
            <h2>
              Subscribe to our newsletter and get <span>-25% off</span>
            </h2>
            <p>
              Join our book-loving community! Stay updated on new arrivals, exclusive deals, and special offers.
            </p>
            <button className="newsletter-btn">Claim Your Discount</button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Landingpage;
