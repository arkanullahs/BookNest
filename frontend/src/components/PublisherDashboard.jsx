import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { Loader2, BookOpen, DollarSign, Package, Trash2 } from 'lucide-react';
import './PublisherDashboard.css';

const PublisherDashboard = () => {
    const [user, setUser] = useState(null);
    const [books, setBooks] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        description: '',
        price: '',
        cover_image: '',
        stock: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        
        if (!token || !userData) {
            navigate('/login');
            return;
        }

        setUser(JSON.parse(userData));
        fetchBooks();
       // fetchStats();
    }, [navigate]);

    const fetchBooks = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/books', {
                headers: { 
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Accept': 'application/json'
                }
            });
            if (!response.ok) throw new Error('Failed to fetch books');
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error('Error fetching books:', error);
            setError('Failed to load books');
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/publisher/stats', {
                headers: { 
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Accept': 'application/json'
                }
            });
            if (!response.ok) throw new Error('Failed to fetch stats');
            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const handleAddBook = async (e) => {
        e.preventDefault();
        setError('');
    
        try {
            const response = await fetch('http://127.0.0.1:8000/api/books', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    ...newBook,
                    price: parseFloat(newBook.price),
                    stock: parseInt(newBook.stock)
                })
            });
    
            const responseText = await response.text(); // Read raw response
            if (!response.ok) {
                throw new Error(responseText || 'Failed to add book');
            }
    
            const data = responseText ? JSON.parse(responseText) : {}; // Ensure valid JSON
            await fetchBooks();
            setNewBook({ title: '', author: '', description: '', price: '', cover_image: '', stock: '' });
            setError('');
        } catch (error) {
            console.error('Error adding book:', error);
            setError(error.message);
        }
    };
    

    const handleDeleteBook = async (bookId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/books/${bookId}`, {
                method: 'DELETE',
                headers: { 
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete book');
            }

            await fetchBooks();
        } catch (error) {
            console.error('Error deleting book:', error);
            setError(error.message);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <Loader2 className="loading-spinner" />
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            {/* Header and Profile sections remain the same */}
            
            <div className="card">
                <h2>Add New Book</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleAddBook} className="add-book-form">
                    <input
                        type="text"
                        placeholder="Title"
                        value={newBook.title}
                        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Author"
                        value={newBook.author}
                        onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={newBook.description}
                        onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                        className="book-description"
                    />
                    <input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="Price"
                        value={newBook.price}
                        onChange={(e) => setNewBook({ ...newBook, price: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        min="0"
                        placeholder="Stock"
                        value={newBook.stock}
                        onChange={(e) => setNewBook({ ...newBook, stock: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Cover Image URL"
                        value={newBook.cover_image}
                        onChange={(e) => setNewBook({ ...newBook, cover_image: e.target.value })}
                        required
                    />
                    <button type="submit" className="btn btn-primary">Add Book</button>
                </form>
            </div>

            
            {/* Stats and Chart sections remain the same */}
        </div>
    );
};

export default PublisherDashboard;