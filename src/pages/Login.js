import React, { useState } from "react";
import "./Auth.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await signInWithEmailAndPassword(auth, formData.email, formData.password);
    alert("Login successful!");
    navigate("/");
  } catch (error) {
    alert(error.message);
  }
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
