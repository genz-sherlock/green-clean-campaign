import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser, userRole } = useAuth();

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/campaigns">Campaigns</Link>
      <Link to="/register">Register</Link>

      {currentUser ? (
        <>
          <span>Welcome, {currentUser.email}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
      {currentUser && <Link to="/my-registrations">My Registrations</Link>}
      {currentUser && userRole === "admin" && <Link to="/create-campaign">Create Campaign</Link>}
    </nav>
  );
};
        // <li><Link to="/about">About</Link></li>
        // <li><Link to="/contact">Contact</Link></li>
export default Navbar;
