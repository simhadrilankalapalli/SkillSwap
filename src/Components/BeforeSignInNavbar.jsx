import React, { useState, useRef, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";

function BeforeSignInNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  /* — util — */
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-blue-500 transition-all"
      : "hover:text-blue-600 transition-all";

  const closeMenu = () => {
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  /* — close when clicking outside — */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* — JSX — */
  return (
    <div className="relative">
      {/* top bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-gray-800 text-white px-6 py-4 sm:px-10">
        {/* logo */}
        <NavLink to="/" onClick={closeMenu} className="flex items-center gap-2">
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

        {/* hamburger */}
        <div ref={wrapperRef} className="sm:hidden relative">
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            {/* icon changes */}
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

          {/* mobile menu */}
          <div
            className={`absolute left-full top-full mt-2 -translate-x-1/2 w-[90vw] max-w-sm bg-gray-800 text-white font-bold text-md shadow-md px-6 overflow-hidden transition-all duration-300 ease-in-out ${
              isOpen ? "max-h-[500px] opacity-100 py-6" : "max-h-0 opacity-0 py-0"
            }`}
            style={{ transitionProperty: "max-height, opacity, padding" }}
          >
            <div className="flex flex-col space-y-4">
              <NavLink to="/" onClick={closeMenu} className={navLinkClass}>
                Home
              </NavLink>
              <NavLink to="/about" onClick={closeMenu} className={navLinkClass}>
                About
              </NavLink>
              <NavLink to="/skills" onClick={closeMenu} className={navLinkClass}>
                Skills
              </NavLink>
              <NavLink to="/signin" onClick={closeMenu} className={navLinkClass}>
                Sign&nbsp;in
              </NavLink>
            </div>
          </div>
        </div>

        {/* desktop links */}
        <ul className="hidden sm:flex space-x-14 mr-4 font-bold text-md">
          <li>
            <NavLink to="/" onClick={closeMenu} className={navLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" onClick={closeMenu} className={navLinkClass}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/skills" onClick={closeMenu} className={navLinkClass}>
              Skills
            </NavLink>
          </li>
          <li>
            <NavLink to="/signin" onClick={closeMenu} className={navLinkClass}>
              Sign in
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* content */}
      <div className="pt-0">
        <Outlet />
      </div>
    </div>
  );
}

export default BeforeSignInNavbar;
