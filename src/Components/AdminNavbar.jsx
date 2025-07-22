import React, { useState, useRef, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

// import admindashboard from "../Pages/AdminDashboard";

export default function AdminNavbar() {
  /* ─── state ─── */
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  /* ─── refs ─── */
  const burgerRef  = useRef(null);
  const profileRef = useRef(null);
// console.log("profileRef",profileRef);
  const navigate = useNavigate();

  /* ─── link helper ─── */
  const link = ({ isActive }) =>
    isActive ? "text-blue-400" : "hover:text-blue-300";

  /* ─── close helpers ─── */
  const closeAll = () => {
    setMobileOpen(false);
    setOpenProfile(false);
    window.scrollTo(0, 0);
  };

  /* ─── sign-out ─── */
  const handleSignOut = async () => {
  try {
    await signOut(auth);
    toast.success("Signed out successfully!");
    setTimeout(() => {
      navigate("/signin", { replace: true });
    },); // Wait 1 second so toast is visible
  } catch (err) {
    console.error("Sign-out error:", err.code);
    toast.error("Sign-out failed!");
  }
};  

  /* ─── click-outside for both burger & profile ─── */
  useEffect(() => {
    const handleClick = (e) => {

      console.log("prof",profileRef?.current);
      if (
        !burgerRef.current?.contains(e.target) &&
        !profileRef.current?.contains(e.target)
      ) {
        setMobileOpen(false);
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  /* ─────────────────────────── JSX ─────────────────────────── */
  return (
    <div className="relative">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-gray-900 text-white px-10 py-3">
        {/* logo */}
        <NavLink to="/admin" onClick={closeAll} className="flex items-center gap-2">
          <img src="https://img.icons8.com/color/48/sladeshare--v1.png" alt="Logo" className="h-8 w-8" />
          <span className="text-xl font-bold">
            <span className="text-orange-400">Skill</span>
            <span className="text-blue-400">Swap</span>
          </span>
        </NavLink>

        {/* ─── desktop links ─── */}
        <ul className="hidden sm:flex space-x-10 font-medium">
          <li><NavLink to="/"         onClick={closeAll} className={link}>Home</NavLink></li>
          <li><NavLink to="/about"         onClick={closeAll} className={link}>About</NavLink></li>
          <li><NavLink to="/skills"        onClick={closeAll} className={link}>Skills</NavLink></li>
          <li><NavLink to="/admin/queue"   onClick={closeAll} className={link}>Approve Skills</NavLink></li>

          {/* ─── My Profile dropdown ─── */}
          <li
            ref={profileRef}
            className="relative"
            onMouseEnter={() => setOpenProfile(true)}
            onMouseLeave={(e) => {
              const to = e.relatedTarget;     
              if (!profileRef.current?.contains(to)) setOpenProfile(false);
            }}
          >
            <button className="flex items-center gap-1 hover:text-blue-300 transition select-none">
              Admin Profile
            </button>

            {openProfile && (
              <ul className="absolute right-0 top-full w-44 pt-2 bg-white text-gray-800 rounded-md shadow-lg py-2 z-50">
                <li>
                  <NavLink
                    to="/AdminDashboard"
                    onClick={closeAll}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    My Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/admin/edit-profile"
                    onClick={closeAll}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Edit Profile
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

        {/* ─── mobile burger ─── */}
        <div ref={burgerRef} className="sm:hidden">
          <button onClick={() => setMobileOpen(!mobileOpen)} className="focus:outline-none">
            <svg className="w-7 h-7" stroke="currentColor" fill="none" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* mobile dropdown */}
          <div
            className={`absolute right-0 top-full mt-2 w-56 bg-gray-800 text-white font-medium shadow-lg rounded transition-all overflow-hidden ${
              mobileOpen ? "max-h-96 py-4" : "max-h-0 py-0"
            }`}
            style={{ transitionProperty: "max-height, padding" }}
          >
            <NavLink to="/admin"         onClick={closeAll} className="block px-5 py-2 hover:bg-gray-700">Home</NavLink>
            <NavLink to="/about"         onClick={closeAll} className="block px-5 py-2 hover:bg-gray-700">About</NavLink>
            <NavLink to="/skills"        onClick={closeAll} className="block px-5 py-2 hover:bg-gray-700">Skills</NavLink>
            <NavLink to="/admin/queue"   onClick={closeAll} className="block px-5 py-2 hover:bg-gray-700">Approve Skills</NavLink>
            <NavLink to="/admin/edit-profile" onClick={closeAll} className="block px-5 py-2 hover:bg-gray-700">Edit Profile</NavLink>
            <button
              onClick={handleSignOut}
              className="block w-full text-left px-5 py-2 hover:bg-gray-700 text-red-400"
            >
              Sign out
            </button>
          </div>
        </div>
      </nav>

      {/* routed pages */}
      <div className="sm:pt-7 md:pt-5">
        <Outlet />
      </div>
    </div>
  );
}
