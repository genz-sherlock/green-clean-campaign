import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import "./Auth.css"

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      const querySnapshot = await getDocs(collection(db, "campaigns"));
      const results = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCampaigns(results);
      setLoading(false);
    };

    fetchCampaigns();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Available Campaigns</h1>
      {loading ? (
        <p>Loading campaigns...</p>
      ) : campaigns.length === 0 ? (
        <p>No campaigns available at the moment.</p>
      ) : (
        <ul>
          {campaigns.map(campaign => (
            <li key={campaign.id} style={{ marginBottom: "1.5rem", border: "1px solid #ccc", padding: "1rem" }}>
              <h3>{campaign.name}</h3>
              <p><strong>Date:</strong> {campaign.date}</p>
              <p><strong>Location:</strong> {campaign.location}</p>
              <p><strong>Description:</strong> {campaign.description}</p>
              <button onClick={() => navigate(`/register?campaign=${encodeURIComponent(campaign.name)}`)}>
                Register
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Campaigns;
