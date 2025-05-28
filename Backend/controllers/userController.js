// controllers/userController.js

const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Post = require('../models/Post');
const fs = require('fs');
const path = require('path');

// User Signup
const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    // Save to DB
    const savedUser = await newUser.save();

    const userToReturn = { ...savedUser._doc };
    delete userToReturn.password;

    res.status(201).json({
      success: true,
      user: userToReturn,
      message: 'User created successfully'
    });

  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const posts = await Post.find({ user: userId }).sort({ createdAt: -1 }).lean();

    // Convert profile picture path to full URL
    if (user.profilePicture) {
      user.profilePicture = `${req.protocol}://${req.get('host')}/${user.profilePicture.replace(/\\/g, '/')}`;
    }

    res.status(200).json({
      success: true,
      user,
      posts
    });

  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile'
    });
  }
};

module.exports = {
  signup,
  getUserProfile
};
