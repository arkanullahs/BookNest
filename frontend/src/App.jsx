import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginSignup from './components/login.jsx';
import SignupPage from './components/signup.jsx';
import DashboardPage from './components/dashboard.jsx';
import WelcomePage from './components/welcome.jsx';

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
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/welcome" element={<WelcomePage />} />
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

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem('token');

  if (!authToken) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default App;