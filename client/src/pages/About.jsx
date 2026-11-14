
import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function About() {
  return (
    <>
      <Header />

      <section style={{
        maxWidth: "1100px",
        margin: "70px auto",
        padding: "30px 20px",
        textAlign: "center"
      }}>
        <p style={{
          color: "#7c3aed",
          fontWeight: "600",
          letterSpacing: "2px"
        }}>
          ABOUT TECHBLOG
        </p>

        <h1 style={{
          fontSize: "42px",
          margin: "20px 0"
        }}>
          Sharing Knowledge Through Technology
        </h1>

        <p style={{
          maxWidth: "750px",
          margin: "0 auto",
          color: "#666",
          fontSize: "18px",
          lineHeight: "1.8"
        }}>
          TechBlog is a platform for technology enthusiasts,
          developers and learners. We share useful articles,
          tutorials and insights about Artificial Intelligence,
          Web Development, Programming and Databases.
        </p>

        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "wrap",
          margin: "50px 0"
        }}>
          <div>
            <h2>Learn</h2>
            <p>Explore new technologies.</p>
          </div>

          <div>
            <h2>Discover</h2>
            <p>Stay updated with trends.</p>
          </div>

          <div>
            <h2>Grow</h2>
            <p>Improve your technical skills.</p>
          </div>
        </div>

        <Link
          to="/blogs"
          style={{
            display: "inline-block",
            background: "#7c3aed",
            color: "white",
            padding: "14px 28px",
            borderRadius: "8px",
            textDecoration: "none"
          }}
        >
          Explore Blogs
        </Link>
      </section>

      <Footer />
    </>
  );
}

export default About;
