
import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { Link, useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [totalViews, setTotalViews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/");
  };

  // Fetch dashboard data from MongoDB
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch all blogs
        const blogsResponse = await fetch(
          "http://https://techblog-63dr.onrender.com/api/blogs"
        );

        if (!blogsResponse.ok) {
          throw new Error("Failed to fetch blogs");
        }

        const blogsData = await blogsResponse.json();

        setBlogs(blogsData.blogs || []);

        // Fetch total article views
        const viewsResponse = await fetch(
          "http://https://techblog-63dr.onrender.com/api/blogs/stats/views"
        );

        if (!viewsResponse.ok) {
          throw new Error("Failed to fetch total views");
        }

        const viewsData = await viewsResponse.json();

        setTotalViews(viewsData.totalViews);

        setError("");
      } catch (error) {
        console.error("Dashboard fetch error:", error);
        setError("Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Calculate statistics
  const totalBlogs = blogs.length;

  const publishedBlogs = blogs.filter(
    (blog) => blog.status === "Published"
  ).length;

  const draftBlogs = blogs.filter(
    (blog) => blog.status === "Draft"
  ).length;

  // Get latest blogs
  const recentBlogs = [...blogs]
    .sort(
      (a, b) =>
        new Date(b.createdAt) - new Date(a.createdAt)
    )
    .slice(0, 3);

  return (
    <div className="admin-dashboard">

      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2>
          Tech<span>Blog</span>
        </h2>

        <p className="sidebar-label">MAIN MENU</p>

        <nav>
          <Link to="/admin" className="active">
            Dashboard
          </Link>

          <Link to="/admin/blogs">
            Manage Blogs
          </Link>

          <Link to="/admin/add-blog">
            Add New Blog
          </Link>
        </nav>

        <div className="admin-profile">
          <div className="admin-avatar">A</div>

          <div>
            <strong>Admin</strong>
            <p>Administrator</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">

        <header className="admin-topbar">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back, Admin!</p>
          </div>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </header>

        {/* Statistics */}
        <section className="admin-stats">

          <div className="stat-card">
            <p>Total Blogs</p>
            <h2>{loading ? "..." : totalBlogs}</h2>
            <span>All articles</span>
          </div>

          <div className="stat-card">
            <p>Published</p>
            <h2>{loading ? "..." : publishedBlogs}</h2>
            <span>Published articles</span>
          </div>

          <div className="stat-card">
            <p>Drafts</p>
            <h2>{loading ? "..." : draftBlogs}</h2>
            <span>Unpublished articles</span>
          </div>

          <div className="stat-card">
            <p>Total Views</p>
            <h2>
              {totalViews === null
                ? "..."
                : totalViews.toLocaleString()}
            </h2>
            <span>Article views</span>
          </div>

        </section>

        {/* Error Message */}
        {error && (
          <p style={{ color: "red", marginTop: "15px" }}>
            {error}
          </p>
        )}

        {/* Recent Blogs */}
        <section className="recent-blogs">

          <div className="section-heading">
            <h2>Recent Blogs</h2>

            <Link
              to="/admin/blogs"
              className="view-all-btn"
            >
              View All
            </Link>
          </div>

          <div className="blog-table">

            <div className="table-row table-header">
              <span>Blog Title</span>
              <span>Category</span>
              <span>Status</span>
              <span>Action</span>
            </div>

            {loading ? (
              <p>Loading recent blogs...</p>
            ) : error ? (
              <p>{error}</p>
            ) : recentBlogs.length > 0 ? (
              recentBlogs.map((blog) => (
                <div
                  className="table-row"
                  key={blog._id}
                >

                  <span>{blog.title}</span>

                  <span>{blog.category}</span>

                  <span
                    className={
                      blog.status === "Published"
                        ? "published"
                        : "draft"
                    }
                  >
                    {blog.status}
                  </span>

                  <span>
                    <Link
                      to={`/admin/edit-blog/${blog._id}`}
                    >
                      Edit
                    </Link>
                  </span>

                </div>
              ))
            ) : (
              <p>No blogs available yet.</p>
            )}

          </div>
        </section>

      </main>
    </div>
  );
}

export default AdminDashboard;
