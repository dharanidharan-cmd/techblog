
import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function BlogDetails() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Prevent duplicate counting during React StrictMode development checks
  const viewedBlogId = useRef(null);

  // Fetch article and record its view
  useEffect(() => {
    if (!id || viewedBlogId.current === id) {
      return;
    }

    viewedBlogId.current = id;

    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `http://https://techblog-63dr.onrender.comog-63dr.onrender.com/api/blogs/${id}/view`,
          {
            method: "POST",
          }
        );

        if (!response.ok) {
          throw new Error("Article not found");
        }

        const data = await response.json();

        setBlog(data.blog);
        setError("");
      } catch (error) {
        console.error("Blog details error:", error);
        setError("Article not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

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
    <>
      <Header />

      {loading ? (
        <div style={{ padding: "100px", textAlign: "center" }}>
          <h2>Loading article...</h2>
        </div>
      ) : error || !blog ? (
        <div style={{ padding: "100px", textAlign: "center" }}>
          <h1>Article Not Found</h1>
          <p>{error}</p>
          <Link to="/blogs">Back to Blogs</Link>
        </div>
      ) : (
        <section
          style={{
            maxWidth: "850px",
            margin: "60px auto",
            padding: "20px",
          }}
        >
          <Link to="/blogs">← Back to Blogs</Link>

          <p style={{ color: "#7c3aed", marginTop: "30px" }}>
            {blog.category}
          </p>

          <h1 style={{ fontSize: "38px", margin: "15px 0" }}>
            {blog.title}
          </h1>

          <p style={{ color: "#777", marginBottom: "30px" }}>
            By {blog.author} · {formatDate(blog.createdAt)}
          </p>

          <p
            style={{
              fontSize: "18px",
              lineHeight: "1.8",
              whiteSpace: "pre-line",
            }}
          >
            {blog.content}
          </p>
        </section>
      )}

      <Footer />
    </>
  );
}

export default BlogDetails;
