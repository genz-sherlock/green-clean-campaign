import React, { useState } from "react";
import "./Auth.css";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";
// Inside Signup component:






const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "",role: "user" });
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
    const userCred = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );

    const user = userCred.user;

    // Save user role in Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: formData.email,
      role: formData.role
    });

    alert("Account created successfully!");
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

        <label>Sign up as:</label>
        <select
        name="role"
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
        <option value="user">Volunteer</option>
        <option value="admin">Campaign Initiator (Admin)</option>
        </select>

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
