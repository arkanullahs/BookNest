import React, { useState, useEffect } from "react";
import { FiBook, FiShoppingCart, FiUsers, FiSearch, FiMenu } from "react-icons/fi";
import "./AdminDashBoard.css";

const AdminDashBoard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState({
    totalBooks: 120,
    totalOrders: 75,
    totalUsers: 50,
  });

  useEffect(() => {
    setTimeout(() => {
      setStats({ totalBooks: 125, totalOrders: 80, totalUsers: 55 });
    }, 2000);
  }, []);

  return (
    <div className="admin-dashboard-container">
      {/* Sidebar */}
      <div className={sidebarOpen ? "sidebar open" : "sidebar closed"}> 
        <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <FiMenu />
        </button>
        <h2 className="sidebar-title">Bookstore Admin</h2>
        <ul className="sidebar-menu">
          <li>📚 Manage Books</li>
          <li>🛒 Manage Orders</li>
          <li>👥 Manage Users</li>
          <li>📈 Analytics</li>
          <li className="logout">🚪 Logout</li>
        </ul>
      </div>

      <div className="admin-main">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button>
            <FiSearch />
          </button>
        </div>
        <div className="stats-container">
          <div className="stat-card">
            <FiBook className="stat-icon" />
            <h2>{stats.totalBooks}</h2>
            <p>Total Books</p>
          </div>
          <div className="stat-card">
            <FiShoppingCart className="stat-icon" />
            <h2>{stats.totalOrders}</h2>
            <p>Total Orders</p>
          </div>
          <div className="stat-card">
            <FiUsers className="stat-icon" />
            <h2>{stats.totalUsers}</h2>
            <p>Total Users</p>
          </div>
        </div>
        <div className="recent-orders">
          <h2>Recent Orders</h2>
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Book</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John Doe</td>
                <td>The Alchemist</td>
                <td className="status shipped">Shipped</td>
              </tr>
              <tr>
                <td>Jane Smith</td>
                <td>Atomic Habits</td>
                <td className="status pending">Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
