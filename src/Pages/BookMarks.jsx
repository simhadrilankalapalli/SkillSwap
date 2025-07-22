import React, { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaBookmark } from "react-icons/fa";

export default function Bookmarks() {
  const { user, loading: authLoading } = useAuth();
  const [skills, setSkills] = useState([]);
  const [expertInsights, setExpertInsights] = useState([]);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("skills"); // "skills" or "insights"
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      toast.warn("Please sign in to view bookmarks", { autoClose: 1500 });
      navigate("/signin");
      return;
    }

    const fetchBookmarkedSkills = async () => {
      try {
        const bookmarkDocRef = doc(db, "bookmarks", user.uid);
        const bookmarkDocSnap = await getDoc(bookmarkDocRef);

        if (!bookmarkDocSnap.exists()) {
          setBookmarkedIds([]);
          setSkills([]);
          setExpertInsights([]);
          setLoading(false);
          return;
        }

        const { skills: ids = [] } = bookmarkDocSnap.data();
        setBookmarkedIds(ids);

        if (ids.length === 0) {
          setSkills([]);
          setExpertInsights([]);
          setLoading(false);
          return;
        }

        const q = query(collection(db, "skills"), where("__name__", "in", ids));
        const querySnapshot = await getDocs(q);
        const fetched = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Separate into approved skills and expert insights
        const approved = fetched.filter((s) => s.status === "approved");
        const insights = fetched.filter((s) => s.status === "nowapproved");

        setSkills(approved);
        setExpertInsights(insights);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
        toast.error("Failed to load bookmarks", { autoClose: 1500 });
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarkedSkills();
  }, [user, authLoading, navigate]);

  const handleUnbookmark = async (skillId) => {
    if (!user) return;

    try {
      const bookmarkRef = doc(db, "bookmarks", user.uid);
      const updatedIds = bookmarkedIds.filter((id) => id !== skillId);

      await updateDoc(bookmarkRef, { skills: updatedIds });
      toast.success("Skill Removed from Bookmarks", { autoClose: 1500 });

      flushSync(() => {
        setBookmarkedIds(updatedIds);
        setSkills((prev) => prev.filter((s) => s.id !== skillId));
        setExpertInsights((prev) => prev.filter((s) => s.id !== skillId));
      });
    } catch (error) {
      console.error("Failed to unbookmark:", error);
      toast.error("Failed to remove bookmark", { autoClose: 1500 });
    }
  };

  const renderSkillCard = (skill) => (
    <li key={skill.id} className="bg-white rounded-xl shadow">
      <a
        href={skill.link}
        target="_blank"
        rel="noopener noreferrer"
        className=""
      >
        <img
          src={skill.image}
          alt={skill.title}
          className="w-full h-40 sm:h-48 object-cover rounded-lg mb-3 p-0.5"
        />
        <h3 className="text-xl font-semibold text-blue-800 mb-1 flex items-center gap-2 px-2">
          {skill.title} <span>{skill.icon}</span>
        </h3>
      </a>
      <p className="text-sm text-gray-600 px-2">{skill.description}</p>

      {skill.status !== "nowapproved" && skill.link && (
        <a
          href={skill.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-sm underline px-2 pb-2 py-2"
        >
          Learn More →
        </a>
      )}

      {/* Extra contact info for expert insights */}
      {skill.status === "nowapproved" && (
        <div className="px-2 mt-2 text-sm text-gray-700 flex flex-col-2 md:flex-col-1 space-x-6">
          <p>
            <strong>Email:</strong> {skill.emailid}
          </p>
          <p>
            <strong>Contact:</strong> {skill.phnumber}
          </p>
        </div>
      )}

      <div className="mt-4 flex items-center justify-between px-3 pb-3">
        <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
          {skill.category}
        </span>
        <button
          title="Unbookmark"
          className="text-blue-600 hover:text-blue-800 transition"
          onClick={() => handleUnbookmark(skill.id)}
        >
          <FaBookmark />
        </button>
      </div>
    </li>
  );

  return (
    <section className="px-6 md:px-16 py-16 bg-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold text-[#0C4484] mb-8 text-center pt-8">
        My Bookmarks
      </h1>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-10">
        <button
          onClick={() => setActiveTab("skills")}
          className={`px-4 py-2 rounded-full font-semibold transition ${
            activeTab === "skills"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Approved Skills
        </button>
        <button
          onClick={() => setActiveTab("insights")}
          className={`px-4 py-2 rounded-full font-semibold transition ${
            activeTab === "insights"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          Expert Insights
        </button>
      </div>

      {loading ? (
        <div className="text-center py-20 text-blue-600 text-xl font-semibold">
          Loading your bookmarks...
        </div>
      ) : activeTab === "skills" ? (
        skills.length === 0 ? (
          <p className="text-center text-gray-500">
            No approved skills bookmarked.
          </p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {skills.map(renderSkillCard)}
          </ul>
        )
      ) : expertInsights.length === 0 ? (
        <p className="text-center text-gray-500">
          No expert insights bookmarked.
        </p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {expertInsights.map(renderSkillCard)}
        </ul>
      )}
    </section>
  );
}
