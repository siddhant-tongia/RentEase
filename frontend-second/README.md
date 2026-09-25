# RentEase Frontend (frontend-second)

A simple React frontend for the RentEase property rental management system. Built as a student project using Vite, React, JavaScript, and plain CSS.

## Features

- **Owner**: Register, login, create/view/edit/delete properties
- **Tenant**: Register, login, browse available properties
- **Authentication**: Uses HttpOnly cookies (no JWT stored in browser JS)
- **Role-based routing**: Owners and tenants see different pages

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- npm (comes with Node.js)
- The RentEase FastAPI backend running at `http://127.0.0.1:8000`

## Installation

```bash
cd frontend-second
npm install
```

## Configuration

A `.env.example` file is provided. The Vite dev server uses a proxy to forward `/api` requests to the backend, so you typically don't need to create a `.env` file for local development.

If you need to change the backend URL, edit the proxy target in `vite.config.js`.

## Running

Start the development server:

```bash
npm run dev
```

The frontend will be available at: **http://localhost:5173**

Make sure the FastAPI backend is running at `http://127.0.0.1:8000` before using the app.

## Project Structure

```
frontend-second/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation bar
│   │   ├── ProtectedRoute.jsx  # Route guard for auth/roles
│   │   ├── LoadingMessage.jsx  # Loading indicator
│   │   ├── ErrorMessage.jsx    # Error display
│   │   └── PropertyCard.jsx    # Property card component
│   ├── context/
│   │   └── AuthContext.jsx     # Auth state management
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── OwnerDashboardPage.jsx
│   │   ├── OwnerPropertiesPage.jsx
│   │   ├── PropertyFormPage.jsx
│   │   ├── PropertyDetailsPage.jsx
│   │   ├── TenantPropertiesPage.jsx
│   │   ├── TenantPropertyDetailsPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── services/
│   │   ├── api.js              # Shared API helper
│   │   ├── authService.js      # Auth API calls
│   │   └── propertyService.js  # Property API calls
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## API Routes Used

| Method | Endpoint                              | Description                  |
|--------|---------------------------------------|------------------------------|
| GET    | /api/health                           | Health check                 |
| POST   | /api/auth/register                    | Register a new user          |
| POST   | /api/auth/login                       | Login and receive cookie     |
| GET    | /api/auth/me                          | Get current user info        |
| POST   | /api/auth/logout                      | Logout and clear cookie      |
| POST   | /api/properties                       | Create property (owner)      |
| GET    | /api/properties                       | List owner's properties      |
| GET    | /api/properties/{id}                  | Get owner's property detail  |
| PUT    | /api/properties/{id}                  | Update property (owner)      |
| DELETE | /api/properties/{id}                  | Delete property (owner)      |
| GET    | /api/properties/available             | List available (tenant)      |
| GET    | /api/properties/available/{id}        | Available property detail    |

## Notes

- The Vite dev server proxies `/api` requests to `http://127.0.0.1:8000` to avoid CORS issues.
- Authentication is handled via HttpOnly cookies. The JWT is never accessed or stored in JavaScript.
- No mock data is used. All data comes from the real FastAPI backend.
