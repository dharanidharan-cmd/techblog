
import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="hero-tag">WELCOME TO TECHBLOG</p>

        <h1>
          Explore the World of
          <span> Technology.</span>
        </h1>

        <p className="hero-description">
          Discover the latest insights, tutorials, and trends
          in technology, programming, and innovation.
        </p>

        <div className="hero-search">
          <input
            type="text"
            placeholder="Search articles..."
          />
          <button>Search</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
