import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

const MyRegistrations = () => {
  const { currentUser } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      if (!currentUser) return;

      const q = query(
        collection(db, "registrations"),
        where("userId", "==", currentUser.uid)
      );

      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRegistrations(results);
      setLoading(false);
    };

    fetchRegistrations();
  }, [currentUser]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>My Campaign Registrations</h1>

      {loading ? (
        <p>Loading...</p>
      ) : registrations.length === 0 ? (
        <p>You haven’t registered for any campaigns yet.</p>
      ) : (
        <ul>
          {registrations.map((reg) => (
            <li key={reg.id} style={{ marginBottom: "1rem" }}>
              <strong>Campaign:</strong> {reg.campaign} <br />
              <strong>Name:</strong> {reg.name} <br />
              <strong>Email:</strong> {reg.email} <br />
              <strong>Phone:</strong> {reg.phone}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyRegistrations;
