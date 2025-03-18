const express = require('express');
const { createPost, getPosts } = require('../controllers/postController');
const authMiddleware = require('../middleware/authMiddleware');

const postRouter = express.Router(); 

// Create a post
postRouter.post('/', authMiddleware, createPost);

// Get all posts
postRouter.get('/', getPosts);

module.exports = postRouter;