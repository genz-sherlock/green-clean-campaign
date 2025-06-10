import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Optional: We'll create this CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <h1>🌿 Green Clean Campaign</h1>
        <p>Together we can make our environment pollution-free.</p>
        <Link to="/campaigns">
          <button className="cta-button">Join a Campaign</button>
        </Link>
      </section>

      <section className="mission">
        <h2>Our Mission</h2>
        <p>
          We are a community-driven initiative focused on organizing clean-up
          campaigns across lakes, ponds, parks, roads, and more. Our volunteers
          are committed to preserving biodiversity and restoring nature’s balance.
        </p>
      </section>
    </div>
  );
};

export default Home;
