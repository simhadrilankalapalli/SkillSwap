// src/Layout.jsx
import React from "react";
// import { Outlet } from "react-router-dom";

import { useAuth } from "./AuthProvider";

import BeforeSignInNavbar from "./Components/BeforeSignInNavbar";
import AfterSignInNavbar  from "./Components/AfterSignInNavbar";
import AdminNavbar        from "./Components/AdminNavbar";

export default function Layout() {
  const { user } = useAuth();

  let Navbar;
  if (!user) {
    Navbar = BeforeSignInNavbar;                 // guest
  } else if (user.email === "admin@gmail.com") { // admin
    Navbar = AdminNavbar;
  } else {
    Navbar = AfterSignInNavbar;                  // normal user
  }

  return (
    <>
      <Navbar />
      {/* all routed pages render here */}
      {/* <Outlet /> */}
    </>
  );
}
