import React, { createContext, useContext, useEffect} from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";

const AuthContext = createContext();


export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  
  useEffect(() => {
  const unsub = onAuthStateChanged(auth, async (user) => {
    if (user) {
      const docSnap = await getDoc(doc(db, "users", user.uid));
      if (docSnap.exists()) {
        setUserRole(docSnap.data().role);
      }
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
      setUserRole(null);
    }
  });

  return unsub;
    }, []);

  return (
    <AuthContext.Provider value={{ currentUser , userRole}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext
