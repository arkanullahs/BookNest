import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginSignup from './components/login.jsx';
import SignupPage from './components/signup.jsx';
import DashboardPage from './components/dashboard.jsx';
import WelcomePage from './components/welcome.jsx';
import LandingPage from './components/landingpage.jsx';
import About from './components/about.jsx';
import PublisherSignupPage from './components/publishersignup.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import PublisherDashboard from './components/PublisherDashboard/PublisherDashboard.jsx';
import UserDashboard from './components/UserDashboard.jsx';
import AddBook from './components/PublisherDashboard/AddBook.jsx';
import BookCard from './components/PublisherDashboard/BookCard.jsx';
import ViewBookDetails  from './components/PublisherDashboard/viewBookDetails.jsx';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to Booknest</h1>
      <p className="toggle-text">
        Have an account?{' '}
        <span onClick={() => navigate('/login')} className="toggle-link">
          login
        </span>
      </p>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        
        <Route path="/admin-dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/user-dashboard" element={<ProtectedRoute allowedRoles={['user']}><UserDashboard /></ProtectedRoute>} />
        
        {/* Publisher Dashboard is now accessible directly */}
        <Route path="/publisher-dashboard" element={<PublisherDashboard />} />
        <Route path="/publishersignup" element={<PublisherSignupPage />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
        <Route path="/add-book" element={< AddBook />} />
        <Route path="/book-card" element={<BookCard />} />
        <Route path="/view-book" element={<ViewBookDetails />} />
      </Routes>
    </Router>
  );
}

// Function to protect routes
const ProtectedRoute = ({ children, allowedRoles }) => {
  const authToken = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!authToken) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default App;
