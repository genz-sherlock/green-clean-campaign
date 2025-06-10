import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const CreateCampaign = () => {
  const { currentUser, userRole } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    location: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser || userRole !== "admin") {
      alert("Unauthorized access");
      return;
    }

    try {
      await addDoc(collection(db, "campaigns"), {
        ...formData,
        createdBy: currentUser.uid,
        timestamp: Timestamp.now()
      });
      alert("Campaign created successfully!");
      navigate("/campaigns"); // optional redirect
    } catch (error) {
      console.error("Error creating campaign:", error);
      alert("Error creating campaign");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Create New Campaign</h1>
      <form onSubmit={handleSubmit}>
        <label>Campaign Name:</label>
        <input type="text" name="name" required onChange={handleChange} />

        <label>Description:</label>
        <textarea name="description" required onChange={handleChange} />

        <label>Date:</label>
        <input type="date" name="date" required onChange={handleChange} />

        <label>Location:</label>
        <input type="text" name="location" required onChange={handleChange} />

        <button type="submit">Create Campaign</button>
      </form>
    </div>
  );
};

export default CreateCampaign;
