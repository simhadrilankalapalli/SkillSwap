import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import toast from "react-hot-toast";

/* ─── Card component for each pending skill ─── */
function PendingCard({ skill, onApprove, onReject }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition flex flex-col max-w-auto mx-0 p-0.5">
      {skill.image && (
        <img
          src={skill.image}
          alt={skill.title}
          className="w-auto h-40 object-cover rounded-lg mb-4"
        />
      )}

      <h3 className="text-xl font-semibold text-blue-800 mb-1 flex items-center gap-2 px-2">
        {skill.title}
        {skill.icon && <span>{skill.icon}</span>}
      </h3>

      <p className="text-gray-600 text-sm flex-grow px-2 break-words">
        {skill.description}
      </p>

      <p className="text-xs text-gray-500 px-2 mt-2">
        Email: {skill.emailid} &nbsp;|&nbsp; Phone: {skill.phnumber}
      </p>

      <div className="mt-4 flex items-center justify-between px-3 pb-3">
        <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
          {skill.category}
        </span>

        <div className="flex gap-2">
          <button
            onClick={() => onApprove(skill.id)}
            className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
          >
            Approve
          </button>
          <button
            onClick={() => onReject(skill.id)}
            className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main ApproveSkills Component ─── */
export default function ApproveSkills() {
  const [skills, setSkills] = useState([]);

  // Real-time listener to fetch pending skills
  useEffect(() => {
    const q = query(collection(db, "skills"), where("status", "==", "nowpending"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const pendingSkills = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSkills(pendingSkills);
      },
      (err) => {
        console.error("onSnapshot error:", err);
        toast.error("Failed to fetch pending skills");
      }
    );
    return unsub;
  }, []);

  // Approve handler: set status to "nowapproved"
  const handleApprove = async (id) => {
    try {
      const skillRef = doc(db, "skills", id);
      await updateDoc(skillRef, { status: "nowapproved" });
      toast.success("Skill approved successfully");
    } catch (err) {
      console.error("Approval error:", err);
      toast.error("Failed to approve skill");
    }
  };

  // Reject handler: set status to "rejected"
  const handleReject = async (id) => {
    try {
      const skillRef = doc(db, "skills", id);
      await updateDoc(skillRef, { status: "rejected" });
      toast("Skill rejected", { icon: "🗑️" });
    } catch (err) {
      console.error("Reject error:", err);
      toast.error("Failed to reject skill");
    }
  };

  /* ─── UI ─── */
  return (
    <section className="px-6 md:px-16 pt-24 pb-12 bg-blue-200 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-14 text-center text-blue-900">
          Pending Skill Approvals
        </h1>

        {skills.length === 0 ? (
          <p className="text-center text-gray-600">
            No pending skills to approve.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill) => (
              <PendingCard
                key={skill.id}
                skill={skill}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
