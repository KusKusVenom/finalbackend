User Authentication: JWT-based secure login and registration
Post Management: Create, read, update, and delete blog posts
Comments System: Users can comment on posts
Role-Based Access Control (RBAC): Admin users have elevated privileges
Responsive Design: Mobile-friendly interface
RESTful API: Clean, organized backend architecture
Real-time Updates: Dynamic UI without page refreshes

Tech Stack
Backend

Node.js & Express.js
MongoDB & Mongoose
JWT for authentication
bcryptjs for password hashing
Express Validator for input validation

Frontend

Vanilla JavaScript (ES6+)
HTML5 & CSS3
Responsive design with CSS Grid/Flexbox

 Prerequisites

Node.js (v14 or higher)
MongoDB account (MongoDB Atlas recommended)
Git


Go to MongoDB Atlas
Create a free cluster
Create a database user
Get your connection string
Replace <username>, <password>, and database name

Start the backend server:
bashnpm start
# or for development with auto-reload:
npm run dev
Server runs on: http://localhost:5000
3. Frontend Setup
bashcd ../frontend
Update the API URL in app.js (line 2):

For local development: const API_URL = 'http://localhost:5000/api';
For production: const API_URL = 'https://your-backend-url.com/api';

Open index.html in your browser or use a local server:
bash# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server -p 8000
Frontend runs on: http://localhost:8000
 Deployment
Backend Deployment (Render)

Push your code to GitHub
Go to Render
Create a new Web Service
Connect your GitHub repository
Configure:

Build Command: cd backend && npm install
Start Command: cd backend && npm start
Environment Variables: Add all variables from .env


Click "Create Web Service"

Your backend will be live at: https://your-app.onrender.com
Frontend Deployment (Netlify)

Go to Netlify
Drag and drop the frontend folder
Important: Update API_URL in app.js to your Render backend URL
Site is live!

Or using Netlify CLI:
bashcd frontend
npm install -g netlify-cli
netlify deploy --prod

 API Documentation
Authentication Endpoints
Register User
httpPOST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
Login User
httpPOST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
Get Profile
httpGET /api/auth/profile
Authorization: Bearer <token>
Post Endpoints
Get All Posts
httpGET /api/posts
Get Single Post
httpGET /api/posts/:id
Create Post (Protected)
httpPOST /api/posts
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My First Post",
  "content": "This is the content of my post..."
}
Update Post (Protected)
httpPUT /api/posts/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content..."
}
Delete Post (Protected)
httpDELETE /api/posts/:id
Authorization: Bearer <token>
Get My Posts (Protected)
httpGET /api/posts/user/my-posts
Authorization: Bearer <token>
Comment Endpoints
Get Comments for Post
httpGET /api/comments/post/:postId
Create Comment (Protected)
httpPOST /api/comments/post/:postId
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Great post!"
}
Update Comment (Protected)
httpPUT /api/comments/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "content": "Updated comment"
}
Delete Comment (Protected)
httpDELETE /api/comments/:id
Authorization: Bearer <token>
Get All Comments - Admin Only
httpGET /api/comments/all
Authorization: Bearer <admin-token>

Security Features

Password hashing with bcryptjs
JWT token authentication
Input validation and sanitization
Role-Based Access Control (RBAC)
Protected routes requiring authentication
Owner/Admin authorization for modifications

 User Roles

User: Can create posts and comments, edit/delete own content
Admin: Can edit/delete any content

 Testing
Use the provided Postman collection to test all endpoints.
Create Admin User
To create an admin user, manually update a user in MongoDB:
javascriptdb.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
TODO / Future Enhancements

 Edit post functionality in frontend
 Image upload for posts
 User profiles
 Like/upvote system
 Search functionality
 Pagination
 Rich text editor
 Email verification
 Password reset

Uses MongoDB Atlas for database hosting
Deployed on Render and Netlify