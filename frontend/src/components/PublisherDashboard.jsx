import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from './logout';
import { PlusCircle, Trash2, Edit2, RefreshCw } from 'lucide-react';

const PublisherDashboard = () => {
    const [user, setUser] = useState(null);
    const [books, setBooks] = useState([]);
    const [stats, setStats] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        cover_image: null,
        stock_quantity: '',
        isbn: '',
        author: '',
        published_year: ''
    });
    const [editingBook, setEditingBook] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const userData = localStorage.getItem('user');

            if (!token || !userData) {
                navigate('/login');
                return;
            }

            setUser(JSON.parse(userData));
            await Promise.all([
                fetchBooks(),
                //fetchStats(),
                //fetchComments()
            ]);
            setLoading(false);
        };

        fetchData();
    }, [navigate]);

    const fetchBooks = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/publisher/books', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const fetchStats = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/publisher/dashboard/stats', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const fetchComments = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/publisher/comments', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            const data = await response.json();
            setComments(data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataObj = new FormData();

        Object.keys(formData).forEach(key => {
            if (key === 'cover_image' && formData[key]) {
                formDataObj.append(key, formData[key]);
            } else if (formData[key]) {
                formDataObj.append(key, formData[key]);
            }
        });

        try {
            const url = editingBook
                ? `http://127.0.0.1:8000/api/books/${editingBook.id}`
                : 'http://127.0.0.1:8000/api/books';

            const method = editingBook ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formDataObj
            });

            if (response.ok) {
                setFormData({
                    title: '',
                    description: '',
                    price: '',
                    cover_image: null,
                    stock_quantity: '',
                    isbn: '',
                    author: '',
                    published_year: ''
                });
                setEditingBook(null);
                fetchBooks();
            }
        } catch (error) {
            console.error('Error submitting book:', error);
        }
    };

    const handleDelete = async (bookId) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/books/${bookId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.ok) {
                    fetchBooks();
                }
            } catch (error) {
                console.error('Error deleting book:', error);
            }
        }
    };

    if (loading) {
        return <div className="p-4">Loading...</div>;
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold">Publisher Dashboard</h2>
                    <p className="text-gray-600">Welcome, {user?.name}</p>
                </div>
                <button
                    onClick={() => logout(navigate)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-semibold mb-2">Total Earnings</h3>
                    <p className="text-2xl">${stats?.total_earnings || 0}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-semibold mb-2">Books Sold</h3>
                    <p className="text-2xl">{stats?.total_books_sold || 0}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-semibold mb-2">Total Books</h3>
                    <p className="text-2xl">{books.length}</p>
                </div>
            </div>

            {/* Book Form */}
            <div className="bg-white p-6 rounded-lg shadow mb-8">
                <h3 className="text-xl font-semibold mb-4">
                    {editingBook ? 'Edit Book' : 'Add New Book'}
                </h3>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Author"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        className="border p-2 rounded"
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="border p-2 rounded"
                    />
                    <input
                        type="number"
                        placeholder="Stock Quantity"
                        value={formData.stock_quantity}
                        onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                        className="border p-2 rounded"
                    />
                    <input
                        type="text"
                        placeholder="ISBN"
                        value={formData.isbn}
                        onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                        className="border p-2 rounded"
                    />
                    <input
                        type="number"
                        placeholder="Published Year"
                        value={formData.published_year}
                        onChange={(e) => setFormData({ ...formData, published_year: e.target.value })}
                        className="border p-2 rounded"
                    />
                    <textarea
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="border p-2 rounded md:col-span-2"
                    />
                    <input
                        type="file"
                        onChange={(e) => setFormData({ ...formData, cover_image: e.target.files[0] })}
                        className="border p-2 rounded md:col-span-2"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 md:col-span-2"
                    >
                        {editingBook ? 'Update Book' : 'Add Book'}
                    </button>
                </form>
            </div>

            {/* Books List */}
            <div className="bg-white p-6 rounded-lg shadow mb-8">
                <h3 className="text-xl font-semibold mb-4">Your Books</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {books.map(book => (
                        <div key={book.id} className="border p-4 rounded">
                            <img
                                src={book.cover_image}
                                alt={book.title}
                                className="w-full h-48 object-cover mb-2 rounded"
                            />
                            <h4 className="font-semibold">{book.title}</h4>
                            <p className="text-gray-600">{book.author}</p>
                            <p className="text-gray-600">Stock: {book.stock_quantity}</p>
                            <p className="text-gray-600">Sold: {book.total_sales || 0}</p>
                            <div className="flex justify-end gap-2 mt-2">
                                <button
                                    onClick={() => setEditingBook(book)}
                                    className="p-2 text-blue-500 hover:text-blue-600"
                                >
                                    <Edit2 size={20} />
                                </button>
                                <button
                                    onClick={() => handleDelete(book.id)}
                                    className="p-2 text-red-500 hover:text-red-600"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Comments */}
            <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-xl font-semibold mb-4">Recent Comments</h3>
                <div className="space-y-4">
                    {comments.map(comment => (
                        <div key={comment.id} className="border-b pb-4">
                            <div className="flex justify-between">
                                <p className="font-semibold">{comment.user.name}</p>
                                <p className="text-gray-600">
                                    {new Date(comment.created_at).toLocaleDateString()}
                                </p>
                            </div>
                            <p className="text-gray-600">{comment.content}</p>
                            <div className="flex items-center mt-1">
                                <span className="text-yellow-500">
                                    {'★'.repeat(comment.rating)}
                                    {'☆'.repeat(5 - comment.rating)}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PublisherDashboard;