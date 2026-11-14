
import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>Tech<span>Blog</span></h2>
          <p>
            Explore technology, discover ideas,
            and stay updated with the latest trends.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="/blogs">Blogs</a>
          <a href="/categories">Categories</a>
          <a href="/about">About Us</a>
        </div>

        <div className="footer-links">
          <h3>Follow Us</h3>
          <a href="https://www.linkedin.com/">LinkedIn</a>
          <a href="https://www.instagram.com/">Instagram</a>
          <a href="https://github.com/">GitHub</a>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 TechBlog. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
