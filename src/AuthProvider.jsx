// src/AuthProvider.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

/* -------------------- Create Auth Context -------------------- */
const AuthCtx = createContext(null);

/* -------------------- Custom Hook -------------------- */
export const useAuth = () => {
  const context = useContext(AuthCtx);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

/* -------------------- Provider Component -------------------- */
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const role = firebaseUser.email === "admin@gmail.com" ? "admin" : "user";
        setUser({ ...firebaseUser, role });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthCtx.Provider value={{ user, loading }}>
      {children} {/* ✅ Always render children */}
    </AuthCtx.Provider>
  );
}
