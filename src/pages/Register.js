import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Register.css";
import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCampaign = queryParams.get("campaign");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    campaign: selectedCampaign || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const { currentUser } = useAuth();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await addDoc(collection(db, "registrations"), {
      ...formData,
      userId: currentUser.uid,
      timestamp: Timestamp.now()
    });
    alert("Registered successfully!");
    setFormData({
      name: "",
      email: "",
      phone: "",
      campaign: selectedCampaign || ""
    });
  } catch (err) {
    console.error("Error saving registration:", err);
    alert("Failed to register. Please try again.");
  }
};
  

  return (
    <div className="register-container">
      <h1>Register for a Campaign</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <label>
          Name:
          <input type="text" name="name" value={formData.name} required onChange={handleChange} />
        </label>

        <label>
          Email:
          <input type="email" name="email" value={formData.email} required onChange={handleChange} />
        </label>

        <label>
          Phone:
          <input type="tel" name="phone" value={formData.phone} required onChange={handleChange} />
        </label>

        <label>
          Campaign:
          <input type="text" name="campaign" value={formData.campaign} readOnly />
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Register;
