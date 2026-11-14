
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./AddBlog.css";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState({
    title: "",
    category: "",
    description: "",
    content: "",
    author: "",
    status: "Published",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // Fetch existing blog
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/blogs/${id}`
        );

        if (!response.ok) {
          throw new Error("Blog not found");
        }

        const data = await response.json();
        const existingBlog = data.blog || data;

        setBlog({
          title: existingBlog.title || "",
          category: existingBlog.category || "",
          description: existingBlog.description || "",
          content: existingBlog.content || "",
          author: existingBlog.author || "",
          status: existingBlog.status || "Published",
        });
      } catch (error) {
        console.error("Fetch error:", error);
        alert("Unable to load blog details.");
        navigate("/admin/blogs");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, navigate]);

  // Handle input changes
  const handleChange = (e) => {
    setBlog({
      ...blog,
      [e.target.name]: e.target.value,
    });
  };

  // Update blog in MongoDB
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);

      const response = await fetch(
        `http://localhost:5000/api/blogs/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(blog),
        }
      );

      const data = await response.json();

      console.log("Update response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to update blog");
      }

      alert("Blog updated successfully!");
      navigate("/admin/blogs");

    } catch (error) {
      console.error("Update error:", error);
      alert(error.message || "Unable to update blog.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return <p>Loading blog details...</p>;
  }

  return (
    <div className="add-blog-page">
      <div className="add-blog-header">
        <div>
          <h1>Edit Blog</h1>
          <p>Update your article details.</p>
        </div>

        <Link to="/admin/blogs" className="back-btn">
          ← Back to Blogs
        </Link>
      </div>

      <form className="add-blog-form" onSubmit={handleUpdate}>
        <div className="form-group">
          <label>Blog Title</label>
          <input
            type="text"
            name="title"
            value={blog.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={blog.category}
            onChange={handleChange}
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
            name="description"
            rows="3"
            value={blog.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Blog Content</label>
          <textarea
            name="content"
            rows="10"
            value={blog.content}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            name="author"
            value={blog.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <select
            name="status"
            value={blog.status}
            onChange={handleChange}
          >
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="publish-btn"
            disabled={updating}
          >
            {updating ? "Updating..." : "Update Blog"}
          </button>

          <Link to="/admin/blogs" className="cancel-btn">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EditBlog;
