import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './components/login.jsx';
import SignupPage from './components/signup.jsx';

const HomePage = () => {
  return <h1>Welcome to the Home Page!</h1>;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
