import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginSignup from './components/login.jsx';
import SignupPage from './components/signup.jsx';
import DashboardPage from './components/dashboard.jsx';
import WelcomePage from './components/welcome.jsx';
import LandingPage from './components/landingpage.jsx';
import About from './components/about.jsx';
import PublisherSignupPage from './components/publishersignup.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import PublisherDashboard from './components/PublisherDashboard.jsx';
import UserDashboard from './components/UserDashboard.jsx';
//import NewLogin from './components/newLoginSignup.jsx'; // Importing the new page

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to Booknest</h1>
      <p className="toggle-text">
        Have an account?
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
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/publisher-dashboard"
          element={
            <ProtectedRoute allowedRoles={['publisher']}>
              <PublisherDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/publishersignup" element={<PublisherSignupPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

const ProtectedRoute = ({ children, allowedRoles }) => {
  const authToken = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!authToken) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />; // Redirect if role is not allowed
  }

  return children;
};

export default App;
