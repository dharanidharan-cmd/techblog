# TechBlog – Modern Blogging Platform

A full-stack blogging platform built using the MERN stack, where users can explore and read articles while administrators can create, manage, edit, and publish blog posts.

## 🌐 Live Demo

- **Frontend:** https://techblog-xi-ecru.vercel.app/
- **Backend API:** https://techblog-63dr.onrender.com/

## 🚀 Features

### User Features
- Browse published blog articles.
- View detailed blog posts.
- Explore blogs by category.
- Discover featured articles.
- Responsive user interface.

### Admin Features
- Admin login.
- Create and publish blog posts.
- Edit existing articles.
- Delete blog posts.
- Manage published and unpublished blogs.
- Track total blog views.
- Admin dashboard for blog management.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend |
| Vite | Frontend build tool |
| Node.js | Backend runtime |
| Express.js | Backend framework |
| MongoDB Atlas | Cloud database |
| Mongoose | Database management |
| CSS | Styling |
| Git & GitHub | Version control |
| Vercel | Frontend deployment |
| Render | Backend deployment |

## 📂 Project Structure

```text
TechBlog/
│
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── ...
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/dharanidharan-cmd/techblog.git
cd techblog
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server` folder:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

Start the backend:

```bash
npm start
```

### 3. Setup Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

The frontend will run locally using Vite.

## 🔗 Deployment

- Frontend hosted on Vercel.
- Backend hosted on Render.
- Database hosted on MongoDB Atlas.

## 🎯 Project Goal

The goal of TechBlog is to provide a simple and user-friendly blogging platform with content management capabilities, allowing readers to explore articles and administrators to manage blog content efficiently.

## 👨‍💻 Developer

**Dharanidharan**

GitHub: [dharanidharan-cmd](https://github.com/dharanidharan-cmd)

---

⭐ If you find this project interesting, feel free to explore the repository and share your feedback!
