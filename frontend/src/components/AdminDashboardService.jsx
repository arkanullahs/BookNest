import React, { useState, useEffect } from "react";
import "./AdminDashBoard.css";

const AdminDashBoard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState({
    totalBooks: 120,
    totalOrders: 75,
    totalUsers: 50,
  });

  const [recentOrders, setRecentOrders] = useState([
    { id: 1, customer: "John Doe", book: "The Alchemist", status: "Shipped" },
    { id: 2, customer: "Jane Smith", book: "Atomic Habits", status: "Pending" },
    { id: 3, customer: "Michael Brown", book: "Deep Work", status: "Delivered" },
  ]);

  useEffect(() => {
    // Simulate fetching updated stats from an API
    setTimeout(() => {
      setStats({ totalBooks: 125, totalOrders: 80, totalUsers: 55 });
    }, 2000);
  }, []);

  return (
    <div className="admin-dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
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

      {/* Main Content */}
      <div className="admin-main">
        <h1 className="dashboard-title">Admin Dashboard</h1>

        {/* Search Bar */}
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button>
            <FiSearch />
          </button>
        </div>

        {/* Stats Section */}
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

        {/* Recent Orders */}
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
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.customer}</td>
                  <td>{order.book}</td>
                  <td className={`status ${order.status.toLowerCase()}`}>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
