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
            <p>Total Books: <span className="dashboard-value">0</span></p>
            <p>Total Publishers: <span className="dashboard-value">0</span></p>
            <p>Total Revenue: <span className="dashboard-value">$0.00</span></p>
          </div>
        </div>
        <Footer />
      </div>
    );
  };
  
  export default PublisherDashboard;
