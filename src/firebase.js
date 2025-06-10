// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Replace with your actual config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyB3Kuo1R81FahtdAeIZc8Wv41wOgRouKhI",
  authDomain: "green-clean-campaign.firebaseapp.com",
  projectId: "green-clean-campaign",
  appId: "1:67025228512:web:eddce51ae3aadf631ab685",
  // optionally storageBucket, messagingSenderId
  storageBucket: "green-clean-campaign.firebasestorage.app",
  messagingSenderId: "67025228512",
  measurementId: "G-LE9G0Z41MV"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
