import React from "react";
import { Link } from "react-router-dom";
import "./Campaigns.css"; // Optional styling

const campaigns = [
  {
    id: 1,
    name: "Beach Cleanup Drive",
    date: "2025-07-15",
    location: "Marina Beach, Chennai",
    description: "Help us remove plastic and other waste from the beach."
  },
  {
    id: 2,
    name: "Park Beautification",
    date: "2025-07-22",
    location: "Cubbon Park, Bengaluru",
    description: "Plant saplings and clean littered areas."
  },
  {
    id: 3,
    name: "Lake Revival Mission",
    date: "2025-08-02",
    location: "Hussain Sagar, Hyderabad",
    description: "Join hands to clean the lake and educate the local community."
  }
];

const Campaigns = () => {
  return (
    <div className="campaigns-container">
      <h1>Upcoming Environmental Campaigns</h1>
      <div className="campaign-list">
        {campaigns.map((campaign) => (
          <div key={campaign.id} className="campaign-card">
            <h2>{campaign.name}</h2>
            <p><strong>Date:</strong> {campaign.date}</p>
            <p><strong>Location:</strong> {campaign.location}</p>
            <p>{campaign.description}</p>
            <Link to={`/register?campaign=${encodeURIComponent(campaign.name)}`}>
              <button className="register-btn">Register</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Campaigns;
