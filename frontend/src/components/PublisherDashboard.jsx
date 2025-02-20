import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import "./PublisherDashboard.css";

const PublisherDashboard = () => {
    return (
      <div className="dashboard-wrapper">
        <Navbar />
        <div className="dashboard">
          <header className="dashboard-header">
            <h1 className="dashboard-title">Publisher Dashboard</h1>
            <button className="add-book-btn">Add New Book</button>
          </header>
          <div className="dashboard-container">
            <p className="dashboard-item left">Total Books: <span className="dashboard-value">0</span></p>
            <p className="dashboard-item center">Total Publishers: <span className="dashboard-value">0</span></p>
            <p className="dashboard-item right">Total Revenue: <span className="dashboard-value">$0.00</span></p>
          </div>
          <div className="book-info-container">
            <img src="https://www.neh.gov/sites/default/files/styles/medium/public/2018-06/openbooks.jpg?itok=kUdGYpx_" alt="Book Cover" className="book-image" />
            <div className="book-details">
              <p><strong>Title:</strong> Example Book Title</p>
              <p><strong>Price:</strong> $10.99</p>
              <p><strong>Description:</strong> This is a short description of the book.</p>
              <p><strong>Category:</strong> Fiction</p>
              <p><strong>Status:</strong> Available</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  };
  
  export default PublisherDashboard;
