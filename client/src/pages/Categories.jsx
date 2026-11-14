
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/blogs/published"
        );

        if (!response.ok) {
          throw new Error("Failed to load categories");
        }

        const data = await response.json();

        const uniqueCategories = [
          ...new Set(
            (data.blogs || [])
              .map((blog) => blog.category)
              .filter(Boolean)
          ),
        ];

        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Category fetch error:", error);
        setError("Unable to load categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <Header />

      <section className="blogs-page">
        <div className="blogs-heading">
          <p>EXPLORE BY TOPIC</p>
          <h1>Blog Categories</h1>
          <span>
            Discover articles based on your interests.
          </span>
        </div>

        <div className="blogs-grid">
          {loading ? (
            <p>Loading categories...</p>
          ) : error ? (
            <p className="no-results">{error}</p>
          ) : categories.length > 0 ? (
            categories.map((category) => (
              <div className="blog-card" key={category}>
                <div className="blog-image">
                  {category}
                </div>

                <div className="blog-content">
                  <span className="blog-category">
                    EXPLORE TOPIC
                  </span>

                  <h3>{category}</h3>

                  <p>
                    Explore articles and tutorials about {category}.
                  </p>

                  <Link
                    to={`/blogs?category=${encodeURIComponent(category)}`}
                    className="read-more"
                  >
                    Explore Articles →
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">
              No categories available yet.
            </p>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Categories;
