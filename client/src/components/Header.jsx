
import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="logo">
        Tech<span>Blog</span>
      </div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/blogs">Blogs</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/about">About</Link>
      </nav>

      <div className="header-actions">
        <Link to="/admin/login" className="login-btn">
  Login
</Link>
      </div>
    </header>
  );
}

export default Header;
