const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const userRouter = express.Router(); // Changed to userRouter

// Get user profile
userRouter.get('/profile', authMiddleware, getUserProfile);

// Update user profile
userRouter.put('/profile', authMiddleware, updateUserProfile);

// Delete user profile
userRouter.delete('/profile', authMiddleware, deleteUserProfile);

module.exports = userRouter; 