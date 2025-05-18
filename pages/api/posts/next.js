// pages/api/posts/next.js
import { db } from "../../../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
  const postsRef = collection(db, "posts");

  try {
    const snapshot = await getDocs(postsRef);
    const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    if (!posts.length) {
      return res.status(404).json({ message: "No posts found" });
    }

    const randomPost = posts[Math.floor(Math.random() * posts.length)];
    return res.status(200).json(randomPost);
  } catch (err) {
    return res.status(500).json({ error: "Error loading post" });
  }
}
