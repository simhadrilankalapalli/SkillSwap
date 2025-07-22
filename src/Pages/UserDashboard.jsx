// src/Pages/UserDashboard.jsx
import React, { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { CheckCircle, Clock, XCircle, UserCircle2 } from "lucide-react";

import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function UserDashboard() {
  /* ---------- state ---------- */
  const [profile, setProfile] = useState(null);   // { name, email, phone }
  const [loading, setLoading] = useState(true);

  /* ---------- fetch profile once ---------- */
  useEffect(() => {
    const fetchProfile = async () => {
      const user = auth.currentUser;
      if (!user) return;

      // Try to read Firestore users/{uid}
      const snap = await getDoc(doc(db, "users", user.uid)).catch(() => null);

      setProfile({
        name:  snap?.exists() ? snap.data().name  : user.displayName || "Unnamed",
        email: snap?.exists() ? snap.data().email : user.email,
        phone: snap?.exists() ? snap.data().phone : user.phoneNumber || "—",
      });
      setLoading(false);
    };

    fetchProfile();
  }, []);

  /* optional nicer loader */
  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <p className="text-blue-600 animate-pulse">Loading dashboard...</p>
      </div>
    );
  }

  /* ---------- dummy data (until wired) ---------- */
  const bookmarked = ["React Basics", "Photography", "UI/UX Design"];
  const submitted  = [
    { title: "Cooking Basics", status: "pending" },
    { title: "JavaScript Pro", status: "approved" },
    { title: "Voice Training", status: "rejected" },
  ];

  /* ---------- UI ---------- */
  return (
    <div className="p-6 pt-24 max-w-6xl mx-auto space-y-12">
      {/* ─── Profile Overview ─── */}
      <section className="bg-white rounded-xl shadow-md p-6 border border-blue-200">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <UserCircle2 className="w-16 h-16 text-blue-500 shrink-0" />
            <div>
              <h2 className="text-xl font-semibold text-blue-800">
                {profile.name}
              </h2>
              <p className="text-sm text-gray-600">{profile.email}</p>
              <p className="text-sm text-gray-600">{profile.phone}</p>
            </div>
          </div>

          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2">
            <FaUserEdit /> Edit Profile
          </button>
        </div>
      </section>

      {/* ─── Bookmarked Skills ─── */}
      <section>
        <h3 className="text-2xl font-semibold text-blue-800 mb-4">
          My Bookmarked Skills
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {bookmarked.map((skill) => (
            <div
              key={skill}
              className="bg-white rounded-lg shadow-sm p-4 border flex justify-between items-center"
            >
              <span>{skill}</span>
              <button className="text-red-500 hover:text-red-700">Remove</button>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Submitted Skills ─── */}
      <section>
        <h3 className="text-2xl font-semibold text-blue-800 mb-4">
          My Submitted Skills
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {submitted.map((s) => (
            <div
              key={s.title}
              className="bg-white p-4 rounded-lg shadow-sm border"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{s.title}</span>
                {s.status === "approved" && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
                {s.status === "pending" && (
                  <Clock className="w-5 h-5 text-yellow-600" />
                )}
                {s.status === "rejected" && (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
              {(s.status === "pending" || s.status === "rejected") && (
                <div className="flex gap-3 text-sm mt-2">
                  <button className="text-blue-500 hover:underline">Edit</button>
                  <button className="text-red-500 hover:underline">
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* other sections remain … */}
    </div>
  );
}
