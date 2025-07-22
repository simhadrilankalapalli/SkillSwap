import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase"; // ✅ Your Firebase config

import {
  Wrench,
  Camera,
  Mic,
  Music,
  Clapperboard,
  ChefHat,
  LayoutTemplate,
  Bookmark,
  BookmarkCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Images
import webdevelopment from "../assets/webdev.jpg";
import digitalmarketing from "../assets/digitalmarketing.jpg";
import photography from "../assets/photography.jpg";
import publicspeaking from "../assets/publicspeaking.jpg";
import MusicProduction from "../assets/MusicProduction.jpg";
import videoediting from "../assets/videoediting.jpg";
import uiuxdesign from "../assets/uiuxdesign.png";
import cooking from "../assets/cooking.png";

function TrendingSkills() {
  const scrollRef = useRef();
  const navigate = useNavigate();

  // ✅ Get current user
  const [user] = useAuthState(auth);

  // ✅ Bookmark state
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem("skillBookmarks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("skillBookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (id) => {
    if (!user) {
      toast.dismiss();
      toast.warn("Please Sign in to bookmark a skill");
      setTimeout(() => {
        navigate("/signin");
      }, );
      return;
    }

    setBookmarks((prev) => {
      return prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
    });
  };

  const skillCards = [
    {
      id: 1,
      img: webdevelopment,
      category: "Coding",
      title: "Web Development",
      icon: <Wrench className="w-5 h-5" style={{ color: "#DAA520" }} />,
      description:
        "Design and develop responsive websites using HTML, CSS, JavaScript, React, and Prisma.",
    },
    {
      id: 2,
      img: digitalmarketing,
      category: "Marketing",
      title: "Digital Marketing",
      icon: <span className="text-md">📣</span>,
      description:
        "Promote brands through SEO, social media, and digital ads to grow audience and engagement.",
    },
    {
      id: 3,
      img: photography,
      category: "Photography",
      title: "Photography",
      icon: <Camera className="w-5 h-5 text-yellow-600" />,
      description:
        "Capture snapshots, moments and emotions using lighting, composition, and creativity.",
    },
    {
      id: 4,
      img: publicspeaking,
      category: "Design",
      title: "Public Speaking",
      icon: <Mic className="w-5 h-5" style={{ color: "#DAA520" }} />,
      description:
        "Speak confidently and engage any audience with strong delivery and storytelling.",
    },
    {
      id: 5,
      img: MusicProduction,
      category: "Design",
      title: "Music Production",
      icon: <Music className="w-5 h-5" style={{ color: "#DAA520" }} />,
      description:
        "Create music and beats using FL Studio or GarageBand. Learn basic mixing and sound design.",
    },
    {
      id: 6,
      img: videoediting,
      category: "Photography",
      title: "Video Editing",
      icon: <Clapperboard className="w-5 h-5" style={{ color: "#DAA520" }} />,
      description:
        "Edit videos using Premiere Pro, Final Cut, or CapCut for engaging content creation.",
    },
    {
      id: 7,
      img: uiuxdesign,
      category: "Coding",
      title: "UI/UX Design",
      icon: <LayoutTemplate className="w-5 h-5" style={{ color: "#DAA520" }} />,
      description:
        "Design and develop user-friendly interfaces with Figma, Adobe XD, and UX principles.",
    },
    {
      id: 8,
      img: cooking,
      category: "Photography",
      title: "Cooking/Baking",
      icon: <ChefHat className="w-5 h-5" style={{ color: "#DAA520" }} />,
      description:
        "Explore global cuisines or specialize in vegan and gluten-free recipes.",
    },
  ];

  // Carousel logic
  const cardWidth = 300;
  const visibleCards = 2;
  const totalDots = Math.ceil(skillCards.length / visibleCards);
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -cardWidth * visibleCards : cardWidth * visibleCards,
      behavior: "smooth",
    });
  };

  const updateActiveIndex = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const index = Math.round(scrollLeft / (cardWidth * visibleCards));
    setActiveIndex(index);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.addEventListener("scroll", updateActiveIndex);
    return () => container.removeEventListener("scroll", updateActiveIndex);
  }, []);

  return (
    <section className="bg-blue-200 py-16 px-6 mx-0 overflow-hidden relative">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0C4484] mb-10">
          Trending Skills
        </h2>

        {/* Scroll Buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white text-blue-600 p-2 rounded-full shadow hover:bg-blue-100 z-10 mx-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white text-blue-600 p-2 rounded-full shadow hover:bg-blue-100 z-10 mx-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Scrollable Cards */}
        <div className="w-full overflow-hidden px-4">
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto pb-5 scrollbar-hide scroll-smooth p-1.5"
            style={{ scrollBehavior: "smooth" }}
          >
            {skillCards.map((card) => {
              const isMarked = bookmarks.includes(card.id);
              return (
                <div
                  key={card.id}
                  className="bg-slate-100 pb-4 rounded-2xl shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 h-[310px] min-w-[285px] relative"
                >
                  <img
                    src={card.img}
                    alt={card.title}
                    className="w-full h-40 object-cover rounded-t-2xl pb-2 p-[1px]"
                  />
                  <h2 className="text-left font-bold p-2 flex items-center gap-2">
                    <span className="text-blue-600">{card.title}</span>
                    {card.icon}
                  </h2>
                  <p className="text-sm text-gray-700 text-justify px-2">
                    <span className="pr-2 font-semibold">Description:</span>
                    {card.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs bg-blue-100 text-blue-700 px-4 mx-2 p-1 rounded-full">
                      {card.category}
                    </span>
                    {/* Bookmark Toggle */}
                    <button
                      onClick={() => toggleBookmark(card.id)}
                      className="absolute bottom-2 right-2"
                      title={isMarked ? "Remove bookmark" : "Add bookmark"}
                    >
                      {isMarked ? (
                        <BookmarkCheck className="w-5 h-5 text-blue-600 fill-blue-600 stroke-blue-600 hover:fill-blue-800 hover:stroke-blue-800 transition" />
                      ) : (
                        <Bookmark className="w-5 h-5 text-blue-600 hover:text-blue-800 transition" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalDots }).map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? "bg-white" : "bg-blue-300"
              }`}
            ></span>
          ))}
        </div>

        {/* See All Skills Button */}
        <Link to="/Skills">
          <button className="mt-10 px-6 py-3 bg-white text-blue-600 font-semibold rounded-2xl hover:bg-blue-50 transition">
            See all skills
          </button>
        </Link>
      </div>
    </section>
  );
}

export default TrendingSkills;
