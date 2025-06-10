import React, { useState } from "react";
import "./Auth.css";

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send data to backend or Firebase
    console.log("Signup info:", formData);
    alert("Signup successful (not really, just a test)");
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
