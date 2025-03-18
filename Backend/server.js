const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const postRouter = require('./routes/postRoutes'); // Changed to postRouter
const userRouter = require('./routes/userRoutes'); // Changed to userRouter
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRouter); 
app.use('/api/users', userRouter); 

const PORT = process.env.PORT || 5000;
const url = process.env.MONGO_URI;

// Start server and connect to DB
app.listen(PORT, async () => {
  try {
    await connectDB(url);
    console.log(`Server is running on port ${PORT}`);
  } catch (err) {
    console.log(err);
  }
});