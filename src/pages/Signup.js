import React, { useState } from "react";
import "./Auth.css";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

// Inside Signup component:






const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await createUserWithEmailAndPassword(auth, formData.email, formData.password);
    alert("Signup successful!");
    navigate("/");
  } catch (error) {
    alert(error.message);
  }
};

  return (
    <div className="auth-container">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <label>
          Name:
          <input type="text" name="name" required onChange={handleChange} />
        </label>

        <label>
          Email:
          <input type="email" name="email" required onChange={handleChange} />
        </label>

        <label>
          Password:
          <input type="password" name="password" required onChange={handleChange} />
        </label>

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
