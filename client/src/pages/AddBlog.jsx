
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AddBlog.css";

function AddBlog() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("Admin");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBlog = {
      title,
      category,
      description,
      content,
      author,
      status: "Published",
    };

    try {
      setLoading(true);

      const response = await fetch(
        "http://https://techblog-63dr.onrender.com/api/blogs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newBlog),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to publish blog");
      }

      alert("Blog published successfully!");

      setTitle("");
      setCategory("");
      setDescription("");
      setContent("");
      setAuthor("Admin");

    } catch (error) {
      console.error("Error publishing blog:", error);
      alert(error.message || "Unable to publish blog.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-blog-page">
      <div className="add-blog-header">
        <div>
          <h1>Add New Blog</h1>
          <p>Create and publish a new article.</p>
        </div>

        <Link to="/admin/blogs" className="back-btn">
          ← Back to Blogs
        </Link>
      </div>

      <form className="add-blog-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Blog Title</label>
          <input
            type="text"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="AI">Artificial Intelligence</option>
            <option value="Web Development">Web Development</option>
            <option value="Database">Database</option>
            <option value="Programming">Programming</option>
            <option value="Technology">Technology</option>
          </select>
        </div>

        <div className="form-group">
          <label>Short Description</label>
          <textarea
            rows="3"
            placeholder="Write a short description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Blog Content</label>
          <textarea
            rows="10"
            placeholder="Write your complete blog content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="publish-btn"
            disabled={loading}
          >
            {loading ? "Publishing..." : "Publish Blog"}
          </button>

          <Link to="/admin/blogs" className="cancel-btn">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AddBlog;
