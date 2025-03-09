import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import "./UserDashboard.css";
import axios from 'axios';
const API_BASE_URL = 'http://localhost:8000/api';// Assuming you've created this config file

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("profile");
  const [dashboardSummary, setDashboardSummary] = useState(null);
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Fetch user data and dashboard summary from backend APIs
  useEffect(() => {
    const token = localStorage.getItem("token"); // Assuming token is stored as 'token' after login
    const userData = localStorage.getItem("user"); // Assuming user data is stored as 'user'

    if (!token || !userData) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(userData));

    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token'); // Get token
        const headers = { Authorization: `Bearer ${token}` }; // Prepare auth header

        // Fetch User Dashboard Summary Data
        const summaryResponse = await axios.get(`${API_BASE_URL}/user/dashboard`, { headers });
        setDashboardSummary(summaryResponse.data);

        // Fetch Orders Data
        const ordersResponse = await axios.get(`${API_BASE_URL}/orders`, { headers });
        setOrders(ordersResponse.data.data); // Assuming pagination returns data in .data.data

      } catch (err) {
        setError(err);
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle the file upload logic here (not implemented in backend API)
      console.log("File selected:", file.name);
      // You would typically upload this file to your server
    }
  };


  const renderProfileSection = () => {
    return (
      <div className="profile-section">
        <h2>Personal Information</h2>

        <div className="profile-photo-container">
          <div className="profile-photo">
            {user?.name ? user.name.charAt(0).toLowerCase() : "e"}
          </div>
          <button className="upload-photo-btn" onClick={handleUploadClick}>
            Upload New Photo
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            accept="image/*"
          />
        </div>

        <div className="profile-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                defaultValue={user?.name?.split(' ')[0] || "N/A"} // Display from user data
                readOnly // Make fields read-only as no update API provided
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                defaultValue={user?.name?.split(' ')[1] || "N/A"} // Display from user data
                readOnly
              />
            </div>
          </div>


          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                defaultValue={user?.email || "N/A"} // Display from user data
                readOnly
              />
            </div>
          </div>

          {/* Removed Password and Save button as no API for profile update/password change */}
        </div>

        {dashboardSummary && (
          <div className="dashboard-summary">
            <h3>Dashboard Summary</h3>
            <p>Order Count: {dashboardSummary.order_count}</p>
            <p>Total Spent: ${dashboardSummary.total_spent}</p>
            <p>Comment Count: {dashboardSummary.comment_count}</p>
            {dashboardSummary.recommended_books && dashboardSummary.recommended_books.length > 0 && (
              <div>
                <h4>Recommended Books:</h4>
                <ul>
                  {dashboardSummary.recommended_books.map(book => (
                    <li key={book.id}>{book.title} by {book.author}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderOrdersSection = () => {
    if (loading) {
      return <p>Loading orders...</p>;
    }

    if (error) {
      return <p>Error fetching orders: {error.message}</p>;
    }

    if (!orders || orders.length === 0) {
      return <div className="generic-section"><h2>My Orders</h2><p className="empty-message">You Haven't ordered yet. Order Something!!</p></div>;
    }

    return (
      <div className="generic-section">
        <h2>My Orders</h2>
        <div className="orders-container">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <h3>Order ID: {order.id}</h3>
              <p>Created At: {new Date(order.created_at).toLocaleString()}</p>
              <p>Total Amount: ${order.total_amount}</p>
              <h4>Books:</h4>
              <ul>
                {order.books.map(book => (
                  <li key={book.id}>{book.title} by {book.author}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  };


  const renderSection = (sectionName, title, content) => {
    return (
      <div className="generic-section">
        <h2>{title}</h2>
        <p className="empty-message">{content}</p>
      </div>
    );
  };

  if (loading && activeSection !== 'profile' && activeSection !== 'orders') {
    return <p>Loading...</p>; // Loading for sections that might need data (though now mostly removed)
  }

  if (error && activeSection !== 'profile' && activeSection !== 'orders') {
    return <p>Error: {error.message}</p>; // Error handling for sections that might fail
  }


  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-wrapper">
        <div className="dashboard-content">
          {/* Sidebar */}
          <aside className="sidebar">
            <div className="user-welcome">
              <div className="user-avatar">
                {user?.name ? user.name.charAt(0).toLowerCase() : "e"}
              </div>
              <div className="user-info">
                <span>Hello</span>
                <h3>{user?.name || "N/A"}</h3>
              </div>
            </div>

            <ul className="sidebar-menu">
              <li
                className={activeSection === "profile" ? "active" : ""}
                onClick={() => setActiveSection("profile")}
              >
                My Profile
              </li>
              {/* Removed Address, eBook, List, Wishlist, Reviews, Authors from sidebar as per API availability */}
              <li
                className={activeSection === "orders" ? "active" : ""}
                onClick={() => setActiveSection("orders")}
              >
                My Orders
              </li>
            </ul>
          </aside>

          {/* Main Content */}
          <section className="main-content">
            {activeSection === "profile" && renderProfileSection()}
            {activeSection === "orders" && renderOrdersSection()}
            {activeSection === "ebook" && renderSection("ebook", "My eBook Library", "Your eBook library feature is not available in current version.")} {/* Placeholder messages for removed sections */}
            {activeSection === "list" && renderSection("list", "My List", "Your List feature is not available in current version.")}
            {activeSection === "wishlist" && renderSection("wishlist", "My Wishlist", "Your Wishlist feature is not available in current version.")}
            {activeSection === "reviews" && renderSection("reviews", "My Ratings & Reviews", "Your Ratings & Reviews feature is not available in current version.")}
            {activeSection === "authors" && renderSection("authors", "My Following Authors", "Your Following Authors feature is not available in current version.")}
            {activeSection === "address" && renderSection("address", "My Address", "Your Address feature is not available in current version.")}
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserDashboard;