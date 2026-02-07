# 🌟 Bloggify Backend

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-brightgreen)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-orange)](LICENSE)

> A powerful and scalable backend for **Bloggify**, a modern blogging platform with user authentication, blog CRUD, comments, likes, and more.

---

## 🚀 Features

- **👤 User Management**
  - 📝 Sign-up, Sign-in, Sign-out
  - 🔑 Role-based access (Admin/User)
  - ✏️ Update & delete user
  - 🔍 Fetch all users / user by ID

- **📝 Blog Management**
  - ✍️ Create, update, delete blogs
  - 🌐 Auto slug generation for SEO-friendly URLs
  - 📊 Filtering, sorting, and pagination for blogs

- **💬 Comments**
  - 💭 Add, update, delete comments
  - 📄 Fetch comments by blog or comment ID
  - 🔒 Ownership checks for security

- **❤️ Likes**
  - 👍 Like and dislike blogs
  - 📈 Automatic blog `likesCount` update

- **⚡ Advanced**
  - 🚨 Global error handling with `AppError`
  - ✅ Validation with **Zod**
  - 🛠 TypeScript-based with clean architecture

- **🚀 Optimized**
  - 🖥 Ready for deployment with **Bun** or **Node**
  - 🗄 MongoDB database integration
  - 🛡 Path aliases & modular folder structure

---

## 📂 Folder Structure

```
src/
├─ app.ts                 # Express app setup
├─ config/
│  ├─ db.config.ts        # MongoDB connection
│  └─ env.config.ts       # Environment variables
├─ controller/            # Route controllers
├─ services/              # Business logic & services
├─ model/                 # MongoDB models
├─ router/                # API route definitions
├─ middleware/            # Auth, validation, error handling
├─ interfaces/            # TypeScript interfaces
├─ utils/                 # Utility functions (JWT, hashing)
└─ global/                # App-wide constants & helpers
```

---

## ⚡ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/jafiruzzaman/bloggify-backend.git
cd bloggify-backend
```

### 2. Install dependencies

```bash
bun install
# or
npm install
```

### 3. Configure environment

Create a `.env` file in the root:

```env
# ========================
# SERVER
# ========================
PORT=5000
NODE_ENV=development
API_VERSION=v1
APP_NAME=Bloggify
# ========================
# DATABASE
# ========================
MONGODB_URI=mongodb://localhost:27017/
DB_NAME=Bloggify

# ========================
# AUTH – JWT
# ========================
ACCESS_TOKEN_SECRET=access_token_ultra_long_random_string_here
ACCESS_TOKEN_EXPIRES_IN=1d

REFRESH_TOKEN_SECRET=refresh_token_ultra_long_random_string_here
REFRESH_TOKEN_EXPIRES_IN=7d

# ========================
# SECURITY – COOKIES
# ========================
COOKIE_NAME=refresh_token
COOKIE_SECURE=false
COOKIE_HTTP_ONLY=true
COOKIE_SAME_SITE=lax

# ========================
# FRONTEND / CORS
# ========================
FRONTEND_DOMAIN=http://localhost:5173

# ========================
# CLOUDINARY (MEDIA)
# ========================
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# ========================
# RATE LIMITING
# ========================
RATE_LIMIT_MAX=100
RATE_LIMIT_WINDOW_MS=900000

# ========================
# UPLOAD LIMITS
# ========================
MAX_FILE_SIZE=5242880

# ========================
# LOGGING
# ========================
LOG_LEVEL=dev
```

### 4. Run the backend

```bash
bun dev
# or
npm run dev
```

Server will start on `http://localhost:5000`

---

## 📌 API Endpoints

### **👤 Auth**

| Method | Endpoint        | Description          |
| ------ | --------------- | -------------------- |
| POST   | `/auth/signup`  | Create new user      |
| POST   | `/auth/signin`  | User login           |
| POST   | `/auth/signout` | Logout user          |
| GET    | `/auth/me`      | Current user profile |

### **👥 Users**

| Method | Endpoint     | Description           |
| ------ | ------------ | --------------------- |
| GET    | `/users`     | Get all users (admin) |
| GET    | `/users/:id` | Get user by ID        |
| PATCH  | `/users/:id` | Update user           |
| DELETE | `/users/:id` | Delete user           |

### **📝 Blogs**

| Method | Endpoint       | Description                            |
| ------ | -------------- | -------------------------------------- |
| POST   | `/blogs`       | Create new blog                        |
| GET    | `/blogs`       | Get all blogs (filter, sort, paginate) |
| GET    | `/blogs/:slug` | Get blog by slug                       |
| PATCH  | `/blogs/:id`   | Update blog                            |
| DELETE | `/blogs/:id`   | Delete blog                            |

### **💬 Comments**

| Method | Endpoint                      | Description                      |
| ------ | ----------------------------- | -------------------------------- |
| POST   | `/blogs/:blogId/comments`     | Add comment                      |
| GET    | `/blogs/:blogId/comments`     | Get comments by blog             |
| GET    | `/comments/:id`               | Get comment by ID                |
| PATCH  | `/comments/:id`               | Update comment (ownership check) |
| DELETE | `/blogs/:blogId/comments/:id` | Delete comment (ownership check) |

### **❤️ Likes**

| Method | Endpoint                 | Description |
| ------ | ------------------------ | ----------- |
| POST   | `/blogs/:blogId/like`    | Like a blog |
| POST   | `/blogs/:blogId/dislike` | Remove like |

---

## 🛠 Tech Stack

- **Node.js** + **TypeScript**
- **Express** for backend framework
- **MongoDB** with Mongoose ODM
- **Redis** (optional for caching & view tracking)
- **Bun** or **NPM/Yarn** for package management
- **Zod** for validation
- **JWT** for authentication
- **Helmet, CORS, Morgan** for security and logging

---

## 📈 Next Steps

- Implement **📊 blog view count** with Redis
- Preserve **🏷 tags** during blog updates
- Add **🔔 notifications** for likes and comments
- Integrate **⚛️ frontend** using React/Next.js
- Add **🧪 unit and integration tests**
- Deploy backend with **🐳 Docker + CI/CD pipeline**

---

## 📜 License

This project is licensed under the **MIT License**.

---

Made with ❤️ by [Mohammad Jafiruzzaman Tuhin](https://github.com/jafiruzzaman)
