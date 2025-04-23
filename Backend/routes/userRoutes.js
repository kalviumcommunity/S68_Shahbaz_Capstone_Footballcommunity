const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../config/multerConfig');
import { signup } from '../controllers/userController';

const userRouter = express.Router();

userRouter.post('/signup', signup);

// Get authenticated user's profile
userRouter.get('/profile', authMiddleware, getUserProfile);

// Update profile with optional picture upload
userRouter.put(
  '/profile',
  authMiddleware,
  upload.single('profilePicture'), // Handles profile image upload
  updateUserProfile
);

// Delete user profile
userRouter.delete('/profile', authMiddleware, deleteUserProfile);

module.exports = userRouter;