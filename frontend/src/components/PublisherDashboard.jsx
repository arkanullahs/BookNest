import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
    Book, DollarSign, ShoppingCart, MessageCircle,
    TrendingUp, Calendar, Star, Users, Plus, Edit, Trash2, X, Check,
    AlertCircle, Loader, User
} from 'lucide-react';

import './dashboard.css'; // Import your raw CSS file

const API_BASE_URL = 'http://localhost:8000/api';

// Configure axios with token from localStorage
const api = axios.create({
    baseURL: API_BASE_URL
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    console.debug('API Request:', config.url, config.method);
    return config;
});

// Add response interceptor for debugging
api.interceptors.response.use(
    response => {
        console.debug('API Response Success:', response.config.url, response.status);
        return response;
    },
    error => {
        console.error('API Response Error:', error.config?.url, error.response?.status, error.message);
        return Promise.reject(error);
    }
);

const PublisherDashboard = () => {
    // State variables
    const [loading, setLoading] = useState({
        dashboard: true,
        earnings: false,
        books: false,
        comments: false,
        bookAction: false
    });
    const [errors, setErrors] = useState({});
    const [stats, setStats] = useState(null);
    const [earnings, setEarnings] = useState([]);
    const [books, setBooks] = useState([]);
    const [comments, setComments] = useState([]);
    const [earningsPeriod, setEarningsPeriod] = useState('monthly');

    // State for book operations
    const [showBookForm, setShowBookForm] = useState(false);
    const [currentBook, setCurrentBook] = useState(null);
    const [bookFormData, setBookFormData] = useState({
        title: '',
        author: '',
        description: '',
        price: '',
        stock_quantity: '',
        cover_image: null,
        isbn: '',
        published_year: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [actionSuccess, setActionSuccess] = useState(null);

    // Function to fetch data with error handling
    const fetchWithErrorHandling = async (endpoint, stateKey, dataKey = null) => {
        try {
            setLoading(prev => ({ ...prev, [stateKey]: true }));
            console.debug(`Fetching ${endpoint}...`);

            const response = await api.get(endpoint);
            console.debug(`Successfully fetched ${endpoint}`, response.data);

            // Clear any existing errors for this endpoint
            setErrors(prev => ({ ...prev, [stateKey]: null }));

            // Return the data or the full response based on dataKey
            return dataKey ? response.data[dataKey] : response.data;
        } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error);

            // Set appropriate error message
            setErrors(prev => ({
                ...prev,
                [stateKey]: error.response?.data?.message || error.message || `Failed to fetch ${stateKey} data`
            }));

            return null;
        } finally {
            setLoading(prev => ({ ...prev, [stateKey]: false }));
        }
    };

    // Main data fetching function
    const fetchDashboardData = async () => {
        setLoading(prev => ({ ...prev, dashboard: true }));
        console.debug('Fetching all dashboard data...');

        try {
            // Fetch all data in parallel including comments with full details
            const [statsData, earningsData, booksData, commentsResponse] = await Promise.all([
                fetchWithErrorHandling('/publisher/dashboard/stats', 'stats'),
                fetchWithErrorHandling(`/publisher/earnings?period=${earningsPeriod}`, 'earnings'),
                fetchWithErrorHandling('/publisher/books', 'books'),
                fetchWithErrorHandling('/publisher/comments?include=user,book', 'comments') // Fetch comments with user and book details
            ]);

            // Update state with fetched data
            if (statsData) setStats(statsData);
            if (earningsData) setEarnings(earningsData.earnings || []);
            if (booksData) setBooks(booksData.data || []);
            if (commentsResponse) setComments(commentsResponse.comments || []); // Use response directly now

            console.debug('All dashboard data fetched successfully');
        } catch (error) {
            console.error('Error in fetchDashboardData:', error);
            // General dashboard error - already handled by individual fetch functions
        } finally {
            setLoading(prev => ({ ...prev, dashboard: false }));
        }
    };

    // Fetch data on component mount and when earningsPeriod changes
    useEffect(() => {
        fetchDashboardData();
    }, [earningsPeriod]);

    // Fetch earnings data when period changes
    const handleEarningsPeriodChange = async (period) => {
        setEarningsPeriod(period);
        // The main useEffect will handle the data fetching
    };

    // Book form handlers
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setBookFormData(prev => ({
            ...prev,
            cover_image: e.target.files[0]
        }));
    };

    const validateForm = () => {
        const errors = {};

        // Required fields validation
        if (!bookFormData.title.trim()) errors.title = 'Title is required';
        if (!bookFormData.author.trim()) errors.author = 'Author is required';
        if (!bookFormData.description.trim()) errors.description = 'Description is required';
        if (!bookFormData.isbn.trim()) errors.isbn = 'ISBN is required';
        if (!bookFormData.published_year) errors.published_year = 'Published year is required';

        // Price validation
        if (!bookFormData.price) {
            errors.price = 'Price is required';
        } else if (isNaN(parseFloat(bookFormData.price)) || parseFloat(bookFormData.price) < 0) {
            errors.price = 'Price must be a positive number';
        }

        // Stock quantity validation
        if (!bookFormData.stock_quantity) {
            errors.stock_quantity = 'Stock quantity is required';
        } else if (isNaN(parseInt(bookFormData.stock_quantity)) || parseInt(bookFormData.stock_quantity) < 0) {
            errors.stock_quantity = 'Stock quantity must be a positive number';
        }

        // Published year validation
        const currentYear = new Date().getFullYear();
        if (bookFormData.published_year &&
            (parseInt(bookFormData.published_year) < 1800 ||
                parseInt(bookFormData.published_year) > currentYear + 1)) {
            errors.published_year = `Year must be between 1800 and ${currentYear + 1}`;
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const resetForm = () => {
        setBookFormData({
            title: '',
            author: '',
            description: '',
            price: '',
            stock_quantity: '',
            cover_image: null,
            isbn: '',
            published_year: ''
        });
        setCurrentBook(null);
        setFormErrors({});
    };

    const openAddBookForm = () => {
        resetForm();
        setShowBookForm(true);
    };

    const openEditBookForm = (book) => {
        setCurrentBook(book);
        setBookFormData({
            title: book.title || '',
            author: book.author || '',
            description: book.description || '',
            price: book.price?.toString() || '',
            stock_quantity: book.stock_quantity?.toString() || '',
            isbn: book.isbn?.toString() || '',
            published_year: book.published_year?.toString() || '',
            cover_image: null
        });
        setShowBookForm(true);
    };

    const closeBookForm = () => {
        setShowBookForm(false);
        resetForm();
    };

    const showSuccessMessage = (message) => {
        setActionSuccess(message);
        setTimeout(() => setActionSuccess(null), 3000);
    };

    // CRUD operations
    const handleSubmitBook = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        setLoading(prev => ({ ...prev, bookAction: true }));

        try {
            const formData = new FormData();
            formData.append('title', bookFormData.title);
            formData.append('author', bookFormData.author);
            formData.append('description', bookFormData.description);
            formData.append('price', bookFormData.price);
            formData.append('stock_quantity', bookFormData.stock_quantity);
            formData.append('isbn', bookFormData.isbn);
            formData.append('published_year', bookFormData.published_year);

            if (bookFormData.cover_image) {
                formData.append('cover_image', bookFormData.cover_image);
            }

            console.debug('Submitting book data:', { ...bookFormData, cover_image: bookFormData.cover_image ? 'File selected' : null });

            let response;

            if (currentBook) {
                // Update existing book
                console.debug(`Updating book ID: ${currentBook.id}`);
                response = await api.post(`/books/${currentBook.id}?_method=PUT`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                // Update the books array
                setBooks(books.map(book =>
                    book.id === currentBook.id ? response.data.data : book
                ));

                showSuccessMessage('Book updated successfully!');
                console.debug('Book updated successfully', response.data);
            } else {
                // Create new book
                console.debug('Creating new book');
                response = await api.post('/books', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                // Add the new book to the books array
                setBooks([...books, response.data.data]);

                showSuccessMessage('Book added successfully!');
                console.debug('Book added successfully', response.data);
            }

            closeBookForm();

        } catch (error) {
            console.error('Error saving book:', error);

            // Handle validation errors from backend
            if (error.response && error.response.data && error.response.data.errors) {
                setFormErrors(error.response.data.errors);
                console.debug('Validation errors:', error.response.data.errors);
            } else {
                setErrors(prev => ({
                    ...prev,
                    bookAction: error.response?.data?.message || error.message || 'Failed to save book'
                }));
            }
        } finally {
            setIsSubmitting(false);
            setLoading(prev => ({ ...prev, bookAction: false }));
            // **ADD THIS LINE:**
            refreshSection('books'); // Refresh the books section after book operation
        }
    };

    const handleDeleteBook = async (bookId) => {
        if (!window.confirm('Are you sure you want to delete this book?')) {
            return;
        }

        setLoading(prev => ({ ...prev, bookAction: true }));

        try {
            console.debug(`Deleting book ID: ${bookId}`);
            await api.delete(`/books/${bookId}`);

            // Remove the deleted book from the books array
            setBooks(books.filter(book => book.id !== bookId));

            showSuccessMessage('Book deleted successfully!');
            console.debug('Book deleted successfully');
        } catch (error) {
            console.error('Error deleting book:', error);
            setErrors(prev => ({
                ...prev,
                bookAction: error.response?.data?.message || error.message || 'Failed to delete book'
            }));
        } finally {
            setLoading(prev => ({ ...prev, bookAction: false }));
        }
    };

    // Refreshes a specific section of the dashboard
    const refreshSection = async (section) => {
        console.debug(`Refreshing ${section} section`);

        switch (section) {
            case 'stats':
                const statsData = await fetchWithErrorHandling('/publisher/dashboard/stats', 'stats');
                if (statsData) setStats(statsData);
                break;
            case 'earnings':
                const earningsData = await fetchWithErrorHandling(`/publisher/earnings?period=${earningsPeriod}`, 'earnings');
                if (earningsData) setEarnings(earningsData.earnings || []);
                break;
            case 'books':
                const booksData = await fetchWithErrorHandling('/publisher/books', 'books');
                if (booksData) setBooks(booksData.data || []);
                break;
            case 'comments':
                const commentsData = await fetchWithErrorHandling('/publisher/comments?include=user,book', 'comments');
                if (commentsData) setComments(commentsData.comments || []);
                break;
            default:
                fetchDashboardData();
        }
    };

    // Loading screen for initial data loading
    if (loading.dashboard) {
        return (
            <div className="loading-screen-container">
                <div className="loading-screen-content">
                    <div className="loading-spinner-large"></div>
                    <p className="loading-text-large">Loading dashboard data...</p>
                    <p className="loading-text-small">Please wait while we retrieve your information</p>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-content-container">
                <div className="dashboard-header">
                    <h1 className="dashboard-title">Publisher Dashboard</h1>
                    <button
                        onClick={() => fetchDashboardData()}
                        className="refresh-dashboard-button"
                    >
                        <TrendingUp className="refresh-dashboard-button__icon" />
                        Refresh Dashboard
                    </button>
                </div>

                {/* Global Error Message */}
                {(errors.dashboard || errors.bookAction) && (
                    <div className="error-message-box">
                        <div className="message-box-content">
                            <AlertCircle className="message-box-content__icon" />
                            <p className="message-box-content__text">{errors.dashboard || errors.bookAction}</p>
                        </div>
                    </div>
                )}

                {/* Success message */}
                {actionSuccess && (
                    <div className="success-message-box">
                        <div className="message-box-content">
                            <Check className="message-box-content__icon success-icon" />
                            <p className="message-box-content__text">{actionSuccess}</p>
                        </div>
                    </div>
                )}

                {/* Stats Cards */}
                <div className="stats-grid">
                    <StatCard
                        title="Total Earnings"
                        value={stats?.total_earnings !== undefined ? `$${stats.total_earnings}` : 'N/A'}
                        icon={<DollarSign className="stat-card__icon icon-dollar-sign" />}
                        isLoading={loading.stats}
                        error={errors.stats}
                        onRefresh={() => refreshSection('stats')}
                    />
                    <StatCard
                        title="Books Sold"
                        value={stats?.total_books_sold !== undefined ? stats.total_books_sold.toLocaleString() : 'N/A'}
                        icon={<ShoppingCart className="stat-card__icon icon-shopping-cart" />}
                        isLoading={loading.stats}
                        error={errors.stats}
                        onRefresh={() => refreshSection('stats')}
                    />
                    <StatCard
                        title="Total Books"
                        value={books ? books.length.toLocaleString() : 'N/A'}
                        icon={<Book className="stat-card__icon icon-book" />}
                        isLoading={loading.books}
                        error={errors.books}
                        onRefresh={() => refreshSection('books')}
                    />
                    <StatCard
                        title="Recent Comments"
                        value={comments ? comments.length.toLocaleString() : 'N/A'}
                        icon={<MessageCircle className="stat-card__icon icon-message-circle" />}
                        isLoading={loading.comments}
                        error={errors.comments}
                        onRefresh={() => refreshSection('comments')}
                    />
                </div>

                {/* Earnings Chart */}
                <div className="chart-container">
                    <div className="chart-header">
                        <div className="chart-header__title-container">
                            <h2 className="chart-header__title">Earnings Overview</h2>
                            {loading.earnings && (
                                <div className="chart-header__loading-spinner"></div>
                            )}
                        </div>
                        <div className="earnings-period-buttons">
                            <button
                                onClick={() => handleEarningsPeriodChange('weekly')}
                                className={`earnings-period-button ${earningsPeriod === 'weekly' ? 'earnings-period-button--active' : 'earnings-period-button--inactive'}`}
                            >
                                Weekly
                            </button>
                            <button
                                onClick={() => handleEarningsPeriodChange('monthly')}
                                className={`earnings-period-button ${earningsPeriod === 'monthly' ? 'earnings-period-button--active' : 'earnings-period-button--inactive'}`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => handleEarningsPeriodChange('yearly')}
                                className={`earnings-period-button ${earningsPeriod === 'yearly' ? 'earnings-period-button--active' : 'earnings-period-button--inactive'}`}
                            >
                                Yearly
                            </button>
                        </div>
                    </div>
                    <div className="chart-area">
                        {errors.earnings ? (
                            <div className="chart-error-loading-nodata-container">
                                <div className="chart-error-loading-nodata-content">
                                    <AlertCircle className="chart-error-loading-nodata-content__icon chart-error-icon" />
                                    <p className="chart-error-loading-nodata-content__text chart-error-text">{errors.earnings}</p>
                                    <button
                                        onClick={() => refreshSection('earnings')}
                                        className="try-again-button"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            </div>
                        ) : loading.earnings ? (
                            <div className="chart-error-loading-nodata-container">
                                <div className="chart-error-loading-nodata-content">
                                    <div className="loading-spinner-large"></div>
                                    <p className="chart-error-loading-nodata-content__text chart-loading-text">Loading earnings data...</p>
                                </div>
                            </div>
                        ) : earnings.length === 0 ? (
                            <div className="chart-error-loading-nodata-container">
                                <div className="chart-error-loading-nodata-content">
                                    <Calendar className="chart-error-loading-nodata-content__icon nodata-icon" />
                                    <p className="chart-error-loading-nodata-content__text chart-nodata-text">No earnings data available for this period</p>
                                </div>
                            </div>
                        ) : (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={earnings}
                                    margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                    <XAxis
                                        dataKey="time_period"
                                        tick={{ fill: '#6b7280' }}
                                        tickLine={{ stroke: '#e5e7eb' }}
                                        axisLine={{ stroke: '#e5e7eb' }}
                                    />
                                    <YAxis
                                        tick={{ fill: '#6b7280' }}
                                        tickLine={{ stroke: '#e5e7eb' }}
                                        axisLine={{ stroke: '#e5e7eb' }}
                                        tickFormatter={(value) => `$${value}`}
                                    />
                                    <Tooltip
                                        formatter={(value) => [`$${value}`, 'Earnings']}
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: '1px solid #e5e7eb',
                                            borderRadius: '4px',
                                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                                        }}
                                    />
                                    <Legend />
                                    <Line
                                        type="monotone"
                                        dataKey="earnings"
                                        name="Earnings"
                                        stroke="#3b82f6"
                                        activeDot={{ r: 8, fill: '#2563eb' }}
                                        strokeWidth={2}
                                        dot={{ stroke: '#3b82f6', strokeWidth: 2, r: 4, fill: 'white' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        )}
                    </div>
                </div>

                {/* Books Performance and Comments */}
                <div className="chart-section-grid">
                    {/* Books Performance */}
                    <div className="book-performance-container">
                        <div className="book-performance-header">
                            <div className="book-performance-header__title-container">
                                <h2 className="book-performance-header__title">Book Performance</h2>
                                {loading.stats && (
                                    <div className="chart-header__loading-spinner"></div>
                                )}
                            </div>
                            <button
                                onClick={() => refreshSection('stats')}
                                className="trending-up-button"
                            >
                                <TrendingUp className="trending-up-button__icon" />
                            </button>
                        </div>
                        <div className="chart-area">
                            {errors.stats ? (
                                <div className="chart-error-loading-nodata-container">
                                    <div className="chart-error-loading-nodata-content">
                                        <AlertCircle className="chart-error-loading-nodata-content__icon chart-error-icon" />
                                        <p className="chart-error-loading-nodata-content__text chart-error-text">{errors.stats}</p>
                                        <button
                                            onClick={() => refreshSection('stats')}
                                            className="try-again-button"
                                        >
                                            Try Again
                                        </button>
                                    </div>
                                </div>
                            ) : loading.stats ? (
                                <div className="chart-error-loading-nodata-container">
                                    <div className="chart-error-loading-nodata-content">
                                        <div className="loading-spinner-large"></div>
                                        <p className="chart-error-loading-nodata-content__text chart-loading-text">Loading book performance data...</p>
                                    </div>
                                </div>
                            ) : !stats?.books_performance || stats.books_performance.length === 0 ? (
                                <div className="chart-error-loading-nodata-container">
                                    <div className="chart-error-loading-nodata-content">
                                        <Book className="chart-error-loading-nodata-content__icon nodata-icon" />
                                        <p className="chart-error-loading-nodata-content__text chart-nodata-text">No book performance data available</p>
                                    </div>
                                </div>
                            ) : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={stats.books_performance.slice(0, 5)}
                                        margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                        <XAxis
                                            dataKey="title"
                                            tick={{ fill: '#6b7280', fontSize: 12 }}
                                            tickLine={{ stroke: '#e5e7eb' }}
                                            axisLine={{ stroke: '#e5e7eb' }}
                                            interval={0}
                                            tickFormatter={(value) => value.length > 15 ? `${value.slice(0, 15)}...` : value}
                                        />
                                        <YAxis
                                            tick={{ fill: '#6b7280' }}
                                            tickLine={{ stroke: '#e5e7eb' }}
                                            axisLine={{ stroke: '#e5e7eb' }}
                                        />
                                        <Tooltip
                                            formatter={(value, name) => [name === 'average_rating' ?
                                                Number(value) :
                                                Number(value).toLocaleString(),
                                            name === 'average_rating' ? 'Rating' : 'Sales']}
                                            contentStyle={{
                                                backgroundColor: 'white',
                                                border: '1px solid #e5e7eb',
                                                borderRadius: '4px',
                                                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
                                            }}
                                            labelFormatter={(label) => label.length > 25 ? `${label.slice(0, 25)}...` : label}
                                        />
                                        <Legend />
                                        <Bar name="Sales" dataKey="total_sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                        <Bar name="Rating" dataKey="average_rating" fill="#10b981" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </div>

                    {/* Latest Comments */}
                    <div className="comments-container">
                        <div className="comments-header">
                            <div className="comments-header__title-container">
                                <h2 className="comments-header__title">Latest Comments</h2>
                                {loading.comments && (
                                    <div className="chart-header__loading-spinner"></div>
                                )}
                            </div>
                            <button
                                onClick={() => refreshSection('comments')}
                                className="comments-refresh-button"
                            >
                                <TrendingUp className="comments-refresh-button__icon" />
                            </button>
                        </div>

                        {errors.comments ? (
                            <div className="chart-error-loading-nodata-container">
                                <div className="chart-error-loading-nodata-content">
                                    <AlertCircle className="chart-error-loading-nodata-content__icon chart-error-icon" />
                                    <p className="chart-error-loading-nodata-content__text chart-error-text">{errors.comments}</p>
                                    <button
                                        onClick={() => refreshSection('comments')}
                                        className="try-again-button"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            </div>
                        ) : loading.comments ? (
                            <div className="chart-error-loading-nodata-container">
                                <div className="chart-error-loading-nodata-content">
                                    <div className="loading-spinner-large"></div>
                                    <p className="chart-error-loading-nodata-content__text chart-loading-text">Loading comments data...</p>
                                </div>
                            </div>
                        ) : comments.length === 0 ? (
                            <div className="chart-error-loading-nodata-container">
                                <div className="chart-error-loading-nodata-content">
                                    <MessageCircle className="chart-error-loading-nodata-content__icon nodata-icon" />
                                    <p className="chart-error-loading-nodata-content__text chart-nodata-text">No comments data available</p>
                                </div>
                            </div>
                        ) : (
                            <div className="comments-list-container">
                                {comments.map(comment => (
                                    <div key={comment.id} className="comment-item">
                                        <div className="comment-header-container">
                                            <div className="comment-author-info">
                                                <User className="comment-author-icon" />
                                                <span className="comment-author-name">
                                                    {comment.user?.name || 'Anonymous User'}
                                                </span>
                                            </div>
                                            <span className="comment-book-title">
                                                on &quot;{comment.book?.title || 'Unknown Book'}&quot;
                                            </span>
                                        </div>
                                        <p className="comment-text">{comment.text}</p>
                                        <div className="comment-footer">
                                            <span className="comment-date">
                                                {new Date(comment.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Books CRUD Section - **INSERT HERE** */}
                <div className="books-crud-container">
                    <div className="books-crud-header">
                        <h2 className="books-crud-title">Manage Books</h2>
                        <button onClick={openAddBookForm} className="add-book-button">
                            <Plus className="add-book-button__icon" />
                            Add New Book
                        </button>
                    </div>

                    {errors.books && (
                        <div className="error-message-box">
                            <div className="message-box-content">
                                <AlertCircle className="message-box-content__icon" />
                                <p className="message-box-content__text">{errors.books}</p>
                            </div>
                        </div>
                    )}

                    {loading.books ? (
                        <div className="books-loading-container">
                            <div className="loading-spinner-large"></div>
                            <p className="loading-text-large">Loading books...</p>
                        </div>
                    ) : books.length === 0 ? (
                        <div className="no-books-message-container">
                            <Book className="no-books-message__icon" />
                            <p className="no-books-message__text">No books available. Click "Add New Book" to get started.</p>
                        </div>
                    ) : (
                        <div className="books-list">
                            {books.map(book => (
                                <div key={book.id} className="book-item-card">
                                    <div className="book-card-content">
                                        <div className="book-cover-container">
                                            <img
                                                src={book.cover_image}
                                                alt={book.title}
                                                className="book-cover-image"
                                                onError={(e) => { e.target.onerror = null; e.target.src = 'placeholder-cover.png'; }} // Placeholder if image fails
                                            />
                                        </div>
                                        <div className="book-details">
                                            <h3 className="book-title-card">{book.title}</h3>
                                            <p className="book-author-card">By {book.author}</p>
                                            <p className="book-isbn-card">ISBN: {book.isbn}</p>
                                            <p className="book-price-card">Price: ${book.price}</p>
                                            <p className="book-stock-card">Stock: {book.stock_quantity}</p>
                                            <p className="book-year-card">Published: {book.published_year}</p>
                                            <p className="book-description-card">{book.description.slice(0, 100)}...</p> {/* Shorten description */}
                                        </div>
                                    </div>
                                    <div className="book-card-actions">
                                        <button onClick={() => openEditBookForm(book)} className="edit-book-button" title="Edit Book">
                                            <Edit className="book-action-icon" />
                                        </button>
                                        <button onClick={() => handleDeleteBook(book.id)} className="delete-book-button" title="Delete Book">
                                            <Trash2 className="book-action-icon" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>


                {/* Book Form Modal */}
                {showBookForm && (
                    <div className="book-form-modal-overlay">
                        <div className="book-form-modal">
                            <div className="book-form-header">
                                <h2 className="book-form-title">{currentBook ? 'Edit Book' : 'Add New Book'}</h2>
                                <button onClick={closeBookForm} className="close-book-form-button">
                                    <X className="close-form-icon" />
                                </button>
                            </div>

                            {errors.bookAction && (
                                <div className="error-message-box small-error-box">
                                    <div className="message-box-content">
                                        <AlertCircle className="message-box-content__icon small-error-icon" />
                                        <p className="message-box-content__text">{errors.bookAction}</p>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmitBook} className="book-form">
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label htmlFor="title" className="form-label">Title <span className="required">*</span></label>
                                        <input type="text" id="title" name="title" className="form-input" value={bookFormData.title} onChange={handleInputChange} />
                                        {formErrors.title && <p className="form-error">{formErrors.title}</p>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="author" className="form-label">Author <span className="required">*</span></label>
                                        <input type="text" id="author" name="author" className="form-input" value={bookFormData.author} onChange={handleInputChange} />
                                        {formErrors.author && <p className="form-error">{formErrors.author}</p>}
                                    </div>

                                    <div className="form-group full-width">
                                        <label htmlFor="description" className="form-label">Description <span className="required">*</span></label>
                                        <textarea id="description" name="description" className="form-textarea" value={bookFormData.description} onChange={handleInputChange}></textarea>
                                        {formErrors.description && <p className="form-error">{formErrors.description}</p>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="isbn" className="form-label">ISBN <span className="required">*</span></label>
                                        <input type="text" id="isbn" name="isbn" className="form-input" value={bookFormData.isbn} onChange={handleInputChange} />
                                        {formErrors.isbn && <p className="form-error">{formErrors.isbn}</p>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="published_year" className="form-label">Published Year <span className="required">*</span></label>
                                        <input type="number" id="published_year" name="published_year" className="form-input" value={bookFormData.published_year} onChange={handleInputChange} />
                                        {formErrors.published_year && <p className="form-error">{formErrors.published_year}</p>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="price" className="form-label">Price ($) <span className="required">*</span></label>
                                        <input type="number" id="price" name="price" className="form-input" value={bookFormData.price} onChange={handleInputChange} step="0.01" />
                                        {formErrors.price && <p className="form-error">{formErrors.price}</p>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="stock_quantity" className="form-label">Stock Quantity <span className="required">*</span></label>
                                        <input type="number" id="stock_quantity" name="stock_quantity" className="form-input" value={bookFormData.stock_quantity} onChange={handleInputChange} />
                                        {formErrors.stock_quantity && <p className="form-error">{formErrors.stock_quantity}</p>}
                                    </div>

                                    <div className="form-group full-width">
                                        <label htmlFor="cover_image" className="form-label">Cover Image</label>
                                        <input type="file" id="cover_image" name="cover_image" className="form-file-input" onChange={handleFileChange} />
                                        {formErrors.cover_image && <p className="form-error">{formErrors.cover_image}</p>}
                                    </div>
                                </div>

                                <div className="form-actions">
                                    <button type="submit" className="submit-button" disabled={isSubmitting}>
                                        {isSubmitting ? <Loader className="submit-button__icon loader-icon" /> : <Check className="submit-button__icon check-icon" />}
                                        {currentBook ? 'Update Book' : 'Add Book'}
                                    </button>
                                    <button type="button" className="cancel-button" onClick={closeBookForm} disabled={isSubmitting}>
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}


            </div>
        </div>
    );
};

// StatCard Component
const StatCard = ({ title, value, icon, isLoading, error, onRefresh }) => (
    <div className="stat-card">
        <div className="stat-card__header">
            <div className="stat-card__header-icon-title">
                <div className="stat-card__header-icon-container">{icon}</div>
                <h3 className="stat-card__header-title">{title}</h3>
            </div>
            {isLoading ? (
                <div className="stat-card__loading-spinner"></div>
            ) : (
                <button onClick={onRefresh} className="stats-refresh-button">
                    <TrendingUp className="stats-refresh-button__icon" />
                </button>
            )}
        </div>
        <div>
            {error ? (
                <p className="stat-card__error-text">{error}</p>
            ) : (
                <p className="stat-card__value">{value}</p>
            )}
        </div>
    </div>
);


export default PublisherDashboard;