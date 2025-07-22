import { useState, useEffect } from "react";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";

export const useBookmarks = (userId, collectionName) => {
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setBookmarkedIds([]);
      setLoading(false);
      return;
    }

    const bookmarkDocRef = doc(collection(db, "bookmarks"), userId);

    const unsubscribe = onSnapshot(bookmarkDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setBookmarkedIds(data[collectionName] || []);
      } else {
        setBookmarkedIds([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId, collectionName]);

  const toggleBookmark = async (skillId) => {
    if (!userId || !collectionName) {
      console.warn("❗ Missing userId or collectionName");
      return;
    }

    const bookmarkDocRef = doc(collection(db, "bookmarks"), userId);
    const docSnap = await getDoc(bookmarkDocRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const alreadyBookmarked = data[collectionName]?.includes(skillId);

      await updateDoc(bookmarkDocRef, {
        [collectionName]: alreadyBookmarked
          ? arrayRemove(skillId)
          : arrayUnion(skillId),
      });
    } else {
      await setDoc(bookmarkDocRef, {
        [collectionName]: [skillId],
      });
    }
  };

  const addBookmark = async (skillId) => {
    if (!userId || !collectionName) return;
    const ref = doc(db, "bookmarks", userId);
    await setDoc(ref, { [collectionName]: arrayUnion(skillId) }, { merge: true });
  };

  const removeBookmark = async (skillId) => {
    if (!userId || !collectionName) return;
    const ref = doc(db, "bookmarks", userId);
    await updateDoc(ref, { [collectionName]: arrayRemove(skillId) });
  };

  // ✅ This was missing — required by ExpertInsights
  const isBookmarked = (skillId) => {
    return bookmarkedIds.includes(skillId);
  };

  return {
    bookmarkedIds,
    toggleBookmark,
    addBookmark,
    removeBookmark,
    isBookmarked,
    loading,
  };
};
