import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Footer from "./footer";
import "./UserDashboard.css";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("profile");
  const [data, setData] = useState({
    address: [],
    orders: null,
    list: null,
  });
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
    isDefault: false
  });

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Mock data to display when backend is unavailable
  const mockData = {
    address: [],
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

    // Set mock addresses for demonstration
    setData(prev => ({
      ...prev,
      address: [
        {
          id: 1,
          fullName: "John Doe",
          addressLine1: "123 Book Street",
          addressLine2: "Apt 45",
          city: "Bookville",
          state: "NY",
          zipCode: "10001",
          country: "USA",
          phone: "555-123-4567",
          isDefault: true
        }
      ]
    }));
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
        if (type !== 'address') { // We already set mock address data above
          setData((prev) => ({ ...prev, [type]: mockData[type] }));
        }
      }
    };

    // Attempt fetching data for each section
    ["orders", "list"].forEach(fetchData);
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Handle the file upload logic here
      console.log("File selected:", file.name);
      // You would typically upload this file to your server
    }
  };

  const handleAddressChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewAddress(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddAddress = () => {
    // Validate address fields here
    const addressId = Date.now(); // Simple way to generate unique ID
    const updatedAddresses = [...data.address, { ...newAddress, id: addressId }];

    setData(prev => ({
      ...prev,
      address: updatedAddresses
    }));

    // Reset form
    setNewAddress({
      fullName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phone: "",
      isDefault: false
    });

    // Here you would typically make an API call to save the address
    console.log("Address added:", newAddress);
  };

  const handleDeleteAddress = (addressId) => {
    const updatedAddresses = data.address.filter(addr => addr.id !== addressId);
    setData(prev => ({
      ...prev,
      address: updatedAddresses
    }));

    // Here you would typically make an API call to delete the address
    console.log("Address deleted:", addressId);
  };

  const handleSetDefaultAddress = (addressId) => {
    const updatedAddresses = data.address.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    }));

    setData(prev => ({
      ...prev,
      address: updatedAddresses
    }));

    // Here you would typically make an API call to update the default address
    console.log("Default address set:", addressId);
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
                defaultValue={user?.name?.split(' ')[0] || "elman"}
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
                defaultValue={user?.email || "elmanaust@gmail.com"}
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

  const renderAddressSection = () => {
    return (
      <div className="address-section">
        <div className="section-header">
          <h2>My Addresses</h2>
          <button className="add-btn" onClick={() => document.getElementById('addAddressForm').style.display = 'block'}>
            + Add New Address
          </button>
        </div>

        {data.address.length > 0 ? (
          <div className="addresses-container">
            {data.address.map((address) => (
              <div key={address.id} className={`address-card ${address.isDefault ? 'default-address' : ''}`}>
                {address.isDefault && <span className="default-badge">Default</span>}
                <h3>{address.fullName}</h3>
                <p>{address.addressLine1}</p>
                {address.addressLine2 && <p>{address.addressLine2}</p>}
                <p>{address.city}, {address.state} {address.zipCode}</p>
                <p>{address.country}</p>
                <p>Phone: {address.phone}</p>

                <div className="address-actions">
                  {!address.isDefault && (
                    <button
                      className="default-btn"
                      onClick={() => handleSetDefaultAddress(address.id)}
                    >
                      Set as Default
                    </button>
                  )}
                  <button
                    className="edit-btn"
                    onClick={() => console.log("Edit address:", address.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteAddress(address.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-addresses">
            <p>You don't have any saved addresses yet.</p>
          </div>
        )}

        <div id="addAddressForm" className="address-form" style={{ display: 'none' }}>
          <h3>Add New Address</h3>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={newAddress.fullName}
                onChange={handleAddressChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="addressLine1">Address Line 1</label>
              <input
                type="text"
                id="addressLine1"
                name="addressLine1"
                value={newAddress.addressLine1}
                onChange={handleAddressChange}
                placeholder="Street address, P.O. box"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="addressLine2">Address Line 2 (Optional)</label>
              <input
                type="text"
                id="addressLine2"
                name="addressLine2"
                value={newAddress.addressLine2}
                onChange={handleAddressChange}
                placeholder="Apartment, suite, unit, building, floor, etc."
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={newAddress.city}
                onChange={handleAddressChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">State/Province/Region</label>
              <input
                type="text"
                id="state"
                name="state"
                value={newAddress.state}
                onChange={handleAddressChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="zipCode">ZIP Code</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={newAddress.zipCode}
                onChange={handleAddressChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                id="country"
                name="country"
                value={newAddress.country}
                onChange={handleAddressChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={newAddress.phone}
                onChange={handleAddressChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={newAddress.isDefault}
                  onChange={handleAddressChange}
                />
                Make this my default address
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button
              className="cancel-btn"
              onClick={() => document.getElementById('addAddressForm').style.display = 'none'}
            >
              Cancel
            </button>
            <button
              className="save-btn"
              onClick={handleAddAddress}
            >
              Save Address
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderSection = (sectionName, title, content) => {
    return (
      <div className="generic-section">
        <h2>{title}</h2>
        {typeof content === 'string' ? (
          <p className="empty-message">{content}</p>
        ) : (
          content
        )}
      </div>
    );
  };

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
                <h3>{user?.name || "elman"}</h3>
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
                className={activeSection === "reviews" ? "active" : ""}
                onClick={() => setActiveSection("reviews")}
              >
                My Rating & Reviews
              </li>

            </ul>
          </aside>

          {/* Main Content */}
          <section className="main-content">
            {activeSection === "profile" && renderProfileSection()}
            {activeSection === "address" && renderAddressSection()}
            {activeSection === "orders" && renderSection("orders", "My Orders", "You Haven't ordered yet.Order Something!!")}
            {activeSection === "reviews" && renderSection("reviews", "My Ratings & Reviews", "You haven't submitted any reviews yet.")}

          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserDashboard;