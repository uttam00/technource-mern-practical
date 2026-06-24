# Setup Instructions
## 1. Clone Project
git clone https://github.com/uttam00/technource-mern-practical.git
cd mern-blog-app

---

#  Backend Setup

## Install dependencies
cd backend
npm install

## Create .env file
-PORT=3000
-MONGODB_URI=mongodb://127.0.0.1:27017/mernPractical
-JWT_SECRET=your_secret_key

## Start backend
npm start

Backend runs at:
http://localhost:3000

---

#  Frontend Setup

## Install dependencies
cd frontend
npm install

## Start frontend
npm run dev

Frontend runs at:
http://localhost:5173

---

# Default Login (Seeder)

Email: admin@gmail.com
Password: 123456

---

#  Common Issues

MongoDB not connecting:
- Check MONGODB_URI
- Ensure MongoDB is running

JWT error:
- Check JWT_SECRET in .env

CORS issue:
Add in backend:
app.use(cors());

---

# Features
##  Authentication
- JWT Login system
- Protected routes (Create, Edit, Delete)
- Seeder-based default user

##  Blog Features
- Create blog posts
- Edit blog posts
- Delete blog posts
- View all blogs (public)
- View single blog details

##  Advanced Features
- Search blogs (title/description)
- Server-side pagination
- Tags filtering
- Real-time form validation

##  Frontend
- React.js UI
- Redux Toolkit state management
- React Router navigation
- Bootstrap responsive UI
- Reusable components (BlogCard)

---

#  Tech Stack
Frontend:
- React.js
- Redux Toolkit
- React Router DOM
- Axios
- Bootstrap

Backend:
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs
- dotenv

---

#  Project Structure
project-root/
backend/
- models/
- controllers/
- routes/
- middleware/
- seed/
- server.js
- .env

frontend/
- src/
- components/
- pages/
- features/
- service/
- App.jsx

---
