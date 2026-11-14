
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ManageBlogs.css";

function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch blogs from MongoDB
  const fetchBlogs = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/blogs"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }

      const data = await response.json();

      setBlogs(data.blogs || []);
      setError("");
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError("Unable to load blogs. Please check your backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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

  // Delete blog from MongoDB
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/blogs/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete blog");
      }

      setBlogs((previousBlogs) =>
        previousBlogs.filter((blog) => blog._id !== id)
      );

      alert("Blog deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Unable to delete blog.");
    }
  };

  return (
    <div className="manage-page">
      <div className="manage-header">
        <div>
          <h1>Manage Blogs</h1>
          <p>View and manage all your articles.</p>
        </div>

        <Link to="/admin/add-blog" className="add-blog-btn">
          + Add New Blog
        </Link>
      </div>

      <div className="manage-table">
        <div className="manage-row manage-table-header">
          <span>Blog Title</span>
          <span>Category</span>
          <span>Date</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {loading ? (
          <p>Loading blogs...</p>
        ) : error ? (
          <p>{error}</p>
        ) : blogs.length > 0 ? (
          blogs.map((blog) => (
            <div className="manage-row" key={blog._id}>
              <span>{blog.title}</span>
              <span>{blog.category}</span>
              <span>{formatDate(blog.createdAt)}</span>

              <span
                className={
                  blog.status === "Published"
                    ? "status-published"
                    : "status-draft"
                }
              >
                {blog.status}
              </span>

              <span className="manage-actions">
                <Link to={`/blog/${blog._id}`}>View</Link>

                <Link to={`/admin/edit-blog/${blog._id}`} className="edit-btn">
  Edit
</Link>

                <button
                  onClick={() => handleDelete(blog._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </span>
            </div>
          ))
        ) : (
          <p>No blogs available. Create your first blog!</p>
        )}
      </div>

      <Link to="/admin" className="back-dashboard">
        ← Back to Dashboard
      </Link>
    </div>
  );
}

export default ManageBlogs;
