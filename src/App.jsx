// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";

/* context & guards */
import AuthProvider, { useAuth } from "./AuthProvider";
import Layout from "./Layout";
import RequireAuth from "./RequireAuth";
import RequireAdmin from "./Components/RequireAdmin";

/* pages */
import Home from "./Pages/Home";
import About from "./Pages/About";
import Skills from "./Pages/Skills";
import AddSkills from "./Pages/AddSkills";
import BookMarks from "./Pages/BookMarks";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import ErrorPage from "./Pages/Error";
import ApproveQueue from "./Pages/ApproveQueue";
import AdminHome from "./Pages/AdminHome";
import UserDashboard from "./Pages/UserDashboard";
import AdminDashboard from "./Pages/AdminDashboard";
import ExpertInsights from "./Pages/ExpertInsights";

/* custom loader */
import Loader from "./Components/Loader"; // ✅ your SVG loader component

/* --------- App with Auth Check --------- */
function AppWithAuth() {
  const { loading } = useAuth();
  const [showLoader, setShowLoader] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000); // ⏱️ force loader for at least 3 seconds

    return () => clearTimeout(timer);
  }, []);

  if (loading || showLoader) return <Loader />;

  return (
    <Routes>
      <Route element={<Layout />}>
        {/* ─── PUBLIC ─── */}
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="skills" element={<Skills />} />
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />
        <Route path="expertinsights" element={<ExpertInsights />} />
        <Route path="userdashboard" element={<UserDashboard />} />
        <Route path="admindashboard" element={<AdminDashboard />} />

        {/* ─── USER-PROTECTED ─── */}
        <Route
          path="addskills"
          element={
            <RequireAuth>
              <AddSkills />
            </RequireAuth>
          }
        />
        <Route
          path="bookmarks"
          element={
            <RequireAuth>
              <BookMarks />
            </RequireAuth>
          }
        />

        {/* ─── ADMIN-ONLY ─── */}
        <Route
          path="admin"
          element={
            <RequireAdmin>
              <AdminHome />
            </RequireAdmin>
          }
        />
        <Route
          path="admin/queue"
          element={
            <RequireAdmin>
              <ApproveQueue />
            </RequireAdmin>
          }
        />

        {/* catch-all */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}

/* --------- Main App --------- */
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
        <AppWithAuth />
      </AuthProvider>
    </BrowserRouter>
  );
}
