Brief Description:
**Estadio** is a football community website built using the **MERN stack**, where users can **create accounts, log in, and upload their favorite football moments**—including last-minute goals, legendary moments, funny compilations, and personal opinions. The platform will include features like **user profile management, post creation, likes, comments, and a search function** to enhance user interaction and engagement.

## Roadmap for Estadio - Football Community Website (MERN Stack)

### 1. Project Planning & Setup
- **Feature Finalization:**
  - User Authentication: Signup, Login, Logout.
  - User Profiles: Displaying user information and uploaded content.
  - Post Upload: Users can upload their favorite football moments (last-minute goals, all-time best moments, funny compilations, opinions) in video, image, or text format.
  - Interactions: Users can like and comment on posts.
  - Search: Users can search for specific posts or users.

- **Database Structure Planning:**
  - Users Collection:
    - Username (unique)
    - Email (unique)
    - Password (hashed)
    - Profile picture
    - Bio
  - Posts Collection:
    - User ID (reference to Users collection)
    - Media URL (video/image)
    - Caption
    - Likes (array of User IDs)
    - Comments (array of comment objects)
    - Timestamp
  - Comments Collection:
    - Post ID (reference to Posts collection)
    - User ID (reference to Users collection)
    - Comment text
    - Timestamp

- **Project Structure:**
  ```
  Estadio/
  |-- backend/
  |   |-- controllers/
  |   |-- models/
  |   |-- routes/
  |   |-- config/
  |   |-- server.js
  |-- frontend/
  |   |-- src/
  |       |-- components/
  |       |-- pages/
  |       |-- App.js
  |       |-- index.js
  |-- .env
  |-- package.json
  |-- README.md
  ```

- **Version Control:**
  - First Initialize a Git repository.
  - Create a GitHub repository and push initial setup.

---

### 2. Backend Development (Node.js, Express, MongoDB)
- **Environment Setup:**
  - Installing necessary packages: express, mongoose, dotenv, bcryptjs, jsonwebtoken, multer, cors.
  - Set up `.env` file for environment variables (like database URL and JWT secret).

- **Database Connection:**
  - Connecting MongoDB using Mongoose.

- **API Routes:**
  - User Routes:
    - POST /signup: Register a new user.
    - POST /login: Authenticate user and return JWT token.
    - GET /profile/:id: Fetching user profile data.
  - Post Routes:
    - POST /posts: Create a new post.
    - GET /posts: Fetch all posts.
    - GET /posts/:id: Fetch a specific post.
    - DELETE /posts/:id: Delete a post.
  - Comment Routes:
    - POST /comments: Add a comment to a post.
    - DELETE /comments/:id: Delete a comment.

- **Middleware:**
  - Authentication Middleware: Protect routes and verify JWT tokens.
  - File Upload Middleware: Handle media uploads (use services like Cloudinary or AWS S3).

- **Security:**
  - Hash passwords with bcrypt.
  - Use JWT for user session management.

---

### 3. Frontend Development (React)
- **Environment Setup:**
  - Install necessary packages: axios, react-router-dom, redux, tailwindcss.

- **Pages:**
  - Home Page: Display feed of all posts.
  - Signup/Login Page: Form for user authentication.
  - Profile Page: Show user info and their uploaded posts.
  - Post Upload Page: Form to upload media and captions.
  - Post Detail Page: Display a single post with comments and likes.

- **Components:**
  - Navbar: Navigation links and user info.
  - PostCard: Display individual posts.
  - CommentSection: Show and add comments.
  - LikeButton: Like interaction for posts.

- **State Management:**
  - Manage user authentication state and post data.

- **Client-side Validation:**
  - Form validation for signup, login, and post upload.

---

### 4. Backend & Frontend Integration
- **API Calls:**
  - Use Axios to make HTTP requests.
  - Implement secure routes with JWT tokens.

- **Dynamic Content:**
  - Display user-specific content on profile page.
  - Update UI based on API responses.

- **Protected Routes:**
  - Restrict access to authenticated users for creating and interacting with posts.

---

### 5. Testing & Debugging
- **API Testing:**
  - Use Postman to test backend API routes.

- **Frontend Testing:**
  - Use console logs and React DevTools for debugging.

- **Error Handling:**
  - Implement try-catch blocks and error messages.

---

### 6. Deployment
- **Backend Deployment:**
  - Use Render or Railway for hosting.

- **Frontend Deployment:**
  - Use Vercel or Netlify for hosting.

- **Environment Variables:**
  - Securely manage API keys and database URLs.

- **Domain Setup:**
  - (Optional) Connect custom domain if available.
 

###Get API used 

  ** PUT API USED **

  ***DATABASE CREATED ****


