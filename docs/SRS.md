# Software Requirements Specification

## for

# RentEase

**Version 1.0**

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
  - [4.1 User Authentication, Verification & Access Control](#41-user-authentication-verification--access-control)
  - [4.2 Owner Property Management](#42-owner-property-management)
  - [4.3 Tenant Property Discovery & Owner Contact](#43-tenant-property-discovery--owner-contact)
  - [4.4 Administrator Owner Verification](#44-administrator-owner-verification)
- [5. Other Nonfunctional Requirements](#5-other-nonfunctional-requirements)
  - [5.1 Performance Requirements](#51-performance-requirements)
  - [5.2 Safety Requirements](#52-safety-requirements)
  - [5.3 Security Requirements](#53-security-requirements)
  - [5.4 Software Quality Attributes](#54-software-quality-attributes)
  - [5.5 Business Rules](#55-business-rules)
- [Appendix A: Glossary](#appendix-a-glossary)
- [Appendix B: Analysis Models — Database Schema](#appendix-b-analysis-models--database-schema)
- [Appendix C: API Endpoint Reference](#appendix-c-api-endpoint-reference)

---

## Revision History

| Name | Date | Reason For Changes | Version |
|---|---|---|---|
| | | | |

---

## 1. Introduction

### 1.1. Purpose

RentEase is a full-stack rental property management and discovery platform designed for property owners, prospective tenants, and platform administrators. This document specifies the functional, interface, performance, and quality requirements for the RentEase application. The platform provides property owners with tools to list and manage rental properties with photographic media, prospective tenants with an interface to browse verified listings with direct owner contact channels, and administrators with an oversight portal to inspect proof-of-ownership documents before granting platform access to owners.

### 1.2. Document Conventions

This document adheres to the IEEE 830-1998 standard for Software Requirements Specifications. Headings are structured hierarchically, and requirements are identified with unique identifiers (e.g., REQ-AUTH-001). Requirements marked as **[Implemented]** describe functionalities currently built and operational within the system.

### 1.3. Intended Audience and Reading Suggestions

This specification is prepared for project evaluators, academic faculty, software developers, and system architects. Evaluators can review the functional requirements and architectural specifications to assess project completion. Developers should consult Section 3 (External Interfaces), Section 4 (System Features), and the Appendices for implementation references.

### 1.4. Product Scope

RentEase streamlines the rental lifecycle by addressing authentic listing verification, property showcasing, and direct communication:

1. **Authentication & Multi-Factor Identification** — Account registration for Owners and Tenants capturing verified phone numbers and emails, paired with dual-mode login (Email or Phone Number).
2. **Owner Verification & Admin Governance** — Mandatory upload of ownership proof documents (deed, tax receipt, utility bill) by owners upon registration, with account activation contingent upon manual administrator review.
3. **Property Showcase & Media Management** — Full CRUD management for rental listings with support for 0 to 3 high-resolution property photographs uploaded and hosted via Cloudinary.
4. **Tenant Discovery & Direct Contact** — Public browsing of active listings featuring responsive thumbnail cards, interactive image carousels, and verified owner phone contact details.
5. **Role-Based Security** — Strict data isolation enforcing privilege boundaries across Owners, Tenants, and Administrators through HttpOnly JWT cookies.

### 1.5. References

- IEEE Std 830-1998 — IEEE Recommended Practice for Software Requirements Specifications.

---

## 2. Overall Description

### 2.1. Product Perspective

RentEase is an autonomous, standalone web application developed as an academic coursework initiative. The architecture consists of a modern single-page frontend (React 18), an asynchronous REST API backend (FastAPI), an external cloud database (MongoDB Atlas), and an integrated media storage cloud (Cloudinary). Frontend and backend communicate through standard RESTful JSON requests and multipart form transmissions, utilizing a local development proxy to handle cross-origin requests.

### 2.2. Product Functions

1. **User Registration** — Users register as either an Owner or Tenant by submitting their name, email, phone number, and password. Owners are additionally required to attach a proof-of-ownership document.
2. **Owner Account Verification** — Owner registrations enter a `pending` status. Owners receive a real-time Verification Status Card enabling them to refresh their approval state. Unapproved owners cannot log in.
3. **Administrator Oversight** — Administrators access a dedicated dashboard to inspect pending owner submissions, review uploaded ownership documents via Cloudinary, and execute Approve or Reject actions.
4. **Dual Authentication** — Registered users can authenticate using either their email address or their registered phone number alongside their password.
5. **Session Management** — Authentication state is preserved through secure HttpOnly JWT cookies with automatic background session validation.
6. **Property Creation & Photo Upload** — Owners create listings specifying property parameters and optionally attaching up to 3 photographs.
7. **Property Portfolio Management** — Owners view, inspect, modify (including managing photos), and delete their property listings.
8. **Tenant Browsing & Inspection** — Tenants explore available listings with thumbnail previews, interactive photo carousels, and complete property specifications.
9. **Owner Contact Access** — Verified owner telephone numbers are presented on available property views to allow tenants to establish direct communication.
10. **Role-Based Access Control** — Access restrictions prevent tenants from invoking owner operations, owners from browsing as tenants, and unverified users from accessing platform portals.

### 2.3. User Classes and Characteristics

**Administrator**
- Characteristics: Platform operators responsible for maintaining system integrity and vetting listing authenticity.
- Privileges: Log in via seeded credentials, view the Administrator Dashboard, inspect pending owner submissions and documents, approve or reject owner registrations.

**Owner**
- Characteristics: Real estate owners and landlords seeking to list residential or commercial properties.
- Privileges: Register with document upload, track verification status, log in (once approved), create and update listings with up to 3 photographs, manage property availability, and remove listings.

**Tenant**
- Characteristics: Individuals seeking rental accommodations.
- Privileges: Register with immediate account activation, log in via email or phone, browse all active listings, inspect image carousels, and view owner contact details.

### 2.4. Operating Environment

The application operates across modern standards-compliant web browsers (Google Chrome, Mozilla Firefox, Microsoft Edge, Apple Safari).
- **Backend Runtime:** Python 3.11+, FastAPI, Uvicorn (Port 8000).
- **Frontend Runtime:** Node.js 18+, Vite development server (Port 5173).
- **Database:** MongoDB Atlas (Cloud Cluster).
- **Media Engine:** Cloudinary API.

### 2.5. Design and Implementation Constraints

- **Technology Stack:** Frontend built with React 18, React Router v6, and vanilla CSS; backend constructed with Python FastAPI and Motor.
- **Authentication Security:** JWT signed with HS256 algorithm and persisted inside HttpOnly cookies with `samesite=lax` policy. Plaintext passwords are never stored; hashing uses Argon2 via `pwdlib`.
- **Media Constraints:** Images and documents are restricted to JPG, PNG, WebP, and PDF formats, with a maximum file size limit of 5MB per upload.

### 2.6. User Documentation

The project includes an extensive `README.md` at the repository root outlining prerequisites, environment configuration, dependency installation, database seeding, and operational workflows.

### 2.7. Assumptions and Dependencies

- Users possess standard internet connectivity for MongoDB Atlas and Cloudinary access.
- An administrator account is provisioned via the database seeding script (`seed_admin.py`).
- Cloudinary credentials are provided in the backend environment configuration.

---

## 3. External Interface Requirements

### 3.1. User Interfaces

- **Registration Portal:** Form inputs for full name, email, phone number, password, role toggle, and conditional document upload input for owners.
- **Verification Status Card:** Post-registration card for owners displaying account identifier, verification badge, and an in-place `Refresh Status` action.
- **Dual Login Portal:** Sign-in screen with tabbed selectors for "Email" and "Phone" modes.
- **Admin Verification Panel (`/admin/dashboard`):** Dashboard listing pending owners with applicant metadata, Cloudinary document view button, and Approve/Reject controls.
- **Owner Dashboard & Management:** Portfolio summary cards, property cards with image thumbnails, and an interactive image upload grid with deletion controls.
- **Property Details & Carousel:** Full specification display featuring an interactive photo carousel with previous/next buttons and navigation indicators.
- **Tenant Contact Section:** Embedded owner contact card on property details showing the owner's name and clickable telephone link (`tel:`).
- **Navigation Bar:** Dynamic, role-sensitive navigation links updating instantly according to active authentication status.

### 3.2. Hardware Interfaces

No specialized hardware interfaces are required. Standard display screens, keyboards, and mouse/touch pointers on personal computers and mobile devices are supported.

### 3.3. Software Interfaces

- **FastAPI REST API:** Asynchronous HTTP request handling for all frontend-backend interactions.
- **MongoDB Atlas via Motor:** Asynchronous database client for document storage across `users` and `properties` collections.
- **Cloudinary REST API:** Secure storage and delivery of ownership proof files and property photographs.

### 3.4. Communications Interfaces

- **HTTP/1.1:** Data transport between browser client and server.
- **JSON & Multipart Form-Data:** JSON for structured payloads; multipart/form-data for document and photo uploads.
- **HttpOnly Cookies:** Transmission of encrypted session tokens.

---

## 4. System Features

### 4.1. User Authentication, Verification & Access Control

#### 4.1.1. Description and Priority
Manages user onboarding, unique identity tracking, credential validation, ownership proof verification, and session governance. **Priority: Critical.**

#### 4.1.2. Functional Requirements

- **REQ-AUTH-001:** [Implemented] The system shall allow users to register with name (2–50 characters), email, phone number (10–15 digits), password (minimum 8 characters), and role ("owner" or "tenant").
- **REQ-AUTH-002:** [Implemented] The system shall enforce uniqueness on both email address and phone number, returning HTTP 409 if either already exists.
- **REQ-AUTH-003:** [Implemented] The system shall require owners to upload an ownership proof document (JPG, PNG, WebP, or PDF, maximum 5MB) during registration.
- **REQ-AUTH-004:** [Implemented] The system shall assign newly registered owners a status of `pending` and store the uploaded document on Cloudinary.
- **REQ-AUTH-005:** [Implemented] The system shall provide a `GET /api/auth/status` endpoint to return the current verification state of an account by email.
- **REQ-AUTH-006:** [Implemented] The system shall allow users to authenticate using either email and password or phone number and password.
- **REQ-AUTH-007:** [Implemented] The system shall block login attempts from owner accounts with `pending` or `rejected` status, returning HTTP 403.
- **REQ-AUTH-008:** [Implemented] Upon successful authentication, the system shall issue an HttpOnly JWT cookie containing user ID, email, role, and expiration timestamp.
- **REQ-AUTH-009:** [Implemented] The system shall provide `GET /api/auth/me` to restore active session state and `POST /api/auth/logout` to terminate the session.

---

### 4.2. Owner Property Management

#### 4.2.1. Description and Priority
Enables verified property owners to create, read, update, and delete property listings along with photo galleries. **Priority: High.**

#### 4.2.2. Functional Requirements

- **REQ-PROP-001:** [Implemented] The system shall allow authenticated, approved owners to create properties with title, address, property type, monthly rent (> 0), availability, description, and up to 3 photographs.
- **REQ-PROP-002:** [Implemented] The system shall upload attached property photographs to Cloudinary and store the secure URLs in the property document.
- **REQ-PROP-003:** [Implemented] The system shall isolate property records by `owner_id`, returning only properties owned by the authenticated owner via `GET /api/properties`.
- **REQ-PROP-004:** [Implemented] The system shall allow owners to update existing properties, including modifying textual data and adding or removing individual photos.
- **REQ-PROP-005:** [Implemented] The system shall allow owners to delete properties, permanently removing the record from the database.
- **REQ-PROP-006:** [Implemented] The system shall reject property CRUD attempts from non-owner accounts with HTTP 403.

---

### 4.3. Tenant Property Discovery & Owner Contact

#### 4.3.1. Description and Priority
Provides tenants with tools to browse active rental listings, inspect photographs, and contact owners directly. **Priority: High.**

#### 4.3.2. Functional Requirements

- **REQ-TENANT-001:** [Implemented] The system shall allow authenticated tenants to retrieve all listings marked as "available" via `GET /api/properties/available`.
- **REQ-TENANT-002:** [Implemented] The system shall include the owner's display name, telephone number, and photograph URLs in the available property responses while omitting internal owner identifiers.
- **REQ-TENANT-003:** [Implemented] The frontend shall render the primary photograph as a thumbnail on each listing card and display a fallback placeholder when no photo exists.
- **REQ-TENANT-004:** [Implemented] The frontend shall render an interactive photo carousel with previous/next controls and position indicators on property detail pages.
- **REQ-TENANT-005:** [Implemented] The frontend shall render a "Contact Owner" section displaying the owner's telephone number as a clickable `tel:` link.

---

### 4.4. Administrator Owner Verification

#### 4.4.1. Description and Priority
Provides administrative oversight to evaluate proof-of-ownership documentation and regulate owner admission. **Priority: High.**

#### 4.4.2. Functional Requirements

- **REQ-ADMIN-001:** [Implemented] The system shall restrict administrative endpoints exclusively to users with the `admin` role, returning HTTP 403 to unauthorized users.
- **REQ-ADMIN-002:** [Implemented] The system shall provide `GET /api/admin/pending-owners` to list all owners awaiting verification, returning applicant name, email, phone number, and document URL.
- **REQ-ADMIN-003:** [Implemented] The system shall provide `PUT /api/admin/verify-owner/{user_id}` accepting an action of either `approved` or `rejected`.
- **REQ-ADMIN-004:** [Implemented] Approving an owner shall immediately permit that owner to authenticate and access the Owner Dashboard.
- **REQ-ADMIN-005:** [Implemented] The system shall include a CLI administrative seed script (`seed_admin.py`) to create initial administrator credentials.

---

## 5. Other Nonfunctional Requirements

### 5.1. Performance Requirements

- **Response Time:** API endpoints shall respond within 2 seconds under regular local development conditions.
- **Asynchronous Execution:** Database operations utilize the non-blocking Motor driver to facilitate concurrent client requests.

### 5.2. Safety Requirements

- The application validates all user input at the boundary to prevent database corruption.
- Destructive operations (such as listing deletion) require user confirmation before execution.

### 5.3. Security Requirements

- **Password Storage:** Passwords hashed using Argon2 via `pwdlib`. Plaintext credentials are never saved or exposed in logs.
- **Token Security:** JWT tokens stored inside HttpOnly cookies with `samesite=lax` to protect against cross-site scripting token theft.
- **Data Isolation:** All owner mutations verify matching ownership identifiers to prevent cross-account tampering.
- **File Validation:** Document and image uploads are strictly validated for MIME type and file size (≤ 5MB) on both client and server.

### 5.4. Software Quality Attributes

- **Reliability:** Dual-layer validation (Pydantic models on server, form checks on client) prevents malformed inputs.
- **Maintainability:** Modular architecture organizing routes, dependencies, schemas, utilities, and components independently.
- **Usability:** Responsive layout with contextual loading indicators, meaningful error notifications, and real-time status updates.

### 5.5. Business Rules

- Only properties with availability status "available" are presented in tenant discovery queries.
- Owners must be approved by an administrator before their listings can be created or their portal accessed.
- Each email address and telephone number can be associated with only one account.

---

## Appendix A: Glossary

| Term | Definition |
|---|---|
| **JWT** | JSON Web Token — standard token format for authenticating requests |
| **HttpOnly Cookie** | Security flag preventing JavaScript access to session cookies |
| **Cloudinary** | Cloud platform used for storing and optimizing user-uploaded documents and images |
| **Argon2** | Secure key derivation and password hashing algorithm |
| **Motor** | Asynchronous Python client library for MongoDB |
| **Pydantic** | Data validation and parsing library for Python |
| **RBAC** | Role-Based Access Control enforcing permissions based on user roles |
| **CRUD** | Create, Read, Update, and Delete operations |

---

## Appendix B: Analysis Models — Database Schema

### `users` Collection

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | MongoDB unique document identifier |
| `name` | String | User's full name (2–50 characters) |
| `email` | String | User email address (unique, stored lowercase) |
| `phone` | String | User telephone number (unique, 10–15 characters) |
| `password_hash` | String | Argon2 password hash |
| `role` | String | Account role: `"owner"`, `"tenant"`, or `"admin"` |
| `status` | String | Account status: `"pending"`, `"approved"`, or `"rejected"` |
| `document_url` | String / null | Cloudinary URL for owner proof document |

### `properties` Collection

| Field | Type | Description |
|---|---|---|
| `_id` | ObjectId | MongoDB unique document identifier |
| `owner_id` | String | User ID of the listing owner |
| `title` | String / null | Property title (optional, 2–100 characters) |
| `address` | String | Full property address (5–100 characters) |
| `property_type` | String | Type: `"apartment"`, `"house"`, `"room"`, or `"other"` |
| `monthly_rent` | Float | Monthly rental fee (greater than 0) |
| `availability` | String | Listing status: `"available"` or `"occupied"` |
| `description` | String / null | Detailed description (optional, max 500 characters) |
| `image_urls` | Array of Strings | Cloudinary URLs of property photographs (0 to 3 items) |

---

## Appendix C: API Endpoint Reference

| Method | Endpoint | Auth | Role | Payload | Description |
|---|---|---|---|---|---|
| `GET` | `/api/health` | None | Public | — | System health check |
| `POST` | `/api/auth/register` | None | Public | Multipart: name, email, phone, password, role, document? | Register new account |
| `POST` | `/api/auth/login` | None | Public | JSON: `{email?, phone?, password}` | Authenticate via email or phone |
| `GET` | `/api/auth/status` | None | Public | Query: `?email=...` | Retrieve account verification status |
| `GET` | `/api/auth/me` | Cookie | Any | — | Retrieve current authenticated user profile |
| `POST` | `/api/auth/logout` | None | Any | — | Invalidate session cookie |
| `GET` | `/api/admin/pending-owners` | Cookie | Admin | — | List all owners pending verification |
| `PUT` | `/api/admin/verify-owner/{id}` | Cookie | Admin | JSON: `{"action": "approved" \| "rejected"}` | Approve or reject owner account |
| `POST` | `/api/properties` | Cookie | Owner | Multipart: property fields + 0–3 image files | Create new property listing |
| `GET` | `/api/properties` | Cookie | Owner | — | Retrieve all properties owned by user |
| `GET` | `/api/properties/{id}` | Cookie | Owner | — | Retrieve single owned property |
| `PUT` | `/api/properties/{id}` | Cookie | Owner | Multipart: property fields + images + existing_images | Update owned property listing |
| `DELETE` | `/api/properties/{id}` | Cookie | Owner | — | Delete owned property listing |
| `GET` | `/api/properties/available` | Cookie | Tenant | — | Retrieve active listings with thumbnails |
| `GET` | `/api/properties/available/{id}` | Cookie | Tenant | — | Retrieve active listing with carousel & owner phone |

---

*Prepared by Team RentEase — SGSITS, 2026*
