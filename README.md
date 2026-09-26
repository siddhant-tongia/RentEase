<div align="center">

# 🏠 RentEase

### Rental Property Management System

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)

**RentEase** is a full-stack web application for property owners and tenants. Owners can list, manage, and track their rental properties, while tenants can browse and view available listings — all with secure, role-based authentication.

</div>

---

## 📋 Current MVP Scope

RentEase currently implements the following core capabilities:

- **Secure Authentication** — Registration and login for Owners and Tenants with JWT-based sessions using HttpOnly cookies
- **Owner Property Management** — Full CRUD (Create, Read, Update, Delete) for property listings
- **Tenant Property Browsing** — Read-only access to browse and view available properties
- **Role-Based Access Control** — Owners and Tenants see only what they're authorized to access

---

## ✨ Implemented Features

### 🔐 Authentication & Sessions
- User registration with name, email, password, and role selection (Owner / Tenant)
- Login with role-based redirect (Owner → Dashboard, Tenant → Browse Properties)
- JWT token stored in HttpOnly cookie (never in localStorage or sessionStorage)
- Session persistence across page refreshes
- Logout with confirmation dialog
- Password strength enforcement (minimum 8 characters)
- Duplicate email detection

### 🏘️ Owner Features
- **Dashboard** — Account info (email, role) and total property count
- **Property List** — Responsive grid of all owned properties with View/Edit/Delete actions
- **Create Property** — Form with title, address, type, rent, availability, and description
- **Edit Property** — Pre-filled form to update any property field
- **Delete Property** — Confirmation dialog before permanent deletion
- **Property Details** — Full detail view with all fields and action buttons

### 🔍 Tenant Features
- **Browse Available Properties** — Grid view of all available properties (occupied ones are hidden)
- **View Property Details** — Read-only detail view with all property information
- **Empty State** — Friendly message when no properties are available

### 🛡️ Access Control
- Backend rejects wrong-role API requests with 403 Forbidden
- Frontend `ProtectedRoute` component redirects unauthorized users
- Owner data isolation — each owner can only see/modify their own properties
- Tenant cannot create, edit, or delete any property
- Unauthenticated API requests return 401 Unauthorized

### 💬 Error Handling & UX
- Client-side form validation (required fields, password length, rent > 0)
- Server-side Pydantic validation with detailed error messages
- Network error detection: "Cannot connect to server. Please make sure the backend is running."
- Loading states on all data-fetching pages
- 404 Not Found page for undefined routes

---

## 👤 User Roles & Permissions

| Capability | Owner | Tenant |
|---|:---:|:---:|
| Register | ✅ | ✅ |
| Login / Logout | ✅ | ✅ |
| View Dashboard | ✅ | ❌ |
| Create Property | ✅ | ❌ |
| View Own Properties | ✅ | ❌ |
| Edit Own Property | ✅ | ❌ |
| Delete Own Property | ✅ | ❌ |
| Browse Available Properties | ❌ | ✅ |
| View Available Property Details | ❌ | ✅ |

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, JavaScript (JSX), Plain CSS, React Router DOM v6 |
| **Build Tool** | Vite 6 |
| **HTTP Client** | Native `fetch` API with `credentials: 'include'` |
| **Backend** | Python 3.11+, FastAPI, Pydantic, Uvicorn |
| **Database** | MongoDB Atlas (via Motor async driver) |
| **Authentication** | JWT (PyJWT) in HttpOnly cookies |
| **Password Hashing** | Argon2 via `pwdlib` |

---

## 📁 Repository Structure

```text
RentEase-repo/
├── backend/                    # FastAPI Python backend
│   ├── main.py                 # FastAPI app entry point
│   ├── dependency.py           # JWT cookie authentication dependency
│   ├── requirements.txt        # Python dependencies
│   ├── .env.example            # Environment variable template
│   ├── .env                    # Your local environment variables (git-ignored)
│   ├── database/
│   │   └── connection.py       # MongoDB Atlas connection via Motor
│   ├── routes/
│   │   ├── health.py           # GET /api/health
│   │   ├── auth.py             # Registration, login, session, logout
│   │   └── properties.py       # Property CRUD + tenant available endpoints
│   └── schemas/
│       └── property.py         # PropertyCreate Pydantic schema
├── frontend/                   # React frontend application
│   ├── package.json            # Node.js dependencies and scripts
│   ├── .env.example            # Frontend env template
│   ├── vite.config.js          # Vite dev server config with API proxy
│   ├── index.html              # HTML entry point
│   └── src/
│       ├── App.jsx             # Route definitions
│       ├── main.jsx            # React root with BrowserRouter & AuthProvider
│       ├── index.css            # Global styles (plain CSS)
│       ├── components/         # Reusable UI components
│       │   ├── Navbar.jsx      # Role-aware navigation bar
│       │   ├── ProtectedRoute.jsx  # Route guard by role
│       │   ├── PropertyCard.jsx    # Property card for grid views
│       │   ├── ErrorMessage.jsx    # Error alert component
│       │   └── LoadingMessage.jsx  # Loading indicator component
│       ├── pages/              # Page components
│       │   ├── HomePage.jsx
│       │   ├── LoginPage.jsx
│       │   ├── RegisterPage.jsx
│       │   ├── OwnerDashboardPage.jsx
│       │   ├── OwnerPropertiesPage.jsx
│       │   ├── PropertyFormPage.jsx      # Create & Edit (shared)
│       │   ├── PropertyDetailsPage.jsx   # Owner detail view
│       │   ├── TenantPropertiesPage.jsx
│       │   ├── TenantPropertyDetailsPage.jsx
│       │   └── NotFoundPage.jsx
│       ├── context/
│       │   └── AuthContext.jsx  # Auth state management (user, login, logout)
│       └── services/
│           ├── api.js           # Base fetch wrapper with error handling
│           ├── authService.js   # Auth API calls (register, login, me, logout)
│           └── propertyService.js  # Property API calls (CRUD + available)
├── docs/                       # Project documentation
│   ├── SRS.md                  # Software Requirements Specification (IEEE 830)
│   ├── User-Stories.md         # User stories with acceptance criteria
│   ├── Test-Case.md            # Test cases
│   └── UML-Diagrams/           # Excalidraw design diagrams
├── .gitignore
├── README.md                   # ← You are here
└── task.txt                    # Task instructions
```

---

## 🔄 System Flow

```
┌─────────────────────────────────────────────────────┐
│                  CLIENT (Browser)                    │
│  ┌───────────────────────────────────────────────┐  │
│  │        React 18 + JavaScript (JSX)            │  │
│  │  ┌──────────┐  ┌──────────┐  ┌────────────┐  │  │
│  │  │  Owner   │  │  Tenant  │  │  Public    │  │  │
│  │  │Dashboard │  │ Browse   │  │ Login/Reg  │  │  │
│  │  └──────────┘  └──────────┘  └────────────┘  │  │
│  └────────────────────┬──────────────────────────┘  │
│                       │ fetch() + credentials       │
└───────────────────────┼─────────────────────────────┘
                        │ Vite Proxy (dev): /api → :8000
┌───────────────────────┼─────────────────────────────┐
│                  BACKEND (FastAPI)                   │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐  │
│  │   Auth   │  │ Property │  │    Health Check   │  │
│  │  Routes  │  │  Routes  │  │      Route        │  │
│  └──────────┘  └──────────┘  └──────────────────┘  │
│         JWT + Role Checks  |  Pydantic Validation   │
└───────────────────────┬─────────────────────────────┘
                        │
                   ┌────▼─────┐
                   │ MongoDB  │
                   │  Atlas   │
                   │(2 colls) │
                   └──────────┘
```

---

## 🚀 Getting Started — Complete Setup Guide

> **This section is for any team member who wants to clone the repo and run both the backend and frontend on their own system.**

### Prerequisites

Make sure you have the following installed on your Windows machine:

| Tool | Version | Check Command |
|---|---|---|
| **Python** | 3.11 or higher | `python --version` |
| **pip** | Latest | `pip --version` |
| **Node.js** | 18 or higher | `node --version` |
| **npm** | Comes with Node.js | `npm --version` |
| **Git** | Latest | `git --version` |
| **MongoDB Atlas Account** | Free tier works | [mongodb.com/atlas](https://www.mongodb.com/atlas) |

### Step 1 — Clone the Repository

Open **PowerShell** and run:

```powershell
git clone https://github.com/siddhant-tongia/RentEase.git
cd RentEase
```

You should now see the `backend/`, `frontend/`, and `docs/` folders.

---

### Step 2 — Backend Setup

> **Open a new PowerShell terminal (Terminal 1 — Backend)**

#### 2.1 Navigate to the backend folder

```powershell
cd backend
```

#### 2.2 Create a Python virtual environment

```powershell
python -m venv myenv
```

#### 2.3 Activate the virtual environment

```powershell
.\myenv\Scripts\Activate.ps1
```

> **Note:** If you get an execution policy error, run this first:
> ```powershell
> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
> ```
> Then try activating again.

You should see `(myenv)` appear at the beginning of your terminal prompt.

#### 2.4 Install Python dependencies

```powershell
pip install -r requirements.txt
```

#### 2.5 Create the environment file

Create a file named `.env` inside the `backend/` folder with the following variables:

```env
MONGODB_URL=mongodb+srv://<your-username>:<your-password>@<your-cluster>.mongodb.net/?retryWrites=true&w=majority
DATABASE_NAME=rentease
JWT_SECRET=your-secret-key-here
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=60
```

> ⚠️ **Important:**
> - Replace the `MONGODB_URL` with your actual MongoDB Atlas connection string.
> - Replace `JWT_SECRET` with any long, random string (e.g., `mysupersecretkey123`).
> - **Never commit the `.env` file to GitHub** — it is already in `.gitignore`.

**How to get your MongoDB Atlas connection string:**
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas) and sign in.
2. Create a free cluster (if you don't have one).
3. Click **"Connect"** → **"Connect your application"**.
4. Copy the connection string and replace `<username>`, `<password>`, and `<cluster>` with your actual values.
5. Make sure your IP address is whitelisted in **Network Access** (or allow access from anywhere for development: `0.0.0.0/0`).

#### 2.6 Start the backend server

```powershell
uvicorn main:app --reload
```

You should see:

```
MongoDB connection successful
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
```

#### 2.7 Verify the backend is running

Open your browser and go to:
- **Swagger UI (API Docs):** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
- **Health Check:** [http://127.0.0.1:8000/api/health](http://127.0.0.1:8000/api/health) — should return `{"status":"ok","service":"RentEase API"}`

✅ **Backend is ready!** Keep this terminal running.

---

### Step 3 — Frontend Setup

> **Open a second PowerShell terminal (Terminal 2 — Frontend)**

#### 3.1 Navigate to the frontend folder

```powershell
cd frontend
```

#### 3.2 Install Node.js dependencies

```powershell
npm install
```

This will create a `node_modules/` folder and a `package-lock.json` file.

#### 3.3 Start the frontend development server

```powershell
npm run dev
```

You should see:

```
  VITE v6.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

#### 3.4 Open the application

Open your browser and go to: **[http://localhost:5173](http://localhost:5173)**

You should see the RentEase home page with Login and Register buttons.

✅ **Frontend is ready!**

---

### Step 4 — Test the Full Flow

Here's the recommended manual testing flow:

1. **Register an Owner** — Go to `/register`, fill in details, select "Owner", click Register.
2. **Register a Tenant** — Go to `/register` again, use a different email, select "Tenant", click Register.
3. **Login as Owner** — Go to `/login`, use the owner's credentials. You should land on the Owner Dashboard.
4. **Create a Property** — Click "Manage Properties" → "+ Add Property" → Fill in details → "Create Property".
5. **View/Edit/Delete** — Try viewing, editing, and deleting properties from the list.
6. **Logout** — Click "Logout" in the navbar. Confirm the dialog. You should be redirected to login.
7. **Login as Tenant** — Use the tenant's credentials. You should see "Browse Properties".
8. **Browse Properties** — Available properties created by the owner should appear. Click "View Details" to see full info.
9. **Try Wrong Access** — As a tenant, try navigating to `/owner/dashboard` — you should be redirected to home.

---

## 🔗 How Frontend Communicates with Backend

### Development Setup

During local development, the **frontend (port 5173)** and **backend (port 8000)** run on different ports. To avoid CORS issues, the Vite dev server is configured as a reverse proxy:

```javascript
// frontend/vite.config.js
server: {
  port: 5173,
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:8000',
      changeOrigin: true,
    },
  },
}
```

This means:
- The frontend code calls `/api/auth/login` (relative URL)
- Vite intercepts it and forwards to `http://127.0.0.1:8000/api/auth/login`
- The browser thinks it's talking to the same origin, so cookies work seamlessly

### HttpOnly Cookie & Credentials

- On login, the backend sets an **HttpOnly cookie** named `access_token` containing the JWT.
- The frontend sends `credentials: 'include'` with every `fetch` request, which tells the browser to automatically include cookies.
- **HttpOnly cookies prevent JavaScript from directly reading the JWT** and reduce XSS token-theft risk; they do not eliminate every security risk.
- On logout, the backend clears the access_token cookie if present (authentication is not strictly required by the backend to call this endpoint).

---

## 📡 API Endpoint Table

| Method | Endpoint | Role | Purpose |
|---|---|---|---|
| `GET` | `/api/health` | Public | Health check |
| `POST` | `/api/auth/register` | Public | Register a new user |
| `POST` | `/api/auth/login` | Public | Log in (sets cookie) |
| `GET` | `/api/auth/me` | Authenticated | Get current user info |
| `POST` | `/api/auth/logout` | Public (Any) | Log out (clears access_token cookie if present; does not require auth) |
| `POST` | `/api/properties` | Owner | Create a property |
| `GET` | `/api/properties` | Owner | List owner's properties |
| `GET` | `/api/properties/{id}` | Owner | View one owned property |
| `PUT` | `/api/properties/{id}` | Owner | Update owned property |
| `DELETE` | `/api/properties/{id}` | Owner | Delete owned property |
| `GET` | `/api/properties/available` | Tenant | List available properties |
| `GET` | `/api/properties/available/{id}` | Tenant | View one available property |

### Request Body Fields

**Registration (`POST /api/auth/register`):**
```json
{
  "name": "string (2-50 chars)",
  "email": "valid email",
  "password": "string (min 8 chars)",
  "role": "owner | tenant"
}
```

**Login (`POST /api/auth/login`):**
```json
{
  "email": "valid email",
  "password": "string"
}
```

**Property (`POST /api/properties`, `PUT /api/properties/{id}`):**
```json
{
  "title": "string or null (2-100 chars, optional)",
  "address": "string (5-100 chars, required)",
  "property_type": "apartment | house | room | other",
  "monthly_rent": "float > 0 (required)",
  "availability": "available | occupied",
  "description": "string or null (max 500 chars, optional)"
}
```

---

## ❗ Common Errors & Troubleshooting

| Problem | Solution |
|---|---|
| `MONGODB_URL is not set in the .env file` | Create a `.env` file in `backend/` with your MongoDB Atlas connection string |
| `JWT_SECRET is not set in the .env file` | Add `JWT_SECRET=your-secret-key` to your `.env` file |
| `MongoDB connection failed` | Check your MongoDB Atlas connection string, whitelist your IP in Atlas Network Access |
| `Cannot connect to server. Please make sure the backend is running.` | Make sure the backend server is running on port 8000 (Terminal 1) |
| PowerShell execution policy error | Run `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser` |
| `npm: command not found` | Install Node.js from [nodejs.org](https://nodejs.org/) |
| `python: command not found` | Install Python from [python.org](https://www.python.org/) and add to PATH |
| `ModuleNotFoundError` | Make sure the virtual environment is activated: `.\myenv\Scripts\Activate.ps1` |
| Frontend shows blank page | Check browser console for errors. Make sure backend is running first. |
| Login works but dashboard is empty | You need to create properties first via "Add Property" |
| Tenant sees no properties | An owner must create properties with `availability: "available"` first |

---

## 🔒 Security Notes

- **Passwords** are hashed with Argon2 (via `pwdlib`) — never stored in plaintext
- **JWT tokens** are stored in HttpOnly cookies — prevent JavaScript from directly reading the JWT and reduce XSS token-theft risk; they do not eliminate every security risk.
- **No secrets in code** — all sensitive values (MongoDB URL, JWT secret) are in `.env` files which are git-ignored
- **Role enforcement** — both backend API routes and frontend routes check user roles
- **Data isolation** — owners can only access their own properties; tenants get read-only access to available listings
- **Input validation** — Pydantic schemas validate all API inputs; the frontend validates forms before submission

---


## 🔮 Future Scope

- Rent management and payment tracking with UPI QR verification
- Tenant-property assignment with lease lifecycle management
- Maintenance request system with priority and audit trail
- AI-powered assistant using Google Gemini API
- Analytics dashboard with financial reports
- Real-time notifications via WebSockets
- Email notifications via SMTP
- Image upload via Cloudinary
- Admin role and platform management panel
- Password reset and email verification
- Advanced search, filters, and pagination
- Production deployment (Vercel + Render)
- Mobile application

---

## 👥 Team

| Name | Roll Number |
|---|---|
| **Sarthak Gupta** | 0801CS251128 |
| **Shourya Raj Singh Chauhan** | 0801CS251131 |
| **Siddhant Tongia** | 0801CS251136 |
| **Sommay Paliwal** | 0801CS251138 |
| **Sunil Talreja** | 0801CS251139 |

**Institution:** Shri Govindram Seksaria Institute of Technology and Science (SGSITS)

---

## 📚 Documentation

| Document | Description |
|---|---|
| [Software Requirements Specification (SRS)](docs/SRS.md) | IEEE 830-1998 compliant SRS for the current MVP |
| [User Stories](docs/User-Stories.md) | 20 implemented user stories with acceptance criteria |
| [Test Cases](docs/Test-Case.md) | 25 comprehensive test cases covering all features |
| [UML Diagrams](docs/UML-Diagrams/) | System architecture and design diagrams (Excalidraw) |

> Open `.excalidraw` files at [excalidraw.com](https://excalidraw.com) or using the [VS Code Excalidraw extension](https://marketplace.visualstudio.com/items?itemName=pomdtr.excalidraw-editor).

---

<div align="center">

**Built with ❤️ by Team RentEase**

*Shri Govindram Seksaria Institute of Technology and Science, 2026*

</div>
