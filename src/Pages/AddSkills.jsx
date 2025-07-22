// AddSkills.jsx – Firestore + EmailJS + Cloudinary upload with preview & progress

import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";

import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/* ── EmailJS config ── */
const SERVICE_ID  = "service_7gls99b";
const TEMPLATE_ID = "template_jf2x1is";
const PUBLIC_KEY  = "SofTLFer6c_bZJiC5";

/* ── Cloudinary config ── */
const CLOUD_NAME    = "dqke5ooqu";  // replace
const UPLOAD_PRESET = "SkillSwap";   // replace (unsigned)

function uploadToCloudinary(file, onProgress = () => {}) {
  return new Promise((resolve, reject) => {
    const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable) {
        const percent = Math.round((e.loaded * 100) / e.total);
        onProgress(percent);
      }
    });

    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        resolve(data.secure_url);
      } else {
        reject(new Error("Cloudinary upload failed"));
      }
    };

    xhr.onerror = () => reject(new Error("Cloudinary upload failed"));

    xhr.send(formData);
  });
}

export default function AddSkills() {
  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    icon: "",
    imageFile: null,
    emailid: "",
    phnumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!form.imageFile) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(form.imageFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [form.imageFile]);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleFileChange = (e) =>
    setForm((p) => ({ ...p, imageFile: e.target.files[0] || null }));

  const resetForm = () => {
    setForm({
      title: "",
      category: "",
      description: "",
      icon: "",
      imageFile: null,
      emailid: "",
      phnumber: "",
    });
    setPreview(null);
    setProgress(0);
  };

  const sendAdminEmail = (skill) =>
    emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        user_name: skill.emailid,
        skill_title: skill.title,
        skill_category: skill.category,
        skill_description: skill.description || "-",
      },
      PUBLIC_KEY
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.category.trim()) {
      toast.error("Title and Category are required!");
      return;
    }

    setLoading(true);
    setProgress(0);

    try {
      let imageUrl = "";
      if (form.imageFile) {
        imageUrl = await uploadToCloudinary(form.imageFile, setProgress);
      }

      const skillDoc = {
        title: form.title,
        category: form.category,
        description: form.description,
        icon: form.icon,
        image: imageUrl,
        emailid: form.emailid,
        phnumber: form.phnumber,
        status: "nowpending", // 🔁 MODIFIED HERE
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "skills"), skillDoc);
      await sendAdminEmail(skillDoc);

      toast.success("Skill submitted! Admin notified.", { duration: 3000 });
      resetForm();
    } catch (err) {
      console.error("Add skill failed:", err);
      toast.error(err.message || "Failed to submit skill.");
    } finally {
      setLoading(false);
    }
  };

  const baseInput =
    "mt-1 w-full px-4 py-2 border rounded-lg bg-white placeholder-gray-400 " +
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

  return (
    <section className="fixed inset-0 flex items-center justify-center bg-gradient-to-b from-blue-200 to-blue-300 px-6 pt-20 pb-6 z-40 overflow-auto">
      <div className="max-w-3xl w-full bg-white/70 backdrop-blur-sm shadow-xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">Add a New Skill</h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* title + category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Skill Title</label>
              <input name="title" value={form.title} onChange={handleChange} type="text" placeholder="e.g. UI/UX Design" className={baseInput} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input name="category" value={form.category} onChange={handleChange} type="text" placeholder="e.g. Design" className={baseInput} required />
            </div>
          </div>

          {/* description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows="3" placeholder="Brief summary" className={baseInput} />
          </div>

          {/* icon + image */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div>
              <label className="block text-sm font-medium text-gray-700">Icon (optional)</label>
              <input name="icon" value={form.icon} onChange={handleChange} type="text" placeholder="lucide:Wrench" className={baseInput} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Skill Image</label>
              <input type="file" accept="image/*" onChange={handleFileChange} className="mt-1 w-full text-sm" />
              {preview && (
                <img src={preview} alt="preview" className="mt-2 h-32 w-full object-cover rounded-lg border" />
              )}
            </div>
          </div>

          {/* progress bar */}
          {loading && progress > 0 && progress < 100 && (
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${progress}%` }} />
            </div>
          )}

          {/* contact info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email ID</label>
              <input name="emailid" value={form.emailid} onChange={handleChange} type="email" placeholder="name@example.com" className={baseInput} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Number</label>
              <input name="phnumber" value={form.phnumber} onChange={handleChange} type="tel" placeholder="e.g. 9876543210" className={baseInput} required />
            </div>
          </div>

          {/* submit */}
          <div className="text-center">
            <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-2 rounded-lg shadow transition disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? (progress === 100 ? "Finishing…" : `Uploading ${progress}%`) : "Add Skill"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
