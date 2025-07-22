// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ← NEW
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; 

/* ------------------------------------------------------------------ */
/* 🔑  Your exact config from Firebase Console                         */
/* ------------------------------------------------------------------ */
const firebaseConfig = {
  apiKey: "AIzaSyBz5fCJOegMizRt5ScKD4gNnLMPIfpsH0k",
  authDomain: "skillswap-123.firebaseapp.com",
  projectId: "skillswap-123",
  storageBucket: "skillswap-123.firebasestorage.app",
  messagingSenderId: "546054393855",
  appId: "1:546054393855:web:96331159e16f11c92ca1ca",
  measurementId: "G-4K0RBRVHDH",
};

/* ------------------------------------------------------------------ */
/* 🏗️  Initialize Firebase services                                   */
/* ------------------------------------------------------------------ */
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 
export const storage = getStorage(app);
/* Analytics (optional — only in browser) */
export const analytics =
  typeof window !== "undefined" && firebaseConfig.measurementId
    ? getAnalytics(app)
    : null;
