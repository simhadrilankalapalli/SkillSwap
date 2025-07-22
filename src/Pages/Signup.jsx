// src/Pages/Signup.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /* ------------- handlers ------------- */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");

      /* 1️⃣  Create Firebase Auth account */
      const userCred = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const user = userCred.user;

      /* 1️⃣․1  OPTIONAL: set displayName for Auth profile */
      await updateProfile(user, { displayName: form.name }).catch(() => {});

      /* 2️⃣  Save extra profile fields in Firestore */
      await setDoc(doc(db, "users", user.uid), {
        name:  form.name,
        email: form.email,
        phone: form.phone,
        createdAt: new Date(),
        role: "user",
      });

      /* 3️⃣  Immediately sign the user OUT so navbar stays pre-login */
      await signOut(auth);

      /* 4️⃣  Friendly toast, then redirect */
      toast.success("Account created successfully!", { duration: 3000 });
      setTimeout(() => navigate("/signin"), 1000);
    } catch (err) {
      console.error("Signup error:", err.code);
      if (err.code === "auth/email-already-in-use") {
        setError("⚠️ Account already exists with this email.");
      } else if (err.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (err.code === "auth/weak-password") {
        setError("Password should be at least 6 characters.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  /* ------------- UI ------------- */
  const inputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-center font-bold text-blue-900 text-3xl mb-2">
          Create your account
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Join our SkillSwap community in seconds
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="e.g. John Doe"
              className={inputClass}
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email + Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="e.g. name@example.com"
                className={inputClass}
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="e.g. 9876543210"
                className={inputClass}
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className={inputClass}
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirm"
                placeholder="Re-enter your password"
                className={inputClass}
                value={form.confirm}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Errors */}
          {error && <p className="text-red-600 text-sm -mt-2">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-700 text-white py-2 rounded-lg transition ${
              loading ? "opacity-60 cursor-not-allowed" : "hover:bg-blue-800"
            }`}
          >
            {loading ? "Creating..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
