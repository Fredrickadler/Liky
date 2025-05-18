// /pages/api/posts/index.js
let posts = [];

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { url, username, image, type, targetCount } = req.body;
    const newPost = {
      id: Date.now().toString(),
      url,
      username,
      image,
      type,
      currentCount: 0,
      targetCount: targetCount || 100,
    };
    posts.push(newPost);
    return res.status(201).json(newPost);
  }

  if (req.method === 'GET') {
    return res.status(200).json(posts);
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}
