import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "./logout";
import Navbar from "./navbar";
import Footer from "./footer";
import "./UserDashboard.css";

const UserDashboard = () => {
    const [user, setUser] = useState(null);
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    // Fetch user data from localStorage
    useEffect(() => {
        const fetchUserData = () => {
            const token = localStorage.getItem("token");
            const userData = localStorage.getItem("user");

            if (!token || !userData) {
                navigate("/login");
                return;
            }

            setUser(JSON.parse(userData));
        };

        fetchUserData();
    }, [navigate]);

    // Fetch books from Laravel backend using fetch API
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/books"); // Adjust URL based on Laravel setup
                if (!response.ok) {
                    throw new Error("Failed to fetch books");
                }
                const data = await response.json();
                setBooks(data);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };

        fetchBooks();
    }, []);

    return (
        <div className="dashboard-container">
            <Navbar />
            <div className="dashboard-content">
                {/* User Info Section */}
                <div className="user-info">
                    <h2>User Dashboard</h2>
                    {user ? (
                        <div className="user-details">
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Role:</strong> {user.role}</p>
                            <button className="logout-btn" onClick={() => logout(navigate)}>Logout</button>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>

                {/* Books Section */}
                <div className="books-section">
                    <h2>Available Books</h2>
                    <div className="books-grid">
                        {books.length > 0 ? (
                            books.map((book) => (
                                <div key={book.id} className="book-card">
                                    <h3>{book.title}</h3>
                                    <p><strong>Author:</strong> {book.author}</p>
                                    <p><strong>Price:</strong> ${book.price}</p>
                                    <div className="book-buttons">
                                        <button className="cart-btn">Add to Cart</button>
                                        <button className="buy-btn">Buy Now</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No books available</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserDashboard;
