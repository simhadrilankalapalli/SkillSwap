import React, { useEffect, useState } from "react";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import {
  Wrench,
  LayoutTemplate,
  Camera,
  Clapperboard,
  Mic,
  Music,
  ChefHat,
} from "lucide-react";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination"; // ← added
import Stack from "@mui/material/Stack"; // ← added
import "react-toastify/dist/ReactToastify.css";

/* SkillCard (unchanged) */
function SkillCard({ skill, isBookmarked, handleBookmarkClick }) {
  const iconMap = {
    Coding: <Wrench className="w-5 h-5 text-yellow-600" />,
    Design: <LayoutTemplate className="w-5 h-5 text-yellow-600" />,
    Photography: <Camera className="w-5 h-5 text-yellow-600" />,
    Marketing: <Mic className="w-5 h-5 text-yellow-600" />,
    Music: <Music className="w-5 h-5 text-yellow-600" />,
    Cooking: <ChefHat className="w-5 h-5 text-yellow-600" />,
    Video: <Clapperboard className="w-5 h-5 text-yellow-600" />,
  };

  return (
    <div className="bg-slate-100 rounded-xl shadow-md hover:shadow-lg transition flex flex-col p-0.5 mx-2">
      {/* Make image & title clickable */}
      <a
        href={skill.link}
        target="_blank"
        rel="noopener noreferrer"
        className=""
      >
        <img
          src={skill.image}
          alt={skill.title}
          className="w-full h-40 sm:h-48 object-cover rounded-lg mb-3"
        />
        <h3 className="text-lg font-semibold text-blue-800 mb-1 flex items-center gap-2 px-2">
          {skill.title}
          <span>
            {iconMap[skill.category] || <Wrench className="w-5 h-5" />}
          </span>
        </h3>
      </a>

      {/* Description (not a link) */}
      <p className="text-gray-600 text-sm flex-grow px-2">
        {skill.description}
      </p>

      {skill.link && (
        <a
          href={skill.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 text-sm underline px-2 pb-2 py-2"
        >
          Learn More →
        </a>
      )}
      {/* Category + Bookmark */}
      <div className="mt-3 flex items-center justify-between px-2 pb-2">
        <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
          {skill.category}
        </span>
        <button
          title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          className="text-blue-600 hover:text-blue-800 transition"
          onClick={() => handleBookmarkClick(skill.id)}
        >
          {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
        </button>
      </div>
    </div>
  );
}

/* Filters (unchanged) */
function Filters({
  categories,
  selectedCategory,
  setSelectedCategory,
  search,
  setSearch,
}) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-4 rounded-lg px-6">
      <input
        type="text"
        placeholder="Search skills..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <div className="flex flex-wrap gap-3">
        {["All", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border text-sm transition ${
              selectedCategory === cat
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 border-blue-600 hover:bg-blue-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

/* MAIN COMPONENT */
export default function Skills() {
  const ITEMS_PER_PAGE = 6;
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setBookmarkedIds([]);
      return;
    }

    const fetchBookmarks = async () => {
      const docRef = doc(db, "bookmarks", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setBookmarkedIds(data.skills || []);
      }
    };

    fetchBookmarks();
  }, [user]);

  const handleBookmarkClick = async (skillId) => {
    if (authLoading) return;

    if (!user) {
      toast.dismiss();
      toast.warn("Please Sign in to bookmark a skill");
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
      return;
    }

    const docRef = doc(db, "bookmarks", user.uid);

    try {
      const isBookmarked = bookmarkedIds.includes(skillId);

      if (isBookmarked) {
        await updateDoc(docRef, {
          skills: arrayRemove(skillId),
        });
        setBookmarkedIds((prev) => prev.filter((id) => id !== skillId));
      } else {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          await updateDoc(docRef, {
            skills: arrayUnion(skillId),
          });
        } else {
          await setDoc(docRef, {
            skills: [skillId],
          });
        }
        setBookmarkedIds((prev) => [...prev, skillId]);
      }

      toast.success("Bookmark updated!");
    } catch (err) {
      console.error("Bookmark error:", err);
      toast.error("Failed to update bookmark");
    }
  };

  useEffect(() => {
    const fetchSkills = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "skills"),
          where("status", "==", "approved")
        );
        const querySnapshot = await getDocs(q);
        const fetchedSkills = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSkills(fetchedSkills);
      } catch (error) {
        console.error("Error fetching skills:", error);
        toast.error("Error loading skills");
      }
      setLoading(false);
    };

    fetchSkills();
  }, []);

  const categories = [...new Set(skills.map((s) => s.category))];

  const filteredSkills = skills.filter((skill) => {
    const matchesCategory =
      selectedCategory === "All" || skill.category === selectedCategory;
    const matchesSearch = skill.title
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredSkills.length / ITEMS_PER_PAGE);
  const first = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginated = filteredSkills.slice(first, first + ITEMS_PER_PAGE);

  return (
    <section className="px-6 md:px-16 py-16 bg-blue-200 min-h-screen">
      <h1 className="text-4xl font-bold text-[#0C4484] mb-8 text-center pt-[50px] pb-10">
        Explore Skills
      </h1>

      {loading ? (
        <p className="text-center text-gray-600 text-lg py-20">
          Loading skills...
        </p>
      ) : (
        <div className="max-w-7xl mx-auto space-y-8">
          <Filters
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            search={search}
            setSearch={setSearch}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginated.length ? (
              paginated.map((skill) => (
                <SkillCard
                  key={skill.id}
                  skill={skill}
                  isBookmarked={bookmarkedIds.includes(skill.id)}
                  handleBookmarkClick={handleBookmarkClick}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-gray-500">
                No skills found.
              </p>
            )}
          </div>

          {/* MUI Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center pt-10">
              <Stack spacing={2}>
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={(_, value) => setCurrentPage(value)}
                  variant="outlined"
                  shape="rounded-lg"
                  sx={{
                    "& .MuiPaginationItem-root": {
                      color: "#0C4484", // text color
                      borderColor: "#0C4484", // border color
                      backgroundColor: "#DBEAFE", // ✅ Tailwind blue-600 hex value
                    },
                    "& .Mui-selected": {
                      backgroundColor: "#1D4ED8 !important",
                      color: "#ffffff",
                      borderColor: "#BFDBFE",
                    },
                    "& .MuiPaginationItem-root:hover": {
                      backgroundColor: "#BFDBFE", // hover effect
                    },
                  }}
                />
              </Stack>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
