// /pages/api/posts/next.js
import { posts } from './index'; // فرض بر اینه که تو یه فایل مشترک نگه می‌داری

export default function handler(req, res) {
  if (posts.length === 0) {
    return res.status(404).json({ message: 'No posts found' });
  }

  const randomPost = posts[Math.floor(Math.random() * posts.length)];
  return res.status(200).json(randomPost);
}
