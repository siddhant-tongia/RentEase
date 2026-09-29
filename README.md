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

- **Secure Authentication & Dual Login** — Registration and login for Owners and Tenants (supporting Email+Password or Phone+Password) with JWT-based sessions using HttpOnly cookies
- **Owner Document Verification** — Ownership proof upload for owners with admin review and approval lifecycle before access is granted
- **Admin Verification Panel** — Dedicated administrator dashboard to review submitted ownership proofs and approve or reject accounts
- **Owner Property Management** — Full CRUD (Create, Read, Update, Delete) for property listings with 0–3 image uploads via Cloudinary
- **Tenant Property Browsing** — Read-only access to browse available properties with image carousels and direct owner contact phone numbers
- **Role-Based Access Control** — Three distinct roles (Owner, Tenant, Admin) with strict data isolation

---

## ✨ Implemented Features

### 🔐 Authentication & Sessions
- User registration with name, email, phone number, password, and role selection (Owner / Tenant)
- Owner verification document upload (JPG, PNG, WebP, PDF up to 5MB via Cloudinary)
- Real-time Owner Verification Status Card on registration with live status refresh
- Dual login support: toggle between Email + Password or Phone Number + Password
- Unverified owner login protection (blocked with 403 until admin approves)
- Role-based redirect (Owner → Dashboard, Tenant → Browse Properties, Admin → Admin Panel)
- JWT token stored in HttpOnly cookie (never in localStorage or sessionStorage)
- Session persistence across page refreshes
- Logout with confirmation dialog
- Password strength enforcement (minimum 8 characters) and phone number validation (minimum 10 digits)
- Duplicate email and duplicate phone number detection

### 👑 Admin Verification
- **Admin Panel (`/admin/dashboard`)** — Dedicated dashboard for platform administrators
- **Pending Verifications** — List all owners awaiting approval with name, email, and phone
- **Document Inspection** — Direct link to view uploaded ownership proofs hosted on Cloudinary
- **One-Click Actions** — Approve or Reject owner accounts with immediate database status updates
- **Admin Seed Utility** — `seed_admin.py` CLI script to seed administrator credentials

### 🏘️ Owner Features
- **Dashboard** — Account info (email, role) and total property count
- **Property List** — Responsive grid of all owned properties with image thumbnails and View/Edit/Delete actions
- **Create Property** — Form with title, address, type, rent, availability, description, and 0–3 image uploads
- **Image Management** — Interactive image preview grid with remove buttons and gallery file picker
- **Edit Property** — Pre-filled form to update any property field, keep existing images, or upload new ones
- **Delete Property** — Confirmation dialog before permanent deletion
- **Property Details** — Full detail view with image carousel, property data, and action buttons

### 🔍 Tenant Features
- **Browse Available Properties** — Grid view of all available properties with top image thumbnails
- **View Property Details** — Read-only detail view featuring interactive image carousel
- **Contact Owner** — Direct access to owner name and phone number on property details
- **Empty State** — Friendly message when no properties are available

### 🛡️ Access Control
- Backend rejects wrong-role API requests with 403 Forbidden
- Frontend `ProtectedRoute` component redirects unauthorized users based on allowed roles
- Owner data isolation — each owner can only see/modify their own properties
- Tenant cannot create, edit, or delete any property
- Unauthenticated API requests return 401 Unauthorized

### 💬 Error Handling & UX
- Client-side form validation (required fields, password length, phone digits, rent > 0)
- Server-side Pydantic validation with detailed error messages
- Network error detection: "Cannot connect to server. Please make sure the backend is running."
- Loading states on all data-fetching pages
- 404 Not Found page for undefined routes

---

## 👤 User Roles & Permissions

| Capability | Owner | Tenant | Admin |
|---|:---:|:---:|:---:|
| Register | ✅ | ✅ | ❌ (Seeded) |
| Submit Verification Document | ✅ | ❌ | ❌ |
| Login / Logout | ✅ (After approval) | ✅ (Immediate) | ✅ |
| View Own Dashboard | ✅ | ❌ | ❌ |
| Manage Own Properties (CRUD + Images) | ✅ | ❌ | ❌ |
| Browse Available Properties & View Details | ❌ | ✅ | ❌ |
| View Owner Contact Details | ❌ | ✅ | ❌ |
| View Admin Panel (`/admin/dashboard`) | ❌ | ❌ | ✅ |
| Inspect Verification Documents | ❌ | ❌ | ✅ |
| Approve / Reject Pending Owners | ❌ | ❌ | ✅ |

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, JavaScript (JSX), Plain CSS, React Router DOM v6 |
| **Build Tool** | Vite 6 |
| **HTTP Client** | Native `fetch` API with `credentials: 'include'` (JSON & multipart FormData) |
| **Backend** | Python 3.11+, FastAPI, Pydantic, Uvicorn |
| **Database** | MongoDB Atlas (via Motor async driver) |
| **Media & Document Storage** | Cloudinary (Images & Ownership Documents) |
| **Authentication** | JWT (PyJWT) in HttpOnly cookies |
| **Password Hashing** | Argon2 via `pwdlib` |

---

## 📁 Repository Structure

```text
RentEase-repo/
├── backend/                    # FastAPI Python backend
│   ├── main.py                 # FastAPI app entry point
│   ├── dependency.py           # JWT cookie authentication dependency
│   ├── seed_admin.py           # One-time CLI script to seed admin user
│   ├── requirements.txt        # Python dependencies
│   ├── .env.example            # Environment variable template
│   ├── .env                    # Your local environment variables (git-ignored)
│   ├── database/
│   │   └── connection.py       # MongoDB Atlas connection via Motor
│   ├── routes/
│   │   ├── health.py           # GET /api/health
│   │   ├── auth.py             # Register, login, dual login, status, me, logout
│   │   ├── admin.py            # Pending owners list and approve/reject verification
│   │   └── properties.py       # Property CRUD + images + tenant contact view
│   ├── schemas/
│   │   └── property.py         # PropertyCreate Pydantic schema
│   └── utils/
│       └── cloudinary_helper.py# Cloudinary config and file upload utility
├── frontend/                   # React frontend application
│   ├── package.json            # Node.js dependencies and scripts
│   ├── .env.example            # Frontend env template
│   ├── vite.config.js          # Vite dev server config with API proxy
│   ├── index.html              # HTML entry point
│   └── src/
│       ├── App.jsx             # Route definitions (including admin routes)
│       ├── main.jsx            # React root with BrowserRouter & AuthProvider
│       ├── index.css           # Global styles (plain CSS)
│       ├── components/         # Reusable UI components
│       │   ├── Navbar.jsx      # Role-aware navigation bar
│       │   ├── ProtectedRoute.jsx  # Route guard by role
│       │   ├── PropertyCard.jsx    # Property card with thumbnail for grid views
│       │   ├── ErrorMessage.jsx    # Error alert component
│       │   └── LoadingMessage.jsx  # Loading indicator component
│       ├── pages/              # Page components
│       │   ├── HomePage.jsx
│       │   ├── LoginPage.jsx   # Dual login (Email / Phone toggle)
│       │   ├── RegisterPage.jsx# Form + document upload + Owner Verification Status Card
│       │   ├── AdminDashboardPage.jsx  # Admin verification panel
│       │   ├── OwnerDashboardPage.jsx
│       │   ├── OwnerPropertiesPage.jsx
│       │   ├── PropertyFormPage.jsx      # Create & Edit with 0–3 image upload
│       │   ├── PropertyDetailsPage.jsx   # Owner detail view with image carousel
│       │   ├── TenantPropertiesPage.jsx
│       │   ├── TenantPropertyDetailsPage.jsx # Tenant detail view with carousel & owner phone
│       │   └── NotFoundPage.jsx
│       ├── context/
│       │   └── AuthContext.jsx  # Auth state management (user, login, logout)
│       └── services/
│           ├── api.js           # Base fetch wrapper with FormData support
│           ├── authService.js   # Auth API calls (register, email/phone login, status)
│           ├── adminService.js  # Admin API calls (pending owners, verify)
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
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

> ⚠️ **Important:**
> - Replace `MONGODB_URL` with your actual MongoDB Atlas connection string.
> - Replace `JWT_SECRET` with any long, random string.
> - Add your `CLOUDINARY_*` credentials from your free [Cloudinary](https://cloudinary.com) dashboard.
> - **Never commit the `.env` file to GitHub** — it is already in `.gitignore`.

#### 2.6 Seed Administrator Account (One-time)

To create the platform administrator account in MongoDB, run:

```powershell
python seed_admin.py
```

This creates the default administrator (`admin@test.com` / `TestPassword123`) used to access the verification panel.

#### 2.7 Start the backend server

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
| `POST` | `/api/auth/register` | Public | Register new user (with phone & optional document) |
| `POST` | `/api/auth/login` | Public | Log in via email or phone (sets cookie) |
| `GET` | `/api/auth/status` | Public | Check account verification status by email |
| `GET` | `/api/auth/me` | Authenticated | Get current user info |
| `POST` | `/api/auth/logout` | Public (Any) | Log out (clears access_token cookie) |
| `GET` | `/api/admin/pending-owners` | Admin | List pending owners for verification |
| `PUT` | `/api/admin/verify-owner/{id}` | Admin | Approve or reject pending owner |
| `POST` | `/api/properties` | Owner | Create a property (with 0–3 image files) |
| `GET` | `/api/properties` | Owner | List owner's properties |
| `GET` | `/api/properties/{id}` | Owner | View one owned property |
| `PUT` | `/api/properties/{id}` | Owner | Update owned property (with images) |
| `DELETE` | `/api/properties/{id}` | Owner | Delete owned property |
| `GET` | `/api/properties/available` | Tenant | List available properties (with thumbnails) |
| `GET` | `/api/properties/available/{id}` | Tenant | View available property (with carousel & owner phone) |

### Request Body Fields

**Registration (`POST /api/auth/register` — `multipart/form-data`):**
```
name: string (2-50 chars)
email: string (valid email, unique)
phone: string (10-15 chars, unique)
password: string (min 8 chars)
role: "owner" | "tenant"
document: file (required for owner: JPG, PNG, WebP, PDF <= 5MB)
```

**Login (`POST /api/auth/login` — JSON):**
```json
{
  "email": "string (optional if phone provided)",
  "phone": "string (optional if email provided)",
  "password": "string"
}
```

**Property (`POST /api/properties`, `PUT /api/properties/{id}` — `multipart/form-data`):**
```
title: string or null (2-100 chars, optional)
address: string (5-100 chars, required)
property_type: "apartment" | "house" | "room" | "other"
monthly_rent: float > 0 (required)
availability: "available" | "occupied"
description: string or null (max 500 chars, optional)
images: file array (0 to 3 image files: JPG, PNG, WebP <= 5MB each)
existing_images: comma-separated URLs (for PUT)
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
| Owner login says "Your account is pending verification" | Log into the Admin panel (`admin@test.com`) and approve the owner |
| Login works but dashboard is empty | You need to create properties first via "Add Property" |
| Tenant sees no properties | An owner must create properties with `availability: "available"` first |

---

## 🔒 Security Notes

- **Passwords** are hashed with Argon2 (via `pwdlib`) — never stored in plaintext
- **JWT tokens** are stored in HttpOnly cookies — prevent JavaScript from directly reading the JWT and reduce XSS token-theft risk; they do not eliminate every security risk.
- **No secrets in code** — all sensitive values (MongoDB URL, JWT secret, Cloudinary credentials) are in `.env` files which are git-ignored
- **Role enforcement** — both backend API routes and frontend routes check user roles (Owner, Tenant, Admin)
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
