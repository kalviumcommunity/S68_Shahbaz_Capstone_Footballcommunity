const Post = require('../models/Post');

// Create Post
const createPost = async (req, res) => {
  const { title, description, videoUrl } = req.body;

  try {
    const post = await Post.create({
      user: req.user.id,
      title,
      description,
      videoUrl,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'username profilePicture');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPost, getPosts };