import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { skillsSeed } from "../data/SkillsSeedData";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dqke5ooqu/image/upload"; // 🔁 your cloud
const UPLOAD_PRESET  = "SkillSwap";                                              // 🔁 your preset

/** fetch local asset → Blob → upload to Cloudinary → return secure_url */
async function uploadImage(localPath, fileName) {
  const r   = await fetch(localPath);
  const blob = await r.blob();

  const fd = new FormData();
  fd.append("file", blob, fileName);
  fd.append("upload_preset", UPLOAD_PRESET);

  const up  = await fetch(CLOUDINARY_URL, { method: "POST", body: fd });
  const res = await up.json();
  if (!up.ok) throw new Error(res.error?.message || "Upload failed");
  return res.secure_url;
}

export async function seedSkills() {
  for (const s of skillsSeed) {
    try {
      const url = await uploadImage(s.image, s.title.replace(/\\s+/g, "_") + ".jpg");

      await addDoc(collection(db, "skills"), {
        title:       s.title,
        category:    s.category,
        description: s.description,
        image:       url,
        status:      "approved",
        createdAt:   serverTimestamp(),
      });

      console.log("✅ added", s.title);
    } catch (e) {
      console.error("❌", s.title, e);
    }
  }
  console.log("🎉 seeding finished");
}
