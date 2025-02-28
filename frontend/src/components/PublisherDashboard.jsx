import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
    Book, DollarSign, ShoppingCart, MessageCircle,
    TrendingUp, Calendar, Star, Users, Plus, Edit, Trash2, X, Check
} from 'lucide-react';

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
    return config;
});

const PublisherDashboard = () => {
    const [loading, setLoading] = useState(true);
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
        cover_image: null
    });
    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [actionSuccess, setActionSuccess] = useState(null);

    useEffect(() => {
        // Fetch all publisher data
        const fetchData = async () => {
            setLoading(true);
            try {
                const [statsResponse, earningsResponse, booksResponse, commentsResponse] = await Promise.all([
                    api.get('/publisher/dashboard/stats'),
                    api.get(`/publisher/earnings?period=${earningsPeriod}`),
                    api.get('/publisher/books'),
                    api.get('/publisher/comments')
                ]);

                setStats(statsResponse.data);
                setEarnings(earningsResponse.data.earnings);
                setBooks(booksResponse.data.data);
                setComments(commentsResponse.data.comments);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [earningsPeriod]);

    const handleEarningsPeriodChange = (period) => {
        setEarningsPeriod(period);
    };

    // Book form handlers
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBookFormData({
            ...bookFormData,
            [name]: value
        });
    };

    const handleFileChange = (e) => {
        setBookFormData({
            ...bookFormData,
            cover_image: e.target.files[0]
        });
    };

    const validateForm = () => {
        const errors = {};
        if (!bookFormData.title) errors.title = 'Title is required';
        if (!bookFormData.price) errors.price = 'Price is required';
        if (isNaN(parseFloat(bookFormData.price))) errors.price = 'Price must be a number';
        if (!bookFormData.stock_quantity) errors.stock_quantity = 'Stock quantity is required';
        if (isNaN(parseInt(bookFormData.stock_quantity))) errors.stock_quantity = 'Stock quantity must be a number';

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
            cover_image: null
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
            title: book.title,
            author: book.author,
            description: book.description || '',
            price: book.price.toString(),
            stock_quantity: book.stock_quantity.toString(),
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

        try {
            const formData = new FormData();
            formData.append('title', bookFormData.title);
            formData.append('author', bookFormData.author);
            formData.append('description', bookFormData.description);
            formData.append('price', bookFormData.price);
            formData.append('stock_quantity', bookFormData.stock_quantity);

            if (bookFormData.cover_image) {
                formData.append('cover_image', bookFormData.cover_image);
            }

            let response;

            if (currentBook) {
                // Update existing book
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
            } else {
                // Create new book
                response = await api.post('/books', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                // Add the new book to the books array
                setBooks([...books, response.data.data]);

                showSuccessMessage('Book added successfully!');
            }

            closeBookForm();
        } catch (error) {
            console.error('Error saving book:', error);

            // Handle validation errors from backend
            if (error.response && error.response.data && error.response.data.errors) {
                setFormErrors(error.response.data.errors);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteBook = async (bookId) => {
        if (!window.confirm('Are you sure you want to delete this book?')) {
            return;
        }

        try {
            await api.delete(`/books/${bookId}`);

            // Remove the deleted book from the books array
            setBooks(books.filter(book => book.id !== bookId));

            showSuccessMessage('Book deleted successfully!');
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Publisher Dashboard</h1>

            {/* Success message */}
            {actionSuccess && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded">
                    <div className="flex items-center">
                        <Check className="h-5 w-5 mr-2" />
                        <p>{actionSuccess}</p>
                    </div>
                </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Earnings"
                    value={stats?.total_earnings || 0}
                    icon={<DollarSign className="h-8 w-8 text-green-500" />}
                />
                <StatCard
                    title="Books Sold"
                    value={stats?.total_books_sold || 0}
                    icon={<ShoppingCart className="h-8 w-8 text-blue-500" />}
                />
                <StatCard
                    title="Total Books"
                    value={books?.length || 0}
                    icon={<Book className="h-8 w-8 text-purple-500" />}
                />
                <StatCard
                    title="Recent Comments"
                    value={comments?.length || 0}
                    icon={<MessageCircle className="h-8 w-8 text-yellow-500" />}
                />
            </div>

            {/* Earnings Chart */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Earnings Overview</h2>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => handleEarningsPeriodChange('weekly')}
                            className={`px-3 py-1 rounded ${earningsPeriod === 'weekly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        >
                            Weekly
                        </button>
                        <button
                            onClick={() => handleEarningsPeriodChange('monthly')}
                            className={`px-3 py-1 rounded ${earningsPeriod === 'monthly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => handleEarningsPeriodChange('yearly')}
                            className={`px-3 py-1 rounded ${earningsPeriod === 'yearly' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        >
                            Yearly
                        </button>
                    </div>
                </div>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            data={earnings}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time_period" />
                            <YAxis />
                            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                            <Legend />
                            <Line type="monotone" dataKey="earnings" stroke="#3b82f6" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Books Performance and Comments */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Books Performance */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Book Performance</h2>
                    {stats?.books_performance?.length > 0 ? (
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                    data={stats.books_performance.slice(0, 5)}
                                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="title" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar name="Sales" dataKey="total_sales" fill="#3b82f6" />
                                    <Bar name="Rating" dataKey="average_rating" fill="#10b981" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    ) : (
                        <p className="text-gray-500">No book performance data available.</p>
                    )}
                </div>

                {/* Latest Comments */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold mb-4">Latest Comments</h2>
                    {comments?.length > 0 ? (
                        <div className="divide-y">
                            {comments.slice(0, 5).map((comment) => (
                                <div key={comment.id} className="py-3">
                                    <div className="flex justify-between">
                                        <span className="font-medium">{comment.user?.name || 'Anonymous'}</span>
                                        <div className="flex items-center">
                                            <span className="mr-1">{comment.rating}</span>
                                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                        </div>
                                    </div>
                                    <p className="text-gray-600 mt-1">{comment.content}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No comments available.</p>
                    )}
                </div>
            </div>

            {/* Books List with CRUD */}
            <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
                <div className="px-6 py-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Your Books</h2>
                    <button
                        onClick={openAddBookForm}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center"
                    >
                        <Plus className="h-4 w-4 mr-1" />
                        Add New Book
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {books?.length > 0 ? (
                                books.map((book) => (
                                    <tr key={book.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-8 bg-gray-200 rounded flex-shrink-0">
                                                    {book.cover_image && (
                                                        <img
                                                            src={book.cover_image}
                                                            alt={book.title}
                                                            className="h-10 w-8 object-cover rounded"
                                                        />
                                                    )}
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">{book.title}</div>
                                                    <div className="text-sm text-gray-500">{book.author}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{book.total_sold || 0}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <span className="text-sm text-gray-900 mr-1">{book.average_rating || 'N/A'}</span>
                                                {book.average_rating && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{book.stock_quantity}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">${book.price}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => openEditBookForm(book)}
                                                className="text-indigo-600 hover:text-indigo-900 mr-3 flex items-center"
                                            >
                                                <Edit className="h-4 w-4 mr-1" />
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteBook(book.id)}
                                                className="text-red-600 hover:text-red-900 flex items-center"
                                            >
                                                <Trash2 className="h-4 w-4 mr-1" />
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                        No books found. Add your first book to get started.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Book Form Modal */}
            {showBookForm && (
                <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                        <div className="flex justify-between items-center px-6 py-4 border-b">
                            <h3 className="text-lg font-semibold">
                                {currentBook ? 'Edit Book' : 'Add New Book'}
                            </h3>
                            <button onClick={closeBookForm} className="text-gray-400 hover:text-gray-600">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmitBook}>
                            <div className="px-6 py-4">
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                                        Title *
                                    </label>
                                    <input
                                        id="title"
                                        name="title"
                                        type="text"
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.title ? 'border-red-500' : ''}`}
                                        value={bookFormData.title}
                                        onChange={handleInputChange}
                                    />
                                    {formErrors.title && <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
                                        Author
                                    </label>
                                    <input
                                        id="author"
                                        name="author"
                                        type="text"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        value={bookFormData.author}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows="3"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        value={bookFormData.description}
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                                        Price *
                                    </label>
                                    <input
                                        id="price"
                                        name="price"
                                        type="text"
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.price ? 'border-red-500' : ''}`}
                                        value={bookFormData.price}
                                        onChange={handleInputChange}
                                    />
                                    {formErrors.price && <p className="text-red-500 text-xs mt-1">{formErrors.price}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock_quantity">
                                        Stock Quantity *
                                    </label>
                                    <input
                                        id="stock_quantity"
                                        name="stock_quantity"
                                        type="number"
                                        className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formErrors.stock_quantity ? 'border-red-500' : ''}`}
                                        value={bookFormData.stock_quantity}
                                        onChange={handleInputChange}
                                    />
                                    {formErrors.stock_quantity && <p className="text-red-500 text-xs mt-1">{formErrors.stock_quantity}</p>}
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cover_image">
                                        Cover Image
                                    </label>
                                    <input
                                        id="cover_image"
                                        name="cover_image"
                                        type="file"
                                        accept="image/*"
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        onChange={handleFileChange}
                                    />
                                    {currentBook && currentBook.cover_image && (
                                        <div className="mt-2">
                                            <p className="text-xs text-gray-500">Current image will be kept if no new image is uploaded.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-gray-50 text-right">
                                <button
                                    type="button"
                                    onClick={closeBookForm}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center">
                                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                                            Saving...
                                        </span>
                                    ) : (
                                        <span>Save Book</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const StatCard = ({ title, value, icon }) => (
    <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
            <div className="mr-4">{icon}</div>
            <div>
                <h3 className="text-gray-500 text-sm">{title}</h3>
                <p className="text-2xl font-bold">{value}</p>
            </div>
        </div>
    </div>
);

export default PublisherDashboard;