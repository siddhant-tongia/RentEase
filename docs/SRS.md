# Software Requirements Specification

## for

# RentEase

**Version 2.0 — Updated to reflect final MVP implementation**

**Prepared by**

- SARTHAK GUPTA (0801CS251128)
- SHOURYA RAJ SINGH CHAUHAN (0801CS251131)
- SIDDHANT TONGIA (0801CS251136)
- SOMMAY PALIWAL (0801CS251138)
- SUNIL TALREJA (0801CS251139)

**Shri Govindram Seksaria Institute of Technology and Science**

**September 2026**

---

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Revision History](#revision-history)
- [1. Introduction](#1-introduction)
  - [1.1 Purpose](#11-purpose)
  - [1.2 Document Conventions](#12-document-conventions)
  - [1.3 Intended Audience and Reading Suggestions](#13-intended-audience-and-reading-suggestions)
  - [1.4 Product Scope](#14-product-scope)
  - [1.5 References](#15-references)
- [2. Overall Description](#2-overall-description)
  - [2.1 Product Perspective](#21-product-perspective)
  - [2.2 Product Functions](#22-product-functions)
  - [2.3 User Classes and Characteristics](#23-user-classes-and-characteristics)
  - [2.4 Operating Environment](#24-operating-environment)
  - [2.5 Design and Implementation Constraints](#25-design-and-implementation-constraints)
  - [2.6 User Documentation](#26-user-documentation)
  - [2.7 Assumptions and Dependencies](#27-assumptions-and-dependencies)
- [3. External Interface Requirements](#3-external-interface-requirements)
  - [3.1 User Interfaces](#31-user-interfaces)
  - [3.2 Hardware Interfaces](#32-hardware-interfaces)
  - [3.3 Software Interfaces](#33-software-interfaces)
  - [3.4 Communications Interfaces](#34-communications-interfaces)
- [4. System Features](#4-system-features)
  - [4.1 User Authentication & Role-Based Access](#41-user-authentication--role-based-access)
  - [4.2 Owner Property Management](#42-owner-property-management)
  - [4.3 Tenant Available-Property Browsing](#43-tenant-available-property-browsing)
- [5. Other Nonfunctional Requirements](#5-other-nonfunctional-requirements)
  - [5.1 Performance Requirements](#51-performance-requirements)
  - [5.2 Safety Requirements](#52-safety-requirements)
  - [5.3 Security Requirements](#53-security-requirements)
  - [5.4 Software Quality Attributes](#54-software-quality-attributes)
  - [5.5 Business Rules](#55-business-rules)
- [6. Current Limitations](#6-current-limitations)
- [7. Future Scope](#7-future-scope)
- [8. Other Requirements](#8-other-requirements)
- [Appendix A: Glossary](#appendix-a-glossary)
- [Appendix B: Analysis Models — Database Schema](#appendix-b-analysis-models--database-schema)
- [Appendix C: API Endpoint Reference](#appendix-c-api-endpoint-reference)

---

## Revision History

| Name | Date | Reason For Changes | Version |
|------|------|---------------------|---------|
| Team RentEase | August 2026 | Initial SRS draft with full planned scope | 1.0 |
| Team RentEase | September 2026 | Updated to reflect final MVP implementation. Corrected tech stack, user roles, functional requirements, database schema, and security details. Moved unimplemented features to Future Scope. | 2.0 |

---

## 1. Introduction

### 1.1. Purpose

RentEase is a web platform for small property owners and their tenants. The current MVP release solves the core problem of property listing and discovery by providing property owners with a secure dashboard to create, manage, and maintain their property listings, and by providing tenants with a way to browse and view available rental properties. The system implements secure authentication with role-based access control, ensuring that owners and tenants can only access features appropriate to their role. The objective of this SRS is to define the exact functional, interface, and quality requirements for the first coursework release (MVP) of RentEase.

### 1.2. Document Conventions

This document adheres to the IEEE 830-1998 standard for Software Requirements Specifications. Key terms and concepts are defined in Appendix A (Glossary). Headings are numbered sequentially, and cross-references are provided where necessary. All acronyms are defined upon their first use. The language used is formal and technical, suitable for a professional software development context. Requirements marked as **[Implemented]** are verified in the final codebase. Requirements marked as **[Future Scope]** are planned but not yet implemented.

### 1.3. Intended Audience and Reading Suggestions

The primary audience for this SRS includes students, professors, project managers, developers, and quality assurance testers. Students and professors will find this document valuable for understanding the project's scope, requirements, and technical details, which can be used for academic evaluation and resume building. Project managers can use it for planning and tracking progress, while developers will use it as a guide for implementation. Quality assurance testers will refer to it for test case generation and validation. It is recommended that readers begin with the Introduction for an overview, then proceed to the Overall Description and System Features for detailed functionalities.

### 1.4. Product Scope

RentEase is a full-stack web application designed to streamline rental property management. The current MVP implements three core capabilities:

1. **Secure Authentication** — User registration and login for two roles (Owner and Tenant) with JWT-based session management using HttpOnly cookies.
2. **Owner Property Management** — Full CRUD operations (create, read, update, delete) for property listings, scoped to the authenticated owner.
3. **Tenant Property Browsing** — Read-only access for tenants to browse and view properties marked as available.

Features such as rent management, payment processing, tenant-property assignment, maintenance requests, AI assistance, analytics, notifications, and image upload are planned as future extensions (see Section 7).

### 1.5. References

● IEEE Std 830-1998 — IEEE Recommended Practice for Software Requirements Specifications.

---

## 2. Overall Description

### 2.1. Product Perspective

RentEase is a standalone web application built as an academic coursework project. It is not part of a larger system. The current release uses MongoDB Atlas as an external cloud database service, while other external integrations like payments, email, Cloudinary, Gemini, and other business services are not implemented. The system consists of a FastAPI backend (Python) and a React frontend (JavaScript), communicating over a RESTful JSON API. During local development, the frontend uses a Vite development proxy to forward API requests to the backend, avoiding cross-origin issues without requiring CORS middleware.

### 2.2. Product Functions

RentEase provides the following functions in the current MVP:

1. **User Registration** — New users can register as either an Owner or a Tenant by providing their name, email, password, and role. Passwords are validated for minimum length and hashed before storage.
2. **User Login** — Registered users authenticate with email and password. A signed JWT is stored in an HttpOnly cookie for session management.
3. **Session Management** — The frontend checks the user's session on every page load. Sessions persist across browser refreshes until the JWT expires or the user logs out.
4. **Logout** — Users can log out with a confirmation prompt. The authentication cookie is cleared if present on the server side (the endpoint itself does not require authentication).
5. **Property Creation** — Owners can create property listings with title, address, property type, monthly rent, availability status, and description.
6. **Property Listing** — Owners can view all their properties in a grid layout.
7. **Property Details** — Owners can view full details of any property they own.
8. **Property Update** — Owners can edit any field of their properties.
9. **Property Deletion** — Owners can delete their properties with a confirmation prompt.
10. **Available Property Browsing** — Tenants can browse all properties marked as "available" in a grid layout.
11. **Available Property Details** — Tenants can view full details of any available property.
12. **Role-Based Access Control** — Both frontend and backend enforce role restrictions. Owners cannot access tenant features and vice versa.

### 2.3. User Classes and Characteristics

**Owner**

● Characteristics: Property owners who manage one or more rental properties. They need to list properties, keep listings up to date, and track which properties are available or occupied.

● Privileges: Register, log in, create/view/update/delete own properties, view own dashboard with property count and account info. Cannot access tenant-only endpoints or pages.

**Tenant**

● Characteristics: Individuals looking for rental properties. They need to browse available listings and view property details to make informed decisions.

● Privileges: Register, log in, browse available properties, view individual property details. Cannot create, update, or delete any property. Cannot access owner-only endpoints or pages.

> **Note:** An Administrator role is planned for future releases but is not implemented in the current MVP. See Section 7 (Future Scope).

### 2.4. Operating Environment

RentEase is a locally deployed web application accessible via standard web browsers during development. The system is designed to operate on modern web browsers, including Google Chrome, Mozilla Firefox, Apple Safari, and Microsoft Edge. The backend runs on `http://127.0.0.1:8000` and the frontend runs on `http://localhost:5173` using the Vite development server. The database is hosted on MongoDB Atlas (cloud).

**Runtime Requirements:**
- **Backend:** Python 3.11+, FastAPI, Uvicorn
- **Frontend:** Node.js 18+, npm, Vite
- **Database:** MongoDB Atlas (cloud-hosted)

### 2.5. Design and Implementation Constraints

● **Technology Stack:** Frontend developed with React 18 and JavaScript (JSX) with plain CSS; Backend with Python, FastAPI, Pydantic, and Motor (async MongoDB driver).

● **Security:** JWT-based authentication with HttpOnly cookies. Passwords hashed with Argon2 via the `pwdlib` library.

● **API Communication:** RESTful JSON API. The frontend uses the native `fetch` API with `credentials: 'include'` for cookie-based authentication. During development, Vite proxies `/api` requests to the backend at `http://127.0.0.1:8000`.

● **No CORS Middleware:** The backend does not include `CORSMiddleware`. Cross-origin requests are handled by the Vite development proxy. A production deployment would require adding CORS configuration.

### 2.6. User Documentation

User documentation is not planned for the initial release of RentEase. The root `README.md` in the repository serves as the primary setup and usage guide. Future iterations may include a comprehensive user manual.

### 2.7. Assumptions and Dependencies

**Assumptions**

● Users have stable internet access for MongoDB Atlas connectivity.

● Users are using modern web browsers that support current web standards.

● The backend server is running before the frontend makes any API calls.

**Dependencies**

● **MongoDB Atlas:** The system relies on MongoDB Atlas for its database services. A valid connection string must be configured in the backend `.env` file.

● **Python Packages:** FastAPI, Uvicorn, Motor, Pydantic, PyJWT, pwdlib, python-dotenv (see `requirements.txt`).

● **Node.js Packages:** React, React DOM, React Router DOM, Vite (see `package.json`).

---

## 3. External Interface Requirements

### 3.1. User Interfaces

RentEase provides a clean, responsive web-based user interface for each user role. The UI is built using React 18 with plain CSS, ensuring a consistent design and user experience across different devices. Key UI components include:

● **Login and Registration Pages:** Secure form-based access for all users with client-side and server-side validation.

● **Owner Dashboard:** Displays account information (email, role) and a summary card showing the total number of properties with a "Manage Properties" link.

● **Owner Properties Page:** A responsive grid of property cards with View, Edit, and Delete actions, plus an "Add Property" button.

● **Property Form:** A shared create/edit form with fields for title, address, property type, monthly rent, availability, and description.

● **Property Detail Pages:** Full-detail views for both owners (with Edit/Delete actions) and tenants (read-only).

● **Tenant Properties Page:** A responsive grid of available property cards with only a "View Details" action.

● **Navbar:** Role-aware navigation with dynamic links based on authentication state and user role.

● **Error and Loading States:** Consistent `ErrorMessage` and `LoadingMessage` components used across all pages.

● **404 Page:** A catch-all page for undefined routes with a "Go Home" link.

### 3.2. Hardware Interfaces

RentEase is a web application and does not directly interface with specific hardware beyond standard client devices (desktops, laptops, smartphones, tablets) and network infrastructure.

### 3.3. Software Interfaces

● **Frontend-Backend Communication:** RESTful API communication between the React frontend and FastAPI backend using the native `fetch` API with `credentials: 'include'` for cookie handling.

● **Database Interface:** The FastAPI backend interfaces with MongoDB Atlas using the `motor` async driver for data storage and retrieval.

● **Development Proxy:** The Vite development server proxies all `/api` requests to `http://127.0.0.1:8000`, allowing the frontend and backend to run on different ports without CORS issues.

### 3.4. Communications Interfaces

● **HTTP:** All client-server communication occurs over HTTP during local development. The backend listens on port 8000 and the frontend dev server on port 5173.

● **JSON:** All data exchange between the frontend and backend uses JSON format.

● **Cookies:** Authentication state is maintained via an HttpOnly cookie (`access_token`) set by the backend on login and cleared on logout.

---

## 4. System Features

### 4.1. User Authentication & Role-Based Access

#### 4.1.1. Description and Priority

This feature handles secure user registration, authentication, and session management while enforcing role-based access control to restrict access based on user privileges (Owner, Tenant). This feature is **Critical** priority because it is the primary gateway for protecting sensitive user data and preventing unauthorized access.

#### 4.1.2. Stimulus/Response Sequences

1. The user provides registration details (name, email, password, role) via the registration form.
2. The system validates input (email format via Pydantic `EmailStr`, password minimum length of 8 characters via `SecretStr` with `min_length=8`, name length 2–50 characters, role must be "owner" or "tenant").
3. The system checks for duplicate email. If duplicate, returns 409 "Email already registered".
4. The system hashes the password using Argon2 (via `pwdlib`) and stores the user document in the `users` collection.
5. For login, the user provides email and password. The system verifies the password hash and, on success, generates a signed JWT containing `user_id`, `email`, `role`, and `exp`.
6. The JWT is stored in an HttpOnly cookie (`access_token`) with `samesite=lax` and a configurable expiration time.
7. On each protected request, the `get_current_user` dependency extracts and validates the JWT from the cookie.
8. On logout, the cookie is deleted from the response.

#### 4.1.3. Functional Requirements

**REQ-AUTH-001:** [Implemented] The system shall allow a new user to register by providing a name (2–50 characters), a valid email address, a password (minimum 8 characters), and a role ("owner" or "tenant").

**REQ-AUTH-002:** [Implemented] The system shall reject registration if the provided email is already associated with an existing account, returning a 409 status with the message "Email already registered".

**REQ-AUTH-003:** [Implemented] The system shall store passwords as secure Argon2 hashes using the `pwdlib` library. Plaintext passwords shall never be stored.

**REQ-AUTH-004:** [Implemented] The system shall allow a registered user to log in by providing their email and password. Invalid credentials shall result in a 401 status with "Invalid email or password".

**REQ-AUTH-005:** [Implemented] Upon successful login, the system shall generate a signed JWT containing the user's ID, email, role, and expiration time, and shall store it in an HttpOnly cookie named `access_token`.

**REQ-AUTH-006:** [Implemented] The system shall provide a `GET /api/auth/me` endpoint that returns the authenticated user's ID, email, and role based on the JWT in the cookie.

**REQ-AUTH-007:** [Implemented] The system shall provide a `POST /api/auth/logout` endpoint that clears the `access_token` cookie if present. This endpoint does not require authentication to be called.

**REQ-AUTH-008:** [Implemented] The system shall reject requests to protected endpoints that do not contain a valid `access_token` cookie, returning a 401 status.

**REQ-AUTH-009:** [Implemented] The system shall reject requests with an expired JWT, returning a 401 status with "Token has expired".

**REQ-AUTH-010:** [Implemented] The frontend shall display a confirmation dialog before executing logout, allowing the user to cancel.

**REQ-AUTH-011:** [Implemented] The frontend shall check the user's session on application load by calling `GET /api/auth/me` and shall maintain user state in a React Context.

---

### 4.2. Owner Property Management

#### 4.2.1. Description and Priority

This feature allows authenticated Owners to manage their property portfolio through full CRUD (Create, Read, Update, Delete) operations. Each property is linked to its owner via the `owner_id` field, ensuring data isolation between different owners. This feature is **High** priority because property management is the core business function of the platform.

#### 4.2.2. Stimulus/Response Sequences

1. The Owner navigates to the "Add Property" form and submits property details.
2. The system validates the input (address 5–100 chars required, rent > 0 required, property type from allowed values, etc.) and stores the property in the `properties` collection with the owner's user ID.
3. The Owner views their property list, which fetches only properties matching their `owner_id`.
4. The Owner views, edits, or deletes a specific property. All operations verify that the `owner_id` matches the authenticated user.
5. If a non-owner or different owner attempts to access a property, the system returns 403 or 404 respectively.

#### 4.2.3. Functional Requirements

**REQ-PROP-001:** [Implemented] The system shall allow an authenticated owner to create a property by providing: title (optional, 2–100 chars), address (required, 5–100 chars), property_type (required, one of: "apartment", "house", "room", "other"), monthly_rent (required, float > 0), availability (required, one of: "available", "occupied"), and description (optional, max 500 chars).

**REQ-PROP-002:** [Implemented] The system shall store each property with an `owner_id` field matching the authenticated owner's user ID from the JWT.

**REQ-PROP-003:** [Implemented] The system shall allow an authenticated owner to view a list of all properties they own via `GET /api/properties`. Only properties belonging to that owner shall be returned.

**REQ-PROP-004:** [Implemented] The system shall allow an authenticated owner to view one of their properties via `GET /api/properties/{property_id}`. The system shall verify both the property ID and owner ID match.

**REQ-PROP-005:** [Implemented] The system shall allow an authenticated owner to update their property via `PUT /api/properties/{property_id}`. If the property does not exist or does not belong to the owner, a 404 shall be returned.

**REQ-PROP-006:** [Implemented] The system shall allow an authenticated owner to delete their property via `DELETE /api/properties/{property_id}`. If the property does not exist or does not belong to the owner, a 404 shall be returned.

**REQ-PROP-007:** [Implemented] The system shall reject property creation, listing, viewing, updating, and deleting requests from users with the "tenant" role, returning a 403 status.

**REQ-PROP-008:** [Implemented] The system shall validate the format of `property_id` path parameters. Invalid ObjectId formats shall result in a 400 "Invalid property ID format" response.

**REQ-PROP-009:** [Implemented] The frontend shall display a confirmation dialog before deleting a property, allowing the user to cancel the operation.

**REQ-PROP-010:** [Implemented] The frontend shall provide a shared form component for both creating and editing properties, pre-filling fields with existing data in edit mode.

---

### 4.3. Tenant Available-Property Browsing

#### 4.3.1. Description and Priority

This feature allows authenticated Tenants to browse and view properties that are currently marked as "available". Tenants have read-only access and cannot create, update, or delete properties. This feature is **High** priority because tenant browsing is the primary mechanism for connecting tenants with available properties.

#### 4.3.2. Stimulus/Response Sequences

1. The Tenant navigates to the "Browse Properties" page.
2. The system fetches all properties with `availability: "available"` from the database and returns them without exposing the `owner_id` or internal `_id`.
3. The Tenant clicks on a property to view its full details.
4. The system fetches the specific property, verifying it is still available. If not found or no longer available, a 404 is returned.

#### 4.3.3. Functional Requirements

**REQ-TENANT-001:** [Implemented] The system shall allow an authenticated tenant to view all properties with `availability: "available"` via `GET /api/properties/available`.

**REQ-TENANT-002:** [Implemented] The system shall strip `_id` and `owner_id` fields from tenant-facing property responses, replacing `_id` with a string `property_id`.

**REQ-TENANT-003:** [Implemented] The system shall allow an authenticated tenant to view one available property via `GET /api/properties/available/{property_id}`. If the property does not exist or is not available, a 404 shall be returned.

**REQ-TENANT-004:** [Implemented] The system shall reject requests to the tenant available-property endpoints from users with the "owner" role, returning a 403 status.

**REQ-TENANT-005:** [Implemented] The frontend shall display a friendly empty state message when no available properties exist.

**REQ-TENANT-006:** [Implemented] The frontend shall not display edit, delete, or create actions on tenant property pages.

---

## 5. Other Nonfunctional Requirements

### 5.1. Performance Requirements

● **Response Time:** The system shall respond to user requests (page loads, form submissions, API calls) within 2–3 seconds under normal load conditions on a local development setup.

● **Database:** The system uses MongoDB Atlas with the Motor async driver for non-blocking database operations, supporting efficient concurrent request handling.

### 5.2. Safety Requirements

● The system shall implement error handling to prevent data corruption. All API errors return structured JSON responses with meaningful messages.

● The frontend shall display clear error messages to users and shall not crash on network failures or unexpected API responses.

● The frontend shall handle network errors gracefully with the message "Cannot connect to server. Please make sure the backend is running."

### 5.3. Security Requirements

● **Authentication:** User authentication is implemented using JWT (JSON Web Tokens) stored in HttpOnly cookies to mitigate Cross-Site Scripting (XSS) token theft. The cookie is configured with `samesite=lax`.

● **Token Security:** The JWT is signed using a configurable secret key (`JWT_SECRET`) with the HS256 algorithm. Token expiration is configurable via `JWT_EXPIRE_MINUTES` (default: 60 minutes).

● **Password Storage:** All passwords are hashed using Argon2 via the `pwdlib` library. Plaintext passwords are never stored or logged. The `SecretStr` Pydantic type ensures passwords are not exposed in validation error messages.

● **Authorization:** Role-based access control is enforced on both backend (imperative role checks in route handlers returning 403) and frontend (`ProtectedRoute` component with `allowedRoles`).

● **Data Isolation:** Owner property operations always filter by `owner_id` from the JWT, preventing cross-owner data access.

● **Input Validation:** Pydantic models validate all request data (email format, string lengths, numeric ranges, literal values). Invalid input returns 422 with detailed validation errors.

● **Environment Isolation:** Sensitive credentials (MongoDB connection string, JWT secret) are stored in environment variables via `.env` files and are excluded from version control via `.gitignore`.

● **Frontend Security:** The frontend does not store JWT tokens in `localStorage` or `sessionStorage`. All API requests use `credentials: 'include'` to send cookies automatically.

### 5.4. Software Quality Attributes

● **Reliability:** The system validates all inputs on both frontend and backend, preventing invalid data from reaching the database.

● **Maintainability:** The codebase follows a clean separation of concerns: routes, schemas, database, and dependencies are in separate modules. The frontend follows a pages/components/services/context architecture.

● **Usability:** The user interface is intuitive with clear navigation, role-appropriate content, loading states, error messages, empty states, and confirmation dialogs for destructive actions.

● **Portability:** The application can run on any system with Python 3.11+, Node.js 18+, and a MongoDB Atlas connection.

### 5.5. Business Rules

● A property can have one of two availability statuses: "available" or "occupied". Only "available" properties are visible to tenants.

● An owner can only access, modify, or delete their own properties. They cannot see or modify properties belonging to other owners.

● A tenant cannot create, update, or delete any property.

● Passwords must be at least 8 characters long.

● Each email address can only be registered once.

● User roles are assigned at registration and cannot be changed by the user.

---

## 6. Current Limitations

RentEase currently implements secure authentication, owner-side property CRUD, and tenant read-only browsing of available properties. The following limitations exist in the current MVP:

1. **No CORS Middleware:** The backend does not include CORS configuration. Cross-origin requests work only through the Vite development proxy. A production deployment would require adding `CORSMiddleware` to FastAPI.

2. **No Image Upload:** Property listings are text-only. Image upload via Cloudinary is not implemented.

3. **No Tenant Assignment:** There is no mechanism to assign a tenant to a specific property or manage lease terms.

4. **No Payment System:** Rent tracking, UPI QR codes, UTR verification, and receipt generation are not implemented.

5. **No Admin Role:** There is no administrator user class or admin dashboard.

6. **No Real-Time Features:** WebSocket connections for notifications or chat are not implemented.

7. **No Email Notifications:** SMTP email sending is not implemented.

8. **No AI Features:** Google Gemini API integration is not implemented.

9. **Local Development Only:** The application is not deployed to any cloud platform. It runs entirely on `localhost`.

10. **Empty `.env.example`:** The backend `.env.example` file is empty and does not document the required environment variables.

---

## 7. Future Scope

The following features are planned for future releases but are **not implemented** in the current MVP:

| # | Feature | Description |
|---|---|---|
| 1 | Rent Management | Track rent due dates, amounts, and payment statuses per property |
| 2 | Payment Tracking & QR Verification | UPI QR code generation, UTR submission, owner verification, receipt download |
| 3 | Tenant-Property Assignment | Assign tenants to properties with lease lifecycle management |
| 4 | Maintenance Requests | Tenant-submitted issue reports with priority, status lifecycle, and audit trail |
| 5 | AI Assistant | Domain-aware chat powered by Google Gemini API |
| 6 | Analytics & Reports | Monthly business reports with financial data and occupancy rates |
| 7 | In-App Notifications | Real-time notifications via WebSockets |
| 8 | Email Notifications | SMTP-based email notifications for offline users |
| 9 | Image Upload | Property images via Cloudinary integration |
| 10 | Admin Role & Panel | Platform-wide user management and system health monitoring |
| 11 | Password Reset | Email-based password recovery |
| 12 | Email Verification | Verify user email addresses during registration |
| 13 | Advanced Search & Filters | Search properties by location, price range, type |
| 14 | Pagination | Paginated listing for large datasets |
| 15 | Production Deployment | Deploy to Vercel (frontend) and Render (backend) |
| 16 | CORS Configuration | Add CORSMiddleware for production cross-origin support |
| 17 | Mobile Application | Native or responsive mobile app |

---

## 8. Other Requirements

No additional requirements at this time beyond those specified in Sections 4 and 5.

---

## Appendix A: Glossary

| Term | Definition |
|---|---|
| **JWT** | JSON Web Token — a compact, URL-safe token format used for securely transmitting information between parties |
| **HttpOnly Cookie** | A cookie flag that prevents client-side JavaScript from accessing the cookie, mitigating XSS attacks |
| **RBAC** | Role-Based Access Control — restricting system access based on user roles |
| **CRUD** | Create, Read, Update, Delete — the four basic operations of persistent storage |
| **MVP** | Minimum Viable Product — the version of a product with just enough features to be usable |
| **Argon2** | A password-hashing algorithm that won the Password Hashing Competition in 2015 |
| **Motor** | An async Python driver for MongoDB, built on top of PyMongo |
| **Pydantic** | A Python library for data validation using Python type annotations |
| **Vite** | A modern frontend build tool that provides fast development server with hot module replacement |
| **FastAPI** | A modern, high-performance Python web framework for building APIs |
| **ObjectId** | MongoDB's default 12-byte identifier for documents |
| **SRS** | Software Requirements Specification |

---

## Appendix B: Analysis Models — Database Schema

The current MVP uses two MongoDB collections:

### `users` Collection

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | MongoDB auto-generated unique identifier |
| `name` | String | User's display name (2–50 characters) |
| `email` | String | User's email address (unique, stored lowercase) |
| `password_hash` | String | Argon2 hash of the user's password |
| `role` | String | User role: `"owner"` or `"tenant"` |

### `properties` Collection

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | MongoDB auto-generated unique identifier |
| `owner_id` | String | ID of the owner who created the property (matches `user_id` from JWT) |
| `title` | String / null | Property title (optional, 2–100 characters) |
| `address` | String | Property address (required, 5–100 characters) |
| `property_type` | String | One of: `"apartment"`, `"house"`, `"room"`, `"other"` |
| `monthly_rent` | Float | Monthly rent amount (must be > 0) |
| `availability` | String | One of: `"available"`, `"occupied"` |
| `description` | String / null | Property description (optional, max 500 characters) |

---

## Appendix C: API Endpoint Reference

| Method | Endpoint | Auth | Role | Request Body | Success Response | Status |
|---|---|---|---|---|---|---|
| `GET` | `/api/health` | None | Public | — | `{"status": "ok", "service": "RentEase API"}` | 200 |
| `POST` | `/api/auth/register` | None | Public | `{name, email, password, role}` | `{"message": "User registered successfully"}` | 201 |
| `POST` | `/api/auth/login` | None | Public | `{email, password}` | `{"message": "Login successful"}` + Set-Cookie | 200 |
| `GET` | `/api/auth/me` | Cookie | Any | — | `{user_id, email, role}` | 200 |
| `POST` | `/api/auth/logout` | None | Any | — | `{"message": "Logout successfully"}` + Delete-Cookie | 200 |
| `POST` | `/api/properties` | Cookie | Owner | `{title?, address, property_type, monthly_rent, availability, description?}` | `{message, property_id}` | 201 |
| `GET` | `/api/properties` | Cookie | Owner | — | Array of owner's properties | 200 |
| `GET` | `/api/properties/{id}` | Cookie | Owner | — | Single property object | 200 |
| `PUT` | `/api/properties/{id}` | Cookie | Owner | `{title?, address, property_type, monthly_rent, availability, description?}` | `{message, property_id}` | 200 |
| `DELETE` | `/api/properties/{id}` | Cookie | Owner | — | `{message, property_id}` | 200 |
| `GET` | `/api/properties/available` | Cookie | Tenant | — | Array of available properties (no owner_id) | 200 |
| `GET` | `/api/properties/available/{id}` | Cookie | Tenant | — | Single available property (no owner_id) | 200 |

### Error Responses

| Status | Meaning | Example |
|---|---|---|
| 400 | Bad Request | Invalid ObjectId format |
| 401 | Unauthorized | Missing/expired/invalid token |
| 403 | Forbidden | Wrong role for endpoint |
| 404 | Not Found | Property doesn't exist or doesn't belong to user |
| 409 | Conflict | Email already registered |
| 422 | Validation Error | Pydantic validation failure |

---

*Prepared by Team RentEase — SGSITS, 2026*
