// src/Components/AfterSignInNavbar.jsx
import React, { useState, useRef, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
// import userdashboard from "../Pages/UserDashboard";

export default function AfterSignInNavbar() {
  const [isOpen, setIsOpen] = useState(false); // burger open
  const [openProfile, setProfile] = useState(false); // desktop dropdown
  const wrapperRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-blue-500 transition-all"
      : "hover:text-blue-600 transition-all";

  const closeAll = () => {
    setIsOpen(false);
    setProfile(false);
    window.scrollTo(0, 0);
  };

  /* reliable sign-out */
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      const unsub = onAuthStateChanged(auth, (u) => {
        if (!u) {
          unsub();
          toast.success("Signed out!");
          navigate("/signin", { replace: true });
        }
      });
    } catch (err) {
      toast.error("Could not sign out. Try again.");
      console.error(err);
    } finally {
      closeAll();
    }
  };

  /* close menus on outside click */
  useEffect(() => {
    const handleClick = (e) => {
      if (
        !wrapperRef.current?.contains(e.target) &&
        !profileRef.current?.contains(e.target)
      ) {
        setIsOpen(false);
        setProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  /* ───────────────────── JSX ───────────────────── */
  return (
    <div className="relative">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-gray-800 text-white px-6 py-4 sm:px-10">
        {/* logo */}
        <NavLink to="/" onClick={closeAll} className="flex items-center gap-2">
          <img
            src="https://img.icons8.com/color/48/sladeshare--v1.png"
            alt="Logo"
            className="h-8 w-8"
          />
          <span className="text-xl font-bold">
            <span className="text-orange-400">Skill</span>
            <span className="text-blue-400">Swap</span>
          </span>
        </NavLink>

        {/* burger (mobile) */}
        <div ref={wrapperRef} className="sm:hidden relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* mobile list */}
          <div
            className={`absolute left-full pr-20 top-full mt-2 -translate-x-1/2 w-[90vw] max-w-sm bg-gray-800 text-white font-bold text-md shadow-md px-6 transition-all duration-300 overflow-hidden ${
              isOpen
                ? "max-h-[500px] opacity-100 py-6"
                : "max-h-0 opacity-0 py-0"
            }`}
          >
            <div className="flex flex-col space-y-4">
              <NavLink to="/" onClick={closeAll} className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/about" onClick={closeAll} className={navLinkClass}>
                About
              </NavLink>
              <NavLink to="/skills" onClick={closeAll} className={navLinkClass}>
                Skills
              </NavLink>
              <NavLink to="/expertinsights" onClick={closeAll} className={navLinkClass}>
                Skills From Professionals
              </NavLink>
              <NavLink
                to="/addskills"
                onClick={closeAll}
                className={navLinkClass}
              >
                Add Skills
              </NavLink>
              <NavLink
                to="/bookmarks"
                onClick={closeAll}
                className={navLinkClass}
              >
                BookMarks
              </NavLink>
              <NavLink
                to="/profile"
                onClick={closeAll}
                className={navLinkClass}
              >
                Profile
              </NavLink>
              <button
                onClick={handleSignOut}
                className="text-left hover:text-red-400 transition-all"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>

        {/* desktop */}
        <ul className="hidden sm:flex space-x-14 mr-4 font-bold text-md">
          <li>
            <NavLink to="/" onClick={closeAll} className={navLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={closeAll} className={navLinkClass}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/skills" onClick={closeAll} className={navLinkClass}>
              Skills
            </NavLink>
          </li>
          <li>
            <NavLink to="/expertinsights" onClick={closeAll} className={navLinkClass}>
                Expert Insights
              </NavLink>
          </li>

          {/* <li><NavLink to="/bookmarks" onClick={closeAll} className={navLinkClass}>BookMarks</NavLink></li> */}

          {/* My Profile hover menu */}
          <li
            ref={profileRef}
            className="relative"
            onMouseEnter={() => setProfile(true)}
            onMouseLeave={(e) => {
              const to = e.relatedTarget;
              if (!profileRef.current?.contains(to)) setProfile(false);
            }}
          >
            <button className="flex items-center gap-1 hover:text-blue-600 transition-all select-none">
              My Profile
              {/* <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.207l3.71-3.976a.75.75 0 111.09 1.026l-4.25 4.55a.75.75 0 01-1.09 0l-4.25-4.55a.75.75 0 01.02-1.05z" clipRule="evenodd" />
              </svg> */}
            </button>

            {openProfile && (
              <ul className="absolute right-0 top-full w-44 pt-2 bg-white text-gray-800 rounded-md shadow-lg py-2 z-50">
                <li>
                  <NavLink
                    to="/userdashboard"
                    onClick={closeAll}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    My Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/addskills"
                    onClick={closeAll}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Add Skills
                  </NavLink>
                </li>     
                <li>
                  <NavLink
                    to="/bookmarks"
                    onClick={closeAll}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    BookMarks
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>

      {/* routed pages */}
      <div className="pt-0">
        <Outlet />
      </div>
    </div>
  );
}
