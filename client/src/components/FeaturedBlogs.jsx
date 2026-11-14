
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./FeaturedBlogs.css";

function FeaturedBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch published blogs from MongoDB
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/blogs/published"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = await response.json();

        setBlogs(data.blogs || []);
      } catch (error) {
        console.error("Error fetching featured blogs:", error);
        setError("Unable to load articles.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Format date
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <section className="featured-section">
      <div className="section-heading">
        <p>OUR LATEST ARTICLES</p>
        <h2>Featured Blogs</h2>
        <span>
          Explore ideas, insights and the latest technology trends.
        </span>
      </div>

      <div className="blog-container">
        {loading ? (
          <p>Loading latest articles...</p>
        ) : error ? (
          <p>{error}</p>
        ) : blogs.length > 0 ? (
          blogs.slice(0, 3).map((blog) => (
            <div className="blog-card" key={blog._id}>
              <div className="blog-image">
                {blog.category}
              </div>

              <div className="blog-content">
                <span className="blog-category">
                  {blog.category}
                </span>

                <h3>{blog.title}</h3>

                <p>{blog.description}</p>

                <div className="blog-meta">
                  <span>{blog.author}</span>
                  <span>{formatDate(blog.createdAt)}</span>
                </div>

                <Link to={`/blog/${blog._id}`}>
                  Read More →
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No published articles available yet.</p>
        )}
      </div>
    </section>
  );
}

export default FeaturedBlogs;
