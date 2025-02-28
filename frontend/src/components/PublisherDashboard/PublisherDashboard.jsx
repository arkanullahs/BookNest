import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../navbar";
import Footer from "../footer";
import BookCard from "./BookCard";
import axios from "axios";
import "./PublisherDashboard.css";
import "./AllBooks.css";

const PublisherDashboard = () => {
    const [books, setBooks] = useState([]);
    const [allBooks, setAllBooks] = useState([]);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state && location.state.book) {
            setBooks((prevBooks) => [...prevBooks, location.state.book]);
        }
    }, [location]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get("http://localhost:1000/api/v1/get-all-books");
                setAllBooks(response.data.data);
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        fetchBooks();
    }, []);

    
    const totalBooks = books.length + allBooks.length;
    const totalRevenue = [...books, ...allBooks].reduce((sum, book) => sum + parseFloat(book.price || 0), 0).toFixed(2);
    const totalPublishers = new Set([...books, ...allBooks].map(book => book.publisherId)).size;

    return (
        <div className="dashboard-wrapper">
            <Navbar />
            <div className="dashboard">
                <header className="dashboard-header">
                    <h1 className="dashboard-title">Publisher Dashboard</h1>
                    <button className="add-book-btn" onClick={() => navigate("/add-book")}>Add New Book</button>
                </header>
                <div className="dashboard-container">
                    <p className="dashboard-item left">Total Books: <span className="dashboard-value">{totalBooks}</span></p>
                    <p className="dashboard-item center">Total Publishers: <span className="dashboard-value">{totalPublishers}</span></p>
                    <p className="dashboard-item right">Total Revenue: <span className="dashboard-value">${totalRevenue}</span></p>
                </div>

                {/* Newly Added Books Section */}
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

                {/* All Books Section */}
                <div className="all-books-container">
                    <h4 className="all-books-title">All Books</h4>
                    {!allBooks.length && (
                        <div className="no-books">
                            <p>No books available</p>
                        </div>
                    )}
                    <div className="books-grid">
                        {allBooks.map((item, i) => (
                            <div key={i}>
                                <BookCard data={item} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PublisherDashboard;
