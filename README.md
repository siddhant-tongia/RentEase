<div align="center">

# 🏠 RentEase

### AI-Powered Rental Property Management System

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Gemini](https://img.shields.io/badge/Google_Gemini-AI-4285F4?logo=google&logoColor=white)](https://ai.google.dev/)

**RentEase** is a full-stack web application that eliminates fragmented rental administration by unifying property records, tenant management, rent tracking, payment verification, maintenance requests, and AI-driven insights into a single, intelligent platform.

[Features](#-features) · [Tech Stack](#-tech-stack) · [Architecture](#-architecture) · [Getting Started](#-getting-started) · [Documentation](#-documentation) · [Team](#-team)

</div>

---

## 📋 Overview

Managing rental properties through scattered spreadsheets, WhatsApp messages, and manual follow-ups is chaotic and error-prone. **RentEase** solves this by providing:

- **For Property Owners** — A single dashboard view of occupied properties, payment evidence, outstanding maintenance tickets, and AI-generated actionable summaries. No more missed follow-ups.
- **For Tenants** — A reliable way to view rent obligations, submit evidence-backed maintenance requests, receive real-time status updates, and obtain responses through a structured system.
- **For Administrators** — Complete platform oversight with user management, system health monitoring, and high-level revenue analytics.

---

## ✨ Features

### 🔐 Authentication & Role-Based Access Control
- Secure registration and login with **JWT tokens** stored in HttpOnly cookies
- Three distinct roles — **Admin**, **Owner**, **Tenant** — each with tailored dashboards
- RBAC enforcement on both frontend and backend routes

### 🏘️ Property & Tenant Management
- Full CRUD operations for property listings with image uploads via **Cloudinary**
- Tenant assignment with lease lifecycle management (start date, end date, rent terms)
- Real-time property status tracking (vacant, occupied, under maintenance)

### 💰 Rent Tracking & QR Payment Verification
- **Static UPI QR code** generation for each active property
- Tenants submit payment proof via **UTR (Unique Transaction Reference)**
- Owners manually verify payments against bank records
- Auto-generated downloadable **rent receipts** upon verification
- Complete, immutable payment history per tenant and per property

### 🤖 AI-Powered Assistant & Analytics
- **Domain-aware AI chat** interface powered by **Google Gemini API**
- Automated **rent reminders** sent via in-app notifications and email
- AI-driven **complaint summarization** for quick Owner review
- Auto-generated **monthly business reports** with financial data, occupancy rates, and revenue analytics

### 🔧 Maintenance Request System
- Tenants submit requests with **title, description, category, and photo evidence**
- Smart **priority assignment** (Critical / High / Medium / Low) based on category and keywords
- Full lifecycle: Open → Acknowledged → In Progress → Resolved → Closed
- **Real-time updates** via WebSockets with email fallback
- Immutable **audit trail** of all status changes, messages, and priority adjustments
- Tenants can confirm resolution or reopen with explanation

### 🔔 Notifications
- Real-time **in-app notifications** via authenticated WebSocket channels
- **Email notifications** (SMTP) as fallback for offline users
- Notifications for rent reminders, payment status, maintenance updates, and system alerts

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, TypeScript, Tailwind CSS, Axios, Chart.js |
| **Backend** | Python 3.11+, FastAPI, Pydantic, WebSockets |
| **Database** | MongoDB Atlas (NoSQL document database) |
| **Authentication** | JWT (JSON Web Tokens), Passlib + Argon2, RBAC |
| **AI/ML** | Google Gemini API |
| **Media Storage** | Cloudinary (images, PDFs, receipts) |
| **Email** | SMTP (smtplib) |
| **Deployment** | Vercel (frontend), Render (backend) |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                         │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │          React + TypeScript + Tailwind CSS                │  │
│  │  ┌─────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │  │
│  │  │  Admin  │  │  Owner   │  │  Tenant  │  │ AI Chat  │    │  │
│  │  │Dashboard│  │Dashboard │  │Dashboard │  │Interface │    │  │
│  │  └─────────┘  └──────────┘  └──────────┘  └──────────┘    │  │
│  └──────────────────────┬────────────────────────────────────┘  │
│                         │ Axios (REST) + WebSockets             │
└─────────────────────────┼───────────────────────────────────────┘
                          │ HTTPS
┌─────────────────────────┼───────────────────────────────────────┐
│                    BACKEND (FastAPI)                            │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────────────┐   │
│  │   Auth   │ │ Property │ │  Tenant  │ │    Maintenance    │   │
│  │  Module  │ │  Module  │ │  Module  │ │      Module       │   │
│  └──────────┘ └──────────┘ └──────────┘ └───────────────────┘   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────────────┐   │
│  │ Payment  │ │    AI    │ │  Notif.  │ │   WebSocket Mgr   │   │
│  │  Module  │ │  Module  │ │  Module  │ │                   │   │
│  └──────────┘ └──────────┘ └──────────┘ └───────────────────┘   │
│              JWT + RBAC Middleware  |  Pydantic Validation      │
└───────┬──────────────┬──────────────┬───────────────────────────┘
        │              │              │
   ┌────▼────┐    ┌────▼─────┐   ┌────▼────────────┐
   │MongoDB  │    │Cloudinary│   │  Google Gemini  │
   │ Atlas   │    │  (Media) │   │   API (AI)      │
   └─────────┘    └──────────┘   └─────────────────┘
```

### Database Collections

| Collection | Purpose |
|---|---|
| `Users` | Authentication, profiles, roles (Admin/Owner/Tenant) |
| `Properties` | Property listings, addresses, images, QR codes |
| `Tenants` | Tenant-property assignments, lease dates, status |
| `Payments` | Rent transactions, UTRs, verification status, receipts |
| `Maintenance` | Maintenance requests, priorities, status history |
| `Notifications` | In-app notifications, read status |

---

## 📁 Repository Structure

```text
RentEase-repo/
├── backend/                  # FastAPI Python backend
│   └── .env.example          # Environment variables template
├── docs/                     # Project documentation
│   ├── SRS.md                # Software Requirements Specification
│   ├── User-Stories.md       # User stories and acceptance criteria
│   └── UML-Diagrams/         # System architecture and design diagrams
│       ├── 1_UseCase_Diagram.excalidraw
│       ├── 2_Class_Diagram.excalidraw
│       ├── 3_Sequence_Diagram.excalidraw
│       ├── 4_Activity_Diagram.excalidraw
│       ├── 5_Component_Diagram.excalidraw
│       └── 6_StateChart_Diagram.excalidraw
├── frontend/                 # React frontend application
│   └── .gitkeep              # Placeholder for frontend setup
├── .gitignore                # Git ignore rules
└── README.md                 # Project overview and setup instructions
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ and **npm**
- **Python** 3.11+ and **pip**
- **MongoDB Atlas** account (or local MongoDB)
- **Cloudinary** account
- **Google Gemini API** key

### 1. Clone the Repository

```bash
git clone https://github.com/siddhant-tongia/RentEase.git
cd RentEase
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv

# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
```

Create a `.env` file in the `backend/` directory:

```env
# MongoDB
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/rentease

# JWT
JWT_SECRET_KEY=your-secret-key
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Google Gemini
GEMINI_API_KEY=your-gemini-api-key

# Email (SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

```bash
uvicorn main:app --reload --port 8000
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_BASE_URL=http://localhost:8000
```

```bash
npm run dev
```

### 4. Access the Application

- **Frontend:** http://localhost:5173
- **Backend API Docs:** http://localhost:8000/docs (Swagger UI)

---

## 📚 Documentation

| Document | Description |
|---|---|
| [Software Requirements Specification (SRS)](docs/SRS.md) | Complete IEEE 830-1998 compliant SRS document |
| [User Stories](docs/User-Stories.md) | User stories with acceptance criteria for all features |
| [UML Diagrams](docs/UML-Diagrams/) | System architecture and design diagrams |

### UML Diagrams

> Open `.excalidraw` files at [excalidraw.com](https://excalidraw.com) or using the [VS Code Excalidraw extension](https://marketplace.visualstudio.com/items?itemName=pomdtr.excalidraw-editor).

| Diagram | File | Description |
|---|---|---|
| Use Case Diagram | [`1_UseCase_Diagram.excalidraw`](docs/UML-Diagrams/1_UseCase_Diagram.excalidraw) | All actors and their interactions with the system |
| Class Diagram | [`2_Class_Diagram.excalidraw`](docs/UML-Diagrams/2_Class_Diagram.excalidraw) | Entity models, attributes, and relationships |
| Sequence Diagram | [`3_Sequence_Diagram.excalidraw`](docs/UML-Diagrams/3_Sequence_Diagram.excalidraw) | Critical flow interactions (Auth, Payment, Maintenance) |
| Activity Diagram | [`4_Activity_Diagram.excalidraw`](docs/UML-Diagrams/4_Activity_Diagram.excalidraw) | Process workflows for payment and maintenance |
| Component Diagram | [`5_Component_Diagram.excalidraw`](docs/UML-Diagrams/5_Component_Diagram.excalidraw) | System architecture and component dependencies |
| State Chart Diagram | [`6_StateChart_Diagram.excalidraw`](docs/UML-Diagrams/6_StateChart_Diagram.excalidraw) | Entity lifecycles: User, Property, Payment, Maintenance, Notification |

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

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ by Team RentEase**

*Shri Govindram Seksaria Institute of Technology and Science, 2026*

</div>
