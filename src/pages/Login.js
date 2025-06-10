import React, { useState } from "react";
import "./Auth.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add authentication logic
    console.log("Login info:", formData);
    alert("Logged in (not really, just a test)");
  };

  return (
    <div className="auth-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="auth-form">
        <label>
          Email:
          <input type="email" name="email" required onChange={handleChange} />
        </label>

        <label>
          Password:
          <input type="password" name="password" required onChange={handleChange} />
        </label>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
