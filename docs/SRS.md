# Software Requirements Specification

## for

# RentEase

**Version 1.0 approved**

**Prepared by**

- SARTHAK GUPTA (0801CS251128)
- SHOURYA RAJ SINGH CHAUHAN (0801CS251131)
- SIDDHANT TONGIA (0801CS251136)
- SOMMAY PALIWAL (0801CS251138)
- SUNIL TALREJA (0801CS251139)

**Shri Govindram Seksaria Institute of Technology and Science**

**August 24, 2026**

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
  - [4.2 Property & Tenant Management](#42-property--tenant-management)
  - [4.3 Rent Tracking & QR Payment Verification](#43-rent-tracking--qr-payment-verification)
  - [4.4 AI-Powered Assistant & Analytics](#44-ai-powered-assistant--analytics)
  - [4.5 Maintenance Request System](#45-maintenance-request-system)
- [5. Other Nonfunctional Requirements](#5-other-nonfunctional-requirements)
  - [5.1 Performance Requirements](#51-performance-requirements)
  - [5.2 Safety Requirements](#52-safety-requirements)
  - [5.3 Security Requirements](#53-security-requirements)
  - [5.4 Software Quality Attributes](#54-software-quality-attributes)
  - [5.5 Business Rules](#55-business-rules)
- [6. Other Requirements](#6-other-requirements)
- [Appendix A: Glossary](#appendix-a-glossary)
- [Appendix B: Analysis Models](#appendix-b-analysis-models)
- [Appendix C: To Be Determined List](#appendix-c-to-be-determined-list)

---

## Revision History

| Name | Date | Reason For Changes | Version |
|------|------|---------------------|---------|
|      |      |                     |         |

---

## 1. Introduction

### 1.1. Purpose

RentEase is an AI-powered web platform for small property owners and their tenants. It solves the specific problem of fragmented rental administration by bringing property records, tenant assignments, rent-status tracking, payment-proof verification, maintenance requests, and routine communication into one controlled system. For property owners, the software shall reduce missed follow-ups and manual spreadsheet or messaging work by providing a single view of occupied properties, payment evidence, outstanding maintenance tickets, and actionable AI-generated summaries. For tenants, it shall provide a reliable way to view rent obligations, submit evidence-backed maintenance requests, receive status updates, and obtain responses without depending on informal communication channels. The objective of this SRS is to define the exact functional, interface, and quality requirements for the first coursework release of RentEase.

### 1.2. Document Conventions

This document adheres to the IEEE 830-1998 standard for Software Requirements Specifications. Key terms and concepts are defined in Appendix A (Glossary). Headings are numbered sequentially, and cross-references are provided where necessary. All acronyms are defined upon their first use. The language used is formal and technical, suitable for a professional software development context.

### 1.3. Intended Audience and Reading Suggestions

The primary audience for this SRS includes students, professors, project managers, developers, and quality assurance testers. Students and professors will find this document valuable for understanding the project's scope, requirements, and technical details, which can be used for academic evaluation and resume building. Project managers can use it for planning and tracking progress, while developers will use it as a guide for implementation. Quality assurance testers will refer to it for test case generation and validation. It is recommended that readers begin with the Introduction for an overview, then proceed to the Overall Description and System Features for detailed functionalities.

### 1.4. Product Scope

RentEase is an AI-powered full-stack web application designed to streamline rental property management. It aims to simplify communication, rent collection, property tracking, and maintenance management for property owners and tenants. The system provides dedicated interfaces for administrators, owners, and tenants, offering features such as user management, financial analytics, payment tracking, and AI-driven assistance. The initial release focuses on core functionalities to establish a robust platform for efficient property management.

### 1.5. References

● IEEE Std 830-1998 - IEEE Recommended Practice for Software Requirements Specifications.

---

## 2. Overall Description

### 2.1. Product Perspective

RentEase is a standalone, AI-powered SaaS platform that integrates various components to provide a comprehensive property management solution. It is not part of a larger system but interacts with external services such as Google Gemini API for AI functionalities, Cloudinary for media storage, and potentially third-party payment gateways in future iterations. The system will be accessible via web browsers, offering a responsive user experience across different devices.

### 2.2. Product Functions

RentEase provides a range of functions catering to three distinct user roles: Admin, Owner, and Tenant. Key functions include user authentication and authorization, property listing and management, tenant assignment, rent collection and tracking, QR code-based payment verification, AI-powered communication assistance, complaint summarization, maintenance request handling, and comprehensive analytics and reporting for financial and operational insights.

### 2.3. User Classes and Characteristics

**Administrator**

● Characteristics: System supervisor, responsible for overall platform health, user management, and high-level revenue analytics.

● Privileges: Full access to all system functionalities, including user creation, modification, and deletion; system configuration; and comprehensive reporting.

**Owner**

● Characteristics: Landlords and property managers who manage multiple properties, assign tenants, monitor rent payments, review maintenance requests, and analyze financial reports.

● Privileges: Create, update, and delete property listings; assign tenants to properties; view rent payment statuses; manage maintenance requests; access financial dashboards and reports.

**Tenant**

● Characteristics: Occupants who view property details, track rent due dates, make UPI payments via static QR codes, download receipts, and submit photo-backed complaints.

● Privileges: View assigned property details; track personal rent payment history; make payments; submit and track maintenance requests; download receipts.

### 2.4. Operating Environment

RentEase is a cloud-deployed web application accessible via standard web browsers. The system is designed to operate on modern web browsers, including Google Chrome, Mozilla Firefox, Apple Safari, and Microsoft Edge, across various operating systems (Windows, macOS, Linux, Android, iOS). It is optimized for both desktop and mobile devices, ensuring a responsive user experience. The backend services will run on cloud infrastructure, leveraging containerization for scalability and reliability.

### 2.5. Design and Implementation Constraints

● **Technology Stack:** Frontend developed with React, TypeScript, and Tailwind CSS; Backend with Python, FastAPI, and MongoDB Atlas.

● **Security:** Implementation must adhere to industry best practices for web application security, including JWT for authentication, RBAC for authorization, and input sanitization.

● **Performance:** The system must be designed for scalability to handle a growing number of users and properties without significant degradation in performance.

● **Deployment:** The application will be deployed on cloud platforms (Vercel for frontend, Render for backend).

● **External APIs:** Reliance on Google Gemini API for AI features and Cloudinary for media storage.

### 2.6. User Documentation

User documentation is not planned for the initial release of RentEase. Future iterations may include a comprehensive user manual, online help, and FAQs to assist users with system functionalities and troubleshooting.

### 2.7. Assumptions and Dependencies

**Assumptions**

● **Internet Connectivity:** Users (Admin, Owner, Tenant) are assumed to have stable internet access to use the web application.

● **UPI-Enabled App:** Tenants are assumed to have a UPI-enabled mobile application for making rent payments via QR codes.

● **Browser Compatibility:** Users are assumed to use modern web browsers that support current web standards.

**Dependencies**

● **Google Gemini API:** The AI-powered features of RentEase are dependent on the availability and functionality of the Google Gemini API.

● **Cloudinary:** Media storage and delivery (e.g., property images, maintenance photos) are dependent on the Cloudinary service.

● **MongoDB Atlas:** The system relies on MongoDB Atlas for its database services.

● **External Email Service:** The notification system is dependent on an external email service (e.g., SMTP).

---

## 3. External Interface Requirements

### 3.1. User Interfaces

RentEase will provide a clean, intuitive, and responsive web-based user interface for each user role (Admin, Owner, Tenant). The UI will be built using React, TypeScript, and Tailwind CSS, ensuring a consistent design language and user experience across different devices. Key UI components include:

● **Login/Registration Pages:** Secure access for all user roles.

● **Dashboards:** Role-specific dashboards providing an overview of relevant information (e.g., property status for Owners, system health for Admins, upcoming rent for Tenants).

● **Forms:** Intuitive forms for data entry, such as adding new properties, assigning tenants, or submitting maintenance requests.

● **Navigation:** Clear and consistent navigation menus to access different sections of the application.

● **Visualizations:** Chart.js will be used to render financial analytics and other data visualizations for Owners and Admins.

### 3.2. Hardware Interfaces

RentEase is a web application and does not directly interface with specific hardware beyond standard client devices (desktops, laptops, smartphones, tablets) and network infrastructure. The system assumes the availability of a standard internet connection and a display device for user interaction.

### 3.3. Software Interfaces

● **Frontend-Backend Communication:** RESTful API communication between the React frontend and FastAPI backend using Axios.

● **Database Interface:** The FastAPI backend interfaces with MongoDB Atlas for data storage and retrieval.

● **AI Services:** Integration with Google Gemini API for AI-powered features.

● **Media Management:** Integration with Cloudinary for image and PDF storage and delivery.

● **Email Services:** Integration with an SMTP library (e.g., smtplib) for sending email notifications.

● **Payment Gateways:** Future integration with payment gateways like Razorpay/Stripe for automated payment processing.

### 3.4. Communications Interfaces

● **HTTP/HTTPS:** All client-server communication will occur over secure HTTP/HTTPS protocols.

● **JSON:** Data exchange between the frontend and backend will primarily use JSON format.

● **WebSockets:** The system shall use WebSockets as a mandatory communication mechanism for the real-time AI chat assistant and live system notifications. The connection shall support bidirectional message exchange, reconnection after temporary network failure, and delivery of authenticated messages only to the relevant user or role.

● **Email:** SMTP protocol for sending system notifications and alerts.

---

## 4. System Features

### 4.1. User Authentication & Role-Based Access

#### 4.1.1. Description and Priority

This feature handles secure user registration, authentication, and session management while enforcing Role-Based Access Control (RBAC) to restrict access based on user privileges (Admin, Owner, Tenant). This feature is **Critical** priority because it is the primary gateway for protecting sensitive user data and preventing unauthorized access to the application.

#### 4.1.2. Stimulus/Response Sequences

1. The user provides credentials (email and password) via the registration or login interface.
2. The system validates the input for format compliance and verifies credentials against the stored hash in the database.
3. Upon successful validation, the system generates a signed JWT and securely transmits it to the client via an HttpOnly cookie.
4. The system grants the user access to authorized routes and features based on their assigned role in the JWT.
5. Upon the user requesting logout, the system invalidates the session and clears the authentication token.

### 4.2. Property & Tenant Management

#### 4.2.1. Description and Priority

This feature allows Owners to manage their real estate portfolio, covering property listing, tenant assignment, and leasing lifecycle management. This feature is **High** priority because the platform cannot perform its primary function of property administration without the underlying data structures for properties and tenants.

#### 4.2.2. Stimulus/Response Sequences

6. The Owner logs in and navigates to the 'Add Property' interface.
7. The Owner inputs property details and uploads images, which the system transmits to the media service (Cloudinary).
8. The system validates the input, stores the property metadata and image URLs, and updates the Owner's dashboard.
9. The Owner selects a registered tenant and assigns them to the property, defining the lease start and rent terms.
10. The system links the tenant to the property record, effectively starting the tenancy period.

### 4.3. Rent Tracking & QR Payment Verification

#### 4.3.1. Description and Priority

This feature facilitates end-to-end rent collection by providing static UPI-based QR code generation for tenants and a verification workflow for Owners to confirm payments. This feature is **High** priority because financial integrity and accurate tracking are essential for user trust and successful rental management.

#### 4.3.2. Stimulus/Response Sequences

11. The system generates a unique static UPI QR code for each property and displays it to the assigned Tenant.
12. The Tenant makes a payment via an external UPI app and submits the transaction's UTR (Unique Transaction Reference) through the system.
13. The system records the payment as 'Pending' and notifies the Owner via an in-app notification.
14. The Owner reviews the UTR against their bank records and marks the payment as 'Verified' or 'Rejected' with a reason.
15. Upon verification, the system updates the rent status, records the transaction in the history, and generates a downloadable receipt for the Tenant.

#### 4.3.3. Functional Requirements

**REQ-RENT-001:** The system shall generate a unique static UPI QR code for each active property.

**REQ-RENT-002:** The system shall enable Tenants to view their current payment status and upcoming rent due dates.

**REQ-RENT-003:** The system shall allow Tenants to submit a payment record, including the mandatory UTR and payment date.

**REQ-RENT-004:** The system shall allow Owners to manually verify payments by comparing the submitted UTR with their verified financial data.

**REQ-RENT-005:** The system shall automatically generate and allow download of rent receipts upon successful payment verification.

**REQ-RENT-006:** The system shall maintain an immutable historical record of all rent transactions per tenant and per property.

### 4.4. AI-Powered Assistant & Analytics

#### 4.4.1. Description and Priority

This feature integrates the Google Gemini API to provide automated communication, complaint summarization, and monthly financial reporting to Owners and Admins. This feature is **Medium** priority because while it provides significant operational efficiency and competitive advantage, the core property management workflows remain operational without it.

#### 4.4.2. Stimulus/Response Sequences

16. The user (Owner or Tenant) interacts with the AI assistant through the chat interface.
17. The system transmits the user's query and relevant context (e.g., property/tenant details) to the Gemini API.
18. The Gemini API processes the input and returns a response, which the system displays to the user.
19. The system monitors maintenance and communication logs; when requested or scheduled, it aggregates data to generate a monthly report.
20. The system presents the report, including financial summaries and occupancy trends, to the Owner or Admin dashboard.

#### 4.4.3. Functional Requirements

**REQ-AI-001:** The system shall provide a domain-aware AI chat interface capable of answering common rental-related queries.

**REQ-AI-002:** The system shall automatically send AI-generated rent reminders to tenants via in-app notifications and email before the due date.

**REQ-AI-003:** The system shall utilize the Gemini API to analyze tenant complaints and provide concise, actionable summaries for the Owner.

**REQ-AI-004:** The system shall automatically generate and display monthly business reports, covering financial data, occupancy rates, and revenue analytics.

**REQ-AI-005:** The system shall maintain secure integration with the Google Gemini API, ensuring data privacy and correct API key handling.

### 4.5. Maintenance Request System

#### 4.5.1 Description and Priority

The Maintenance Request System enables a Tenant to report a problem affecting an assigned property and enables the responsible Owner to review, prioritize, assign, communicate, and close the request. The feature is **High** priority because unresolved maintenance can affect habitability, safety, tenant satisfaction, and the Owner's ability to manage the property. Each request shall receive a priority level using the following rule: **Critical** when the report indicates an immediate threat to life, personal safety, security, major water leakage, fire, gas, or loss of an essential service; **High** when the issue materially affects habitability or may cause significant property damage if not addressed promptly; **Medium** when the issue affects normal use but does not create an immediate safety or damage risk; and **Low** when the issue is minor, cosmetic, or suitable for routine servicing. The Tenant may suggest a priority, but the system shall calculate an initial priority from the selected category and keywords, and the Owner may adjust it with a recorded reason.

#### 4.5.2 Stimulus/Response Sequences

1. The Tenant selects the assigned property, enters a title and description, selects an issue category, optionally suggests a priority, and attaches photographs.
2. The system validates that the Tenant is assigned to the selected property, stores the request, calculates the initial priority, and sets the status to Open.
3. The system routes the request to the Owner associated with the property and sends an in-app notification through the authenticated WebSocket channel; an email notification shall be used when the Owner is offline or when configured as a fallback.
4. The Owner reviews the request, may change its priority, and changes the status to Acknowledged or In Progress.
5. The Owner may add a response, request additional information, or mark the request Resolved.
6. The Tenant receives each status or message update in real time, may confirm resolution, or may reopen the request with an explanation.
7. The system records the complete history, including timestamps, actors, status changes, priority changes, notifications, and uploaded evidence.

#### 4.5.3 Functional Requirements

**REQ-MNT-001:** The system shall allow an authenticated Tenant to create a maintenance request only for a property to which that Tenant is currently assigned.

**REQ-MNT-002:** The system shall require a non-empty title, description, issue category, and property identifier; it shall reject incomplete or invalid submissions with a clear error message.

**REQ-MNT-003:** The system shall accept optional image attachments, validate their file type and size, store them using the configured media service, and associate their URLs with the request.

**REQ-MNT-004:** The system shall assign an initial priority of Critical, High, Medium, or Low according to the safety, habitability, damage-risk, and routine-maintenance rules defined in Section 4.5.1.

**REQ-MNT-005:** The system shall set every newly accepted request to Open and record its creation timestamp, submitting Tenant, property, category, description, attachments, and calculated priority.

**REQ-MNT-006:** The system shall route each request to the Owner identified by the property record; if no responsible Owner exists, the system shall flag the request for Administrator attention and notify the Administrator.

**REQ-MNT-007:** The system shall notify the responsible Owner of a new request and shall include the request identifier, property, title, priority, submission time, and a link to the request details.

**REQ-MNT-008:** The system shall deliver new-request, status-change, priority-change, and Owner-message events through WebSockets to authorized connected users and shall prevent users from receiving another user's events.

**REQ-MNT-009:** The system shall provide the Owner with actions to acknowledge, start, comment on, reprioritize, resolve, and close a request. A priority change shall require a reason and shall be added to the request history.

**REQ-MNT-010:** The system shall notify the Tenant whenever the Owner changes the status, priority, or response content. If real-time delivery fails, the event shall remain available in the in-app notification list and shall be sent by email when configured.

**REQ-MNT-011:** The system shall allow the Tenant to view a chronological list of submitted requests with their status, priority, latest update, and evidence, and shall allow reopening only a request previously marked Resolved or Closed.

**REQ-MNT-012:** The system shall maintain an immutable audit history of request creation, routing, notifications, status changes, priority changes, messages, and closure details, including the user and timestamp for each event.

**REQ-MNT-013:** The system shall prevent unauthorized users from viewing, editing, or downloading maintenance requests and attachments belonging to another Tenant or property.

**REQ-MNT-014:** The system shall display an actionable error and preserve unsent form data when a request submission, attachment upload, notification, or WebSocket delivery fails.

---

## 5. Other Nonfunctional Requirements

### 5.1. Performance Requirements

● **Response Time:** The system shall respond to user requests (e.g., page loads, form submissions, API calls) within 2-3 seconds under normal load conditions.

● **Scalability:** The system shall be capable of supporting up to 100 concurrent users and managing data for 1000 properties and 5000 tenants without significant performance degradation.

● **Availability:** The system shall be available 99.5% of the time, excluding scheduled maintenance.

### 5.2. Safety Requirements

● The system shall implement robust error handling mechanisms to prevent data corruption or loss.

● The system shall provide clear and informative error messages to users.

● All critical data shall be backed up regularly to prevent permanent loss.

### 5.3. Security Requirements

● **Authentication:** User authentication shall be implemented using JWT (JSON Web Tokens) stored in HttpOnly cookies to mitigate Cross-Site Scripting (XSS) attacks.

● **Authorization:** Role-Based Access Control (RBAC) shall be enforced on both frontend and backend to ensure users only access authorized resources.

● **Data Protection:** All sensitive data (e.g., passwords) shall be stored in an encrypted format (e.g., Passlib with Argon2 hashing algorithms).

● **Input Validation:** Strict Pydantic models shall be used for input validation to prevent injection attacks and other malicious data inputs.

● **Environment Isolation:** Sensitive credentials (API keys, database URIs) shall be stored in environment variables (.env files) and not hardcoded.

● **Communication Security:** All data transmission between client and server shall be encrypted using HTTPS.

### 5.4. Software Quality Attributes

● **Reliability:** The system shall operate without critical failures for a minimum of 99.5% of its operational time.

● **Maintainability:** The codebase shall be well-documented, modular, and follow established coding standards to facilitate future enhancements and bug fixes.

● **Usability:** The user interface shall be intuitive and easy to navigate for all user roles, requiring minimal training.

● **Portability:** The web application shall be accessible and functional across different modern web browsers and devices.

### 5.5. Business Rules

● A property can only be assigned to one tenant at a time.

● Rent payments are due on the first day of each month.

● Maintenance requests must include a description; photo attachments are optional but recommended.

● Only Owners can assign tenants to properties.

● Only Admins can manage user roles.

---

## 6. Other Requirements

No additional specific requirements beyond those detailed in the preceding sections are identified at this time.

---

## Appendix A: Glossary

● **AI:** Artificial Intelligence

● **API:** Application Programming Interface

● **CRUD:** Create, Read, Update, Delete

● **FastAPI:** A modern, fast (high-performance) web framework for building APIs with Python 3.7+ based on standard Python type hints.

● **JWT:** JSON Web Token, a compact, URL-safe means of representing claims to be transferred between two parties.

● **LLM:** Large Language Model

● **MongoDB Atlas:** A global cloud database service for MongoDB.

● **Pydantic:** A Python library for data validation and settings management using Python type hints.

● **QR Code:** Quick Response Code, a type of matrix barcode.

● **RBAC:** Role-Based Access Control, a method of restricting system access based on the roles of individual users.

● **React:** A JavaScript library for building user interfaces.

● **SaaS:** Software as a Service, a software distribution model in which a third-party provider hosts applications and makes them available to customers over the Internet.

● **SRS:** Software Requirements Specification

● **Tailwind CSS:** A utility-first CSS framework for rapidly building custom user interfaces.

● **TypeScript:** A superset of JavaScript that adds static types.

● **UPI:** Unified Payments Interface, an instant real-time payment system developed by National Payments Corporation of India.

● **UTR:** Unique Transaction Reference, a unique number that identifies a transaction.

---

## Appendix B: Analysis Models

This section would typically contain visual analysis models such as Data Flow Diagrams (DFDs), Entity-Relationship Diagrams (ERDs), or Use Case Diagrams. For the purpose of this draft, we will provide a textual description of the database schema and data flow.

### Database Schema Description

RentEase utilizes a NoSQL document database (MongoDB Atlas) with the following primary collections:

● **Users Collection:** Stores user authentication and profile information. Fields include `_id`, `name`, `email`, `password` (hashed), `role` (`Admin`, `Owner`, `Tenant`), `profileImage`, `createdAt`.

● **Properties Collection:** Stores details about rental properties. Fields include `_id`, `ownerId` (reference to Users), `title`, `address` (object with `street`, `city`, `state`, `coordinates`), `rent`, `securityDeposit`, `type`, `status`, `images` (array of Cloudinary URLs), `paymentQrCode` (Cloudinary URL), `createdAt`.

● **Tenants Collection:** Stores tenant-specific information and their assigned property. Fields include `_id`, `userId` (reference to Users), `propertyId` (reference to Properties), `joiningDate`, `rentDueDate`, `leaseStart`, `leaseEnd`, `status`.

● **Payments Collection:** Records all rent transactions. Fields include `_id`, `tenantId` (reference to Tenants), `ownerId` (reference to Users), `propertyId` (reference to Properties), `amount`, `paymentDate`, `paymentMethod` (`UPI QR`), `transactionId` (UTR), `status`, `receiptURL` (Cloudinary URL).

● **Maintenance Collection:** Stores details of maintenance requests. Fields include `_id`, `tenantId` (reference to Tenants), `propertyId` (reference to Properties), `title`, `description`, `images` (array of Cloudinary URLs), `status`, `priority`, `createdAt`.

● **Notifications Collection:** Stores system notifications for users. Fields include `_id`, `userId` (reference to Users), `title`, `message`, `read`, `createdAt`.

### Data Flow Description

Data generally flows from the user interface, through the FastAPI backend, to the MongoDB Atlas database, and back. External services like Cloudinary and Google Gemini API are integrated into this flow:

21. **User Input:** Users interact with the React frontend, submitting data via forms (e.g., login, property creation, maintenance requests).

22. **Frontend Processing:** React components capture user input and send it to the FastAPI backend via Axios HTTP requests.

23. **Backend API (FastAPI):** The FastAPI application receives requests, validates data using Pydantic models, authenticates and authorizes users via JWT and RBAC, and processes business logic.

24. **Database Interaction (MongoDB Atlas):** The backend interacts with MongoDB Atlas to store, retrieve, update, or delete data based on the request.

25. **External Service Integration:**
    - **Cloudinary:** For image and PDF uploads (e.g., property images, maintenance photos, rent receipts), the backend sends files to Cloudinary and stores the resulting URLs in MongoDB.
    - **Google Gemini API:** For AI-powered features (e.g., chat assistant, complaint summarization, report generation), the backend sends relevant text data to the Gemini API and processes its responses.

26. **Response Generation:** The FastAPI backend constructs a response (e.g., success message, data, error) and sends it back to the frontend.

27. **Frontend Rendering:** The React frontend receives the response and updates the user interface accordingly, displaying data or notifications to the user.

---

## Appendix C: To Be Determined List

This section lists items that are currently undefined or subject to change and will be determined in future project phases.

● Specific third-party payment gateway provider for automated transactions.

● Detailed requirements for digital e-sign lease agreements.

● Exact scope and implementation details for WhatsApp Business API integration.

● Specific OCR (Optical Character Recognition) library or service for lease document parsing.

● Machine Learning model details for rent price prediction.

● Comprehensive user manual and online help content.

● Detailed UI/UX wireframes and mockups.
