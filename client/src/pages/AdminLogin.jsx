
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Temporary admin credentials
    const adminEmail = "admin@techblog.com";
    const adminPassword = "Admin@123";

    if (email === adminEmail && password === adminPassword) {
  setError("");

  localStorage.setItem("isAdminLoggedIn", "true");

  navigate("/admin");

    } else {
      setError("Invalid email or password!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-logo">TechBlog</h1>

        <h2>Admin Login</h2>
        <p className="login-subtitle">
          Sign in to manage your blog content.
        </p>

        <form onSubmit={handleLogin}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <div className="password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-button">
            Login to Dashboard
          </button>
        </form>

        <p className="login-footer">
          © 2026 TechBlog. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
