import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
    Book, DollarSign, ShoppingCart, MessageCircle,
    TrendingUp, Calendar, Star, Users
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

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard
                    title="Total Earnings"
                    value={`$${stats?.total_earnings?.toFixed(2) || 0}`}
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

            {/* Books List */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b">
                    <h2 className="text-xl font-semibold">Your Books</h2>
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
                            {books?.map((book) => (
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
                                            <span className="text-sm text-gray-900 mr-1">{book.average_rating?.toFixed(1) || 'N/A'}</span>
                                            {book.average_rating && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{book.stock_quantity}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">${book.price}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                                        <button className="text-red-600 hover:text-red-900">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
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