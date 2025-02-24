import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import "./PublisherDashboard.css";

const PublisherDashboard = () => {
    const [books, setBooks] = useState([]);
    const location = useLocation();  // Get location from the router
    const navigate = useNavigate();

    // Check if there is any book data passed through location state
    useEffect(() => {
        if (location.state && location.state.book) {
            setBooks((prevBooks) => [...prevBooks, location.state.book]);
        }
    }, [location]);

    return (
      <div className="dashboard-wrapper">
        <Navbar />
        <div className="dashboard">
          <header className="dashboard-header">
            <h1 className="dashboard-title">Publisher Dashboard</h1>
            <button className="add-book-btn" onClick={() => navigate("/add-book")}>Add New Book</button>
          </header>
          <div className="dashboard-container">
            <p className="dashboard-item left">Total Books: <span className="dashboard-value">{books.length}</span></p>
            <p className="dashboard-item center">Total Publishers: <span className="dashboard-value">0</span></p>
            <p className="dashboard-item right">Total Revenue: <span className="dashboard-value">$0.00</span></p>
          </div>

          {/* Display new books */}
          {books.map((book, index) => (
            <div key={index} className="book-info-container">
              <img src={book.image} alt="Book Cover" className="book-image" />
              <div className="book-details">
                <p><strong>Title:</strong> {book.title}</p>
                <p><strong>Price:</strong> ${book.price}</p>
                <p><strong>Description:</strong> {book.description}</p>
                <p><strong>Category:</strong> {book.category}</p>
                <p><strong>Status:</strong> {book.status}</p>
                <div className="book-actions">
                  <button className="edit-book-btn">Edit</button>
                  <button className="delete-book-btn">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Footer />
      </div>
    );
};

export default PublisherDashboard;
