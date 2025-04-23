import Post from '../models/Post.js';
import User from '../models/User.js';
import { v4 as uuidv4 } from 'uuid';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Configure upload directories
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, '../uploads');
const thumbnailsDir = path.join(__dirname, '../thumbnails');

// Create directories if they don't exist
const ensureDirectoryExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

ensureDirectoryExists(uploadsDir);
ensureDirectoryExists(thumbnailsDir);

export const createPost = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        message: 'No video file provided' 
      });
    }

    // Process video upload
    const fileExt = path.extname(req.file.originalname);
    const fileName = `${uuidv4()}${fileExt}`;
    const filePath = path.join(uploadsDir, fileName);
    
    await fs.promises.rename(req.file.path, filePath);

    // Generate thumbnail
    const thumbnailName = `${uuidv4()}.jpg`;
    const thumbnailPath = path.join(thumbnailsDir, thumbnailName);
    
    await new Promise((resolve, reject) => {
      ffmpeg(filePath)
        .screenshots({
          count: 1,
          filename: thumbnailName,
          folder: thumbnailsDir,
          size: '640x360'
        })
        .on('end', resolve)
        .on('error', (err) => {
          console.error('FFmpeg error:', err);
          reject(new Error('Failed to generate thumbnail'));
        });
    });

    // Create post
    const post = await Post.create({
      user: req.user.id,
      title: req.body.title,
      description: req.body.description,
      videoUrl: `/uploads/${fileName}`,
      thumbnailUrl: `/thumbnails/${thumbnailName}`,
      views: 0,
      likes: []
    });

    // Update user's posts
    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { posts: post._id } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: post
    });

  } catch (error) {
    console.error('Error creating post:', error);
    
    // Clean up files if error occurred
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({ 
      success: false,
      message: error.message || 'Error creating post',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Add other controller functions with similar structure
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'username avatar');
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching posts' });
  }
};