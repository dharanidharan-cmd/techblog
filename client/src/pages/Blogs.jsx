
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Blogs.css";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "All Categories"
  );

  // Fetch published blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          "http://https://techblog-63dr.onrender.com/api/blogs/published"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const data = await response.json();
        setBlogs(data.blogs || []);
      } catch (error) {
        console.error("Blogs fetch error:", error);
        setError("Unable to load articles. Please try again.");
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

  // Get available categories from blogs
  const categories = [
    "All Categories",
    ...new Set(blogs.map((blog) => blog.category).filter(Boolean)),
  ];

  // Search and category filtering
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title?.toLowerCase().includes(search.toLowerCase()) ||
      blog.category?.toLowerCase().includes(search.toLowerCase()) ||
      blog.description?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All Categories" ||
      blog.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Header />

      <section className="blogs-page">
        <div className="blogs-heading">
          <p>EXPLORE OUR CONTENT</p>
          <h1>Explore All Blogs</h1>
          <span>
            Discover articles, tutorials and insights
            from the world of technology.
          </span>
        </div>

        {/* Search and Category Filter */}
        <div className="blogs-search">
          <input
            type="text"
            placeholder="Search articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="Filter blogs by category"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <button type="button">Search</button>
        </div>

        {/* Blog Cards */}
        <div className="blogs-grid">
          {loading ? (
            <p>Loading articles...</p>
          ) : error ? (
            <p className="no-results">{error}</p>
          ) : filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
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

                  <Link
                    to={`/blog/${blog._id}`}
                    className="read-more"
                  >
                    Read More →
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">
              No articles found. Try another keyword or category.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Blogs;
