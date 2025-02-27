import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import "./UserDashboard.css";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("profile");
  const [data, setData] = useState({
    address: null,
    orders: null,
    list: null,
  });

  const navigate = useNavigate();

  // Mock data to display when backend is unavailable
  const mockData = {
    address: "No saved address.",
    orders: "No orders found.",
    list: "Your list is empty.",
  };

  // Fetch user data from localStorage (token & user)
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (!token || !userData) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(userData));
  }, [navigate]);

  // Fetch data from backend or use mock data if unavailable
  useEffect(() => {
    const fetchData = async (type) => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`http://localhost:8000/api/${type}`);
        if (!response.ok) throw new Error(`Failed to fetch ${type}`);
        const result = await response.json();
        setData((prev) => ({ ...prev, [type]: result }));
      } catch (error) {
        console.error(error);
        // Use mock data if API fails
        setData((prev) => ({ ...prev, [type]: mockData[type] }));
      }
    };

    // Attempt fetching data for each section
    ["address", "orders", "list"].forEach(fetchData);
  }, []);

  const renderProfileSection = () => {
    return (
      <div className="profile-section">
        <h2>Personal Information</h2>
        
        <div className="profile-photo-container">
          <div className="profile-photo">
            {user?.name ? user.name.charAt(0) : "U"}
          </div>
          <button className="upload-photo-btn">Upload New Photo</button>
        </div>
        
        <div className="profile-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input 
                type="text" 
                id="firstName" 
                defaultValue={user?.name?.split(' ')[0] || ""} 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input 
                type="text" 
                id="lastName" 
                defaultValue={user?.name?.split(' ')[1] || ""} 
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="dob">Your Date of Birth</label>
              <input 
                type="text" 
                id="dob" 
                placeholder="mm/dd/yyyy" 
              />
            </div>
            
            <div className="form-group">
              <label>Gender</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input type="radio" name="gender" value="male" /> Male
                </label>
                <label className="radio-label">
                  <input type="radio" name="gender" value="female" /> Female
                </label>
              </div>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                defaultValue={user?.email || ""} 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Mobile Number</label>
              <input 
                type="text" 
                id="phone" 
              />
            </div>
          </div>
          
          <h3>Password</h3>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <div className="password-input">
                <input 
                  type="password" 
                  id="newPassword" 
                />
                <span className="password-toggle">👁️</span>
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-input">
                <input 
                  type="password" 
                  id="confirmPassword" 
                />
                <span className="password-toggle">👁️</span>
              </div>
            </div>
          </div>
          
          <div className="form-actions">
            <button className="save-btn">Save</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-container">
      <Navbar />

      <div className="dashboard-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="user-welcome">
            <div className="user-avatar">
              {user?.name ? user.name.charAt(0) : "U"}
            </div>
            <div className="user-info">
              <span>Hello</span>
              <h3>{user?.name || "User"}</h3>
            </div>
          </div>
          
          <ul className="sidebar-menu">
            <li
              className={activeSection === "profile" ? "active" : ""}
              onClick={() => setActiveSection("profile")}
            >
              My Profile
            </li>
            <li
              className={activeSection === "address" ? "active" : ""}
              onClick={() => setActiveSection("address")}
            >
              My Address
            </li>
            <li
              className={activeSection === "orders" ? "active" : ""}
              onClick={() => setActiveSection("orders")}
            >
              My Orders
            </li>
            <li
              className={activeSection === "ebook" ? "active" : ""}
              onClick={() => setActiveSection("ebook")}
            >
              My eBook Library
            </li>
            <li
              className={activeSection === "list" ? "active" : ""}
              onClick={() => setActiveSection("list")}
            >
              My List
            </li>
            <li
              className={activeSection === "wishlist" ? "active" : ""}
              onClick={() => setActiveSection("wishlist")}
            >
              My Wishlist
            </li>
            <li
              className={activeSection === "reviews" ? "active" : ""}
              onClick={() => setActiveSection("reviews")}
            >
              My Rating & Reviews
            </li>
            <li
              className={activeSection === "authors" ? "active" : ""}
              onClick={() => setActiveSection("authors")}
            >
              My Following Authors
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <section className="main-content">
          {/* My Profile Section */}
          {activeSection === "profile" && renderProfileSection()}

          {/* My Address Section */}
          {activeSection === "address" && (
            <div>
              <h2>My Address</h2>
              <p>{data.address}</p>
            </div>
          )}

          {/* My Orders Section */}
          {activeSection === "orders" && (
            <div>
              <h2>My Orders</h2>
              <p>{data.orders}</p>
            </div>
          )}
          
          {/* My eBook Library Section */}
          {activeSection === "ebook" && (
            <div>
              <h2>My eBook Library</h2>
              <p>Your eBook library is empty.</p>
            </div>
          )}

          {/* My List Section */}
          {activeSection === "list" && (
            <div>
              <h2>My List</h2>
              <p>{data.list}</p>
            </div>
          )}
          
          {/* My Wishlist Section */}
          {activeSection === "wishlist" && (
            <div>
              <h2>My Wishlist</h2>
              <p>Your wishlist is empty.</p>
            </div>
          )}
          
          {/* My Rating & Reviews Section */}
          {activeSection === "reviews" && (
            <div>
              <h2>My Rating & Reviews</h2>
              <p>You haven't submitted any reviews yet.</p>
            </div>
          )}
          
          {/* My Following Authors Section */}
          {activeSection === "authors" && (
            <div>
              <h2>My Following Authors</h2>
              <p>You are not following any authors yet.</p>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default UserDashboard;