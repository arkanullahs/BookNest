import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import "./newLoginSignup.css";
import Navbar from './navbar';
import Footer from './footer';

const SignInSignUp = () => {
  const [signUpMode, setSignUpMode] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const endpoint = "http://127.0.0.1:8000/api/register";
    const payload = { username, email, password, role };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("user", JSON.stringify(data.user));

        if (data.role === "admin") {
          navigate("/admin-dashboard");
        } else if (data.role === "publisher") {
          navigate("/publisher-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
      setError("Unable to connect to the server.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login-container">
        <div className={`container ${signUpMode ? "sign-up-mode" : ""}`}>
          <div className="forms-container">
            <div className="signin-signup">
              {/* Sign In Form */}
              <form className="sign-in-form">
                <h2 className="title">Sign in</h2>
                <div className="input-field">
                  <i className="fas fa-user"></i>
                  <input 
                    type="text" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                </div>
                <div className="input-field">
                  <i className="fas fa-lock"></i>
                  <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                </div>
                <input type="submit" value="Login" className="btn solid" />
              </form>

              {/* Sign Up Form */}
              <form className="sign-up-form" onSubmit={handleSignUp}>
                <h2 className="title">Sign up</h2>
                <div className="input-field">
                  <i className="fas fa-user"></i>
                  <input 
                    type="text" 
                    placeholder="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                  />
                </div>
                <div className="input-field">
                  <i className="fas fa-envelope"></i>
                  <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                  />
                </div>
                <div className="input-field">
                  <i className="fas fa-lock"></i>
                  <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                  />
                </div>
                <div className="input-field">
                  <i className="fas fa-lock"></i>
                  <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                  />
                </div>
                <p className="role-text">Select Role</p>
                <div className="dropdown-container">
                  <select 
                    className="role-dropdown" 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="publisher">Publisher</option>
                  </select>
                </div>
                {error && <p className="error-message">{error}</p>}
                <input type="submit" className="btn" value="Sign up" />
              </form>
            </div>
          </div>

          <div className="panels-container">
            <div className="panel left-panel">
              <div className="content">
                <h3>New here?</h3>
                <p>
                  Join us today and start your journey!
                </p>
                <button className="btn transparent" onClick={() => setSignUpMode(true)}>
                  Sign up
                </button>
              </div>
              <img 
                src="https://www.pngall.com/wp-content/uploads/15/Login-No-Background.png" 
                className="image" 
                alt="Sign up illustration" 
              />
            </div>
            <div className="panel right-panel">
              <div className="content">
                <h3>One of us?</h3>
                <p>
                  Log in to access your account.
                </p>
                <button className="btn transparent" onClick={() => setSignUpMode(false)}>
                  Sign in
                </button>
              </div>
              <img 
                src="https://www.pngkey.com/png/full/203-2035339_register-user-register-online-icon-png.png" 
                className="image" 
                alt="Sign in illustration" 
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignInSignUp;
