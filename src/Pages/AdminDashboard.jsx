import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  collection,
  query,
  where,
  getCountFromServer,
  getDocs,
  orderBy,
  limit,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import {
  Users,
  CheckCircle,
  Clock,
  ShieldCheck,
  XCircle,
  Sparkles,
} from "lucide-react";

/* ─────────────────────────────────────────── */

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });
  const [latestPending, setLatestPending] = useState([]);
  const [approvedSkills, setApprovedSkills] = useState([]);
  const [nowApprovedSkills, setNowApprovedSkills] = useState([]);
  const [rejectedSkills, setRejectedSkills] = useState([]);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(null); // null | "approved" | "rejected" | "expertInsights"
  const navigate = useNavigate();

  const fetchCounts = async () => {
    const [u, a, p, r] = await Promise.all([
      getCountFromServer(collection(db, "users")),
      getCountFromServer(
        query(collection(db, "skills"), where("status", "==", "approved"))
      ),
      getCountFromServer(
        query(collection(db, "skills"), where("status", "==", "pending"))
      ),
      getCountFromServer(
        query(collection(db, "skills"), where("status", "==", "rejected"))
      ),
    ]);
    setStats({
      users: u.data().count,
      approved: a.data().count,
      pending: p.data().count,
      rejected: r.data().count,
    });
  };

  const mapSkill = (d) => {
    const data = d.data();
    return {
      id: d.id,
      title: data.title,
      category: data.category,
      description: data.description,
      emailid: data.emailid,
      phnumber: data.phnumber || data.phone,
      image: data.image,
      createdAt: data.createdAt ? data.createdAt.toDate() : null,
    };
  };

  const fetchReviewedSkills = async () => {
    const [aSnap, rSnap, nSnap] = await Promise.all([
      getDocs(
        query(
          collection(db, "skills"),
          where("status", "==", "approved"),
          orderBy("createdAt", "desc")
        )
      ),
      getDocs(
        query(
          collection(db, "skills"),
          where("status", "==", "rejected"),
          orderBy("createdAt", "desc")
        )
      ),
      getDocs(
        query(
          collection(db, "skills"),
          where("status", "==", "nowapproved"),
          orderBy("createdAt", "desc")
        )
      ),
    ]);
    setApprovedSkills(aSnap.docs.map(mapSkill));
    setRejectedSkills(rSnap.docs.map(mapSkill));
    setNowApprovedSkills(nSnap.docs.map(mapSkill));
  };

  useEffect(() => {
  const tabToIdMap = {
    approved: "allsapprovedskills",
    rejected: "allsrejectedskills",
    expertInsights: "allexpertinsightskills",
  };

  const targetId = tabToIdMap[activeTab];
  if (targetId) {
    const el = document.getElementById(targetId);
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }
}, [activeTab]);

  useEffect(() => {
    (async () => {
      try {
        await Promise.all([fetchCounts(), fetchReviewedSkills()]);

        const pendingSnap = await getDocs(
          query(
            collection(db, "skills"),
            where("status", "==", "nowpending"),
            orderBy("createdAt", "desc"),
            limit(10)
          )
        );
        setLatestPending(pendingSnap.docs.map(mapSkill));

        const usersSnap = await getDocs(
          query(collection(db, "users"), orderBy("createdAt", "desc"))
        );
        setUserList(
          usersSnap.docs.map((d) => ({ id: d.id, ...d.data() }))
        );
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const changeStatus = async (id, status) => {
    try {
      await updateDoc(doc(db, "skills", id), { status });
      setLatestPending((prev) => prev.filter((s) => s.id !== id));
      await Promise.all([fetchCounts(), fetchReviewedSkills()]);
      toast.success(status === "approved" ? "Skill approved" : "Skill rejected");
    } catch (err) {
      console.error("Status change error:", err);
      toast.error("Update failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="animate-pulse text-blue-600">Loading admin dashboard…</p>
      </div>
    );
  }

  const statCard =
    "flex items-center gap-4 bg-white shadow rounded-lg p-5 border border-blue-200";
  const skillCardBase =
    "flex flex-col bg-white rounded-lg shadow-md p-4 gap-3 border";

  const renderSkillCard = (s, tone) => (
    <div
      key={s.id}
      className={`${skillCardBase} ${
        tone === "green" ? "border-green-300" : tone === "blue" ? "border-blue-300" : "border-red-300"
      }`}
    >
      <div className="flex justify-between items-start">
        <h3
          className={`font-medium ${
            tone === "green"
              ? "text-green-800"
              : tone === "blue"
              ? "text-blue-800"
              : "text-red-800"
          }`}
        >
          {s.title}{" "}
          <span className="text-xs text-gray-500">({s.category})</span>
        </h3>
        {s.createdAt && (
          <span className="text-[11px] text-gray-500">
            {s.createdAt.toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </span>
        )}
      </div>

      <p className="text-xs text-gray-500">
        {s.emailid}
        {s.phnumber && ` • ${s.phnumber}`}
      </p>

      <p className="text-sm text-gray-700 break-words">{s.description}</p>

      {s.image && (
        <img
          src={s.image}
          alt={s.title}
          className="w-full h-40 object-cover rounded"
        />
      )}
    </div>
  );

  return (
    <div className="p-6 pt-24 max-w-7xl mx-auto space-y-12">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Admin Dashboard</h1>

      {/* ── stats ── */}
      <div className="grid sm:grid-cols-3 gap-6">
        <div className={statCard}>
          <Users className="w-10 h-10 text-blue-600" />
          <div>
            <p className="text-2xl font-semibold text-blue-800">{stats.users}</p>
            <p className="text-sm text-gray-600">Total Users</p>
          </div>
        </div>
        <div className={statCard}>
          <CheckCircle className="w-10 h-10 text-green-600" />
          <div>
            <p className="text-2xl font-semibold text-green-700">{stats.approved}</p>
            <p className="text-sm text-gray-600">Approved Skills</p>
          </div>
        </div>
        <div className={statCard}>
          <Clock className="w-10 h-10 text-yellow-500" />
          <div>
            <p className="text-2xl font-semibold text-yellow-700">{stats.pending}</p>
            <p className="text-sm text-gray-600">Pending Skills</p>
          </div>
        </div>
      </div>

      {/* ── actions ── */}
      <section className="bg-white rounded-xl shadow-md p-6 border border-blue-200 flex flex-wrap gap-4">
        <button
          onClick={() => navigate("/admin/queue")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          <ShieldCheck className="w-5 h-5" /> Review Pending Skills
        </button>

        <Link
          to="/admin/users"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          <Users className="w-5 h-5" /> Manage Users
        </Link>

        <button
          onClick={() => setActiveTab("approved")}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          <CheckCircle className="w-5 h-5" /> All Approved Skills
        </button>

        <button
          onClick={() => setActiveTab("rejected")}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          <XCircle className="w-5 h-5" /> All Rejected Skills
        </button>

        <button
          onClick={() => setActiveTab("expertInsights")}
          className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded"
        >
          <Sparkles className="w-5 h-5" /> All Expert Insights Approved Skills
        </button>
      </section>

      {/* ── latest pending ── */}
      <section>
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">
          Latest Pending Skills
        </h2>
        {latestPending.length === 0 ? (
          <p className="text-gray-600">No pending skills right now.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {latestPending.map((s) => (
              <div key={s.id} className={`${skillCardBase} border-blue-200`}>
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-blue-900">
                    {s.title} <span className="text-xs text-gray-500">({s.category})</span>
                  </h3>
                  <span className="text-xs text-gray-500">by {s.emailid}</span>
                </div>
                <p className="text-sm text-gray-700 break-words">{s.description}</p>
                {s.image && (
                  <img src={s.image} alt={s.title} className="w-full h-40 object-cover rounded" />
                )}
                <div className="flex gap-3 mt-2">
                  <button
                    onClick={() => changeStatus(s.id, "approved")}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => changeStatus(s.id, "rejected")}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── all users ── */}
      <section>
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">All Users</h2>
        {userList.length === 0 ? (
          <p className="text-gray-600">No users found.</p>
        ) : (
          <div className="overflow-x-auto bg-white border rounded-lg shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-blue-800">Name</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-blue-800">Email</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-blue-800">Phone</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {userList.map((u) => (
                  <tr key={u.id} className="hover:bg-blue-50">
                    <td className="px-4 py-2 text-sm text-gray-800">{u.name || "—"}</td>
                    <td className="px-4 py-2 text-sm text-gray-800">{u.email || u.emailid}</td>
                    <td className="px-4 py-2 text-sm text-gray-800">{u.phnumber || u.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ── conditional tab views ── */}
      {activeTab === "approved" && (
        <section id="allsapprovedskills">
          <h2 className="text-2xl font-semibold text-green-700 mb-4 flex items-center gap-2">
            <CheckCircle className="w-6 h-6" /> Approved Skills ({stats.approved})
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {approvedSkills.map((s) => renderSkillCard(s, "green"))}
          </div>
        </section>
      )}

      {activeTab === "rejected" && (
        <section id="allsrejectedskills">
          <h2 className="text-2xl font-semibold text-red-700 mb-4 flex items-center gap-2">
            <XCircle className="w-6 h-6" /> Rejected Skills ({stats.rejected})
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {rejectedSkills.map((s) => renderSkillCard(s, "red"))}
          </div>
        </section>
      )}

      {activeTab === "expertInsights" && (
        <section id="allexpertinsightskills">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4 flex items-center gap-2">
            <Sparkles className="w-6 h-6" /> Expert Insights Approved Skills (
            {nowApprovedSkills.length})
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {nowApprovedSkills.map((s) => renderSkillCard(s, "blue"))}
          </div>
        </section>
      )}
    </div>
  );
}
