// pages/api/posts/index.js
import { db } from "../../../lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
  const postsRef = collection(db, "posts");

  if (req.method === "POST") {
    const { url, username, image, type, targetCount } = req.body;
    if (!url || !username || !image || !type) {
      return res.status(400).json({ error: "Missing fields" });
    }

    try {
      const newPost = {
        url,
        username,
        image,
        type,
        currentCount: 0,
        targetCount: targetCount || 100
      };

      const docRef = await addDoc(postsRef, newPost);
      return res.status(201).json({ id: docRef.id, ...newPost });
    } catch (err) {
      return res.status(500).json({ error: "Failed to create post" });
    }
  }

  if (req.method === "GET") {
    try {
      const snapshot = await getDocs(postsRef);
      const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return res.status(200).json(posts);
    } catch (err) {
      return res.status(500).json({ error: "Failed to fetch posts" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
