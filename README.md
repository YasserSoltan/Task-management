# Task Management App

A full-stack task management application built with React (frontend) and Node.js/Express (backend).

##  Features

- User authentication (Register & Login)
- Create, read, update, and delete tasks
- Task status management (Pending, In Progress, Done)
- Task descriptions
- Protected routes
- Responsive UI with Tailwind CSS

##  Tech Stack

**Backend:** Node.js, Express, SQLite, JWT, bcryptjs  
**Frontend:** React, Vite, React Router, Axios, Tailwind CSS

##  Prerequisites

- Node.js (v16 or higher)
- npm

##  Installation

1. Clone the repository
```bash
git clone https://github.com/YasserSoltan/Task-management
cd "Task Management App"
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

##  Configuration

Create `.env` files for local development:

**`backend/.env`**:
```env
PORT=5000
NODE_ENV=development
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:5173
```

**`frontend/.env`**:
```env
VITE_API_URL=http://localhost:5000/api
```

##  Running the Application

**Start Backend:**
```bash
cd backend
npm run dev
```
Backend runs on `http://localhost:5000`

**Start Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:5173`

##  API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Tasks (Require Authentication)
- `GET /api/tasks` - Get all user tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task


##  Database

SQLite database is created automatically on first run in `backend/database.sqlite`

**Schema:**
- **Users:** id, name, email, password (hashed)
- **Tasks:** id, title, description, status, user_id, created_at

##  Testing

Run backend tests:
```bash
cd backend
npm test
```

##  Assumptions

1. JWT tokens expire after 24 hours
2. Tasks default to "pending" status
3. Users can only access their own tasks (enforced via JWT)
4. Task descriptions are optional
5. Partial task updates are supported
