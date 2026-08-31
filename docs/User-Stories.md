# User Stories — RentEase

**Version 1.0**
**Date:** August 31, 2026

> This document lists the user stories for RentEase, derived from the [Software Requirements Specification (SRS)](SRS.md) and the [UML Diagrams](UML-Diagrams/). Each story follows the standard format:
>
> *"As a [role], I want [feature], so that [benefit]."*

---

## Table of Contents

- [1. User Authentication \& Registration](#1-user-authentication--registration)
- [2. Property Management](#2-property-management)
- [3. Tenant Management](#3-tenant-management)
- [4. Rent Tracking \& Payment Verification](#4-rent-tracking--payment-verification)
- [5. Maintenance Request System](#5-maintenance-request-system)
- [6. Notifications](#6-notifications)
- [7. AI-Powered Assistant \& Analytics](#7-ai-powered-assistant--analytics)
- [8. Admin Panel](#8-admin-panel)

---

## 1. User Authentication & Registration

| ID | User Story | Priority | Acceptance Criteria |
|----|-----------|----------|---------------------|
| US-1.1 | As a **new user**, I want to register with my name, email, and password, so that I can create an account on RentEase. | Critical | - Registration form validates email format and password strength. <br> - Duplicate email is rejected with a clear message. <br> - On success, account is created and user is redirected to login. |
| US-1.2 | As a **registered user**, I want to log in with my email and password, so that I can access my dashboard. | Critical | - Valid credentials generate a JWT token stored in HttpOnly cookie. <br> - Invalid credentials show an error message. <br> - User is redirected to their role-specific dashboard (Admin / Owner / Tenant). |
| US-1.3 | As a **logged-in user**, I want to log out, so that my session is ended securely. | Critical | - JWT token is cleared on logout. <br> - User is redirected to the login page. <br> - Accessing protected routes after logout redirects to login. |
| US-1.4 | As a **registered user**, I want the system to restrict access based on my role, so that I can only see features meant for me. | Critical | - Admin, Owner, and Tenant each see different dashboard content. <br> - Accessing an unauthorized route shows a 403 error or redirects. |

---

## 2. Property Management

| ID | User Story | Priority | Acceptance Criteria |
|----|-----------|----------|---------------------|
| US-2.1 | As an **Owner**, I want to add a new property with details and images, so that I can list it on the platform. | High | - Form accepts title, address, rent amount, security deposit, and type. <br> - Images are uploaded to Cloudinary and URLs are saved. <br> - New property appears on the Owner's dashboard. |
| US-2.2 | As an **Owner**, I want to edit my property details, so that I can keep the listing up to date. | High | - Owner can update any field (title, rent, address, images). <br> - Changes are saved and reflected immediately. |
| US-2.3 | As an **Owner**, I want to delete a property listing, so that I can remove properties I no longer manage. | High | - Property is removed from the Owner's dashboard. <br> - Associated data is handled properly (tenant unlinked if any). |
| US-2.4 | As an **Owner**, I want to see the status of each property (Vacant, Occupied, Under Maintenance), so that I can quickly know which ones need attention. | High | - Dashboard shows status badges for each property. <br> - Status updates automatically when a tenant is assigned or removed. |

---

## 3. Tenant Management

| ID | User Story | Priority | Acceptance Criteria |
|----|-----------|----------|---------------------|
| US-3.1 | As an **Owner**, I want to assign a registered tenant to one of my properties, so that I can start the tenancy. | High | - Owner selects a tenant and a vacant property. <br> - Lease start date and rent terms are defined during assignment. <br> - Property status changes from Vacant to Occupied. |
| US-3.2 | As an **Owner**, I want to remove a tenant from a property, so that I can mark it as vacant when the lease ends. | High | - Tenant is unlinked from the property. <br> - Property status changes back to Vacant. |
| US-3.3 | As a **Tenant**, I want to view my assigned property details, so that I know my rent amount and lease dates. | High | - Tenant dashboard shows property address, rent, lease start/end dates. <br> - If no property is assigned, a message is displayed. |

---

## 4. Rent Tracking & Payment Verification

| ID | User Story | Priority | Acceptance Criteria |
|----|-----------|----------|---------------------|
| US-4.1 | As a **Tenant**, I want to see a UPI QR code for my assigned property, so that I can make rent payments easily. | High | - A static UPI QR code is displayed for the active property. <br> - QR code is scannable by any UPI app. |
| US-4.2 | As a **Tenant**, I want to submit my payment UTR number after paying, so that the Owner can verify it. | High | - Tenant enters UTR and payment date. <br> - Payment is recorded with status "Pending". <br> - Owner is notified about the new payment submission. |
| US-4.3 | As an **Owner**, I want to verify or reject a tenant's payment using the UTR, so that I can confirm rent is received. | High | - Owner sees list of pending payments with UTR details. <br> - Owner can mark payment as "Verified" or "Rejected" (with reason). <br> - Tenant is notified of the result. |
| US-4.4 | As a **Tenant**, I want to download a rent receipt after my payment is verified, so that I have proof of payment. | High | - Receipt is auto-generated upon verification. <br> - Tenant can download it as a PDF. |
| US-4.5 | As a **Tenant**, I want to view my full payment history, so that I can track all my past rent payments. | Medium | - Payment history shows date, amount, UTR, status, and receipt link. <br> - Records are sorted by date (newest first). |
| US-4.6 | As an **Owner**, I want to see a payment overview for all my properties, so that I can track which tenants have paid. | Medium | - Dashboard shows payment status per property per month. <br> - Overdue payments are highlighted. |

---

## 5. Maintenance Request System

| ID | User Story | Priority | Acceptance Criteria |
|----|-----------|----------|---------------------|
| US-5.1 | As a **Tenant**, I want to submit a maintenance request with a title, description, category, and photos, so that my property issue gets reported. | High | - Form requires title, description, and category. <br> - Photos are optional but can be attached. <br> - Request is created with status "Open" and auto-calculated priority. |
| US-5.2 | As a **Tenant**, I want the system to assign a priority (Critical / High / Medium / Low) based on the issue category, so that urgent problems are flagged automatically. | High | - Priority is calculated from category and keywords. <br> - Safety/habitability issues get Critical or High priority. <br> - Cosmetic/routine issues get Medium or Low priority. |
| US-5.3 | As an **Owner**, I want to receive a notification when a tenant submits a maintenance request, so that I can review it promptly. | High | - In-app notification is sent via WebSocket. <br> - Email notification is sent as a fallback. <br> - Notification includes request title, property, and priority. |
| US-5.4 | As an **Owner**, I want to acknowledge and update the status of a maintenance request (Acknowledged → In Progress → Resolved), so that the tenant knows it is being handled. | High | - Owner can change status step by step. <br> - Each status change is recorded with timestamp. <br> - Tenant is notified of every status change. |
| US-5.5 | As an **Owner**, I want to adjust the priority of a request with a reason, so that I can correctly reflect the urgency. | Medium | - Owner can change priority from the request detail page. <br> - A reason field is mandatory for priority changes. <br> - Change is recorded in the audit trail. |
| US-5.6 | As a **Tenant**, I want to confirm or reopen a resolved request, so that I can report if the issue is not actually fixed. | High | - Tenant sees "Confirm" and "Reopen" buttons on resolved requests. <br> - Confirming moves status to "Closed". <br> - Reopening requires an explanation and moves status back to "In Progress". |
| US-5.7 | As a **Tenant**, I want to view all my submitted maintenance requests with their current status, so that I can track progress. | Medium | - List shows title, status, priority, and last updated date. <br> - Tenant can click on a request to see full details and history. |

---

## 6. Notifications

| ID | User Story | Priority | Acceptance Criteria |
|----|-----------|----------|---------------------|
| US-6.1 | As a **user**, I want to receive real-time in-app notifications for important events, so that I stay updated without refreshing the page. | Medium | - Notifications are delivered via WebSocket when user is online. <br> - A notification bell icon shows unread count. |
| US-6.2 | As a **user**, I want to receive email notifications when I am offline, so that I don't miss important updates. | Medium | - Email is sent via SMTP when WebSocket delivery fails. <br> - Email contains the event details and a link to the app. |
| US-6.3 | As a **user**, I want to mark notifications as read, so that I can keep my notification list organized. | Low | - Clicking a notification marks it as read. <br> - Unread count updates accordingly. |
| US-6.4 | As a **Tenant**, I want to receive a rent reminder before the due date, so that I don't forget to pay on time. | Medium | - Reminder is sent a few days before the due date. <br> - Reminder appears as both an in-app notification and an email. |

---

## 7. AI-Powered Assistant & Analytics

| ID | User Story | Priority | Acceptance Criteria |
|----|-----------|----------|---------------------|
| US-7.1 | As a **user**, I want to chat with an AI assistant about rental-related queries, so that I can get quick answers without contacting support. | Medium | - Chat interface is available from the dashboard. <br> - AI responds with context-aware answers using property/tenant data. <br> - Responses are powered by Google Gemini API. |
| US-7.2 | As an **Owner**, I want the AI to summarize tenant complaints, so that I can quickly understand the key issues. | Medium | - Owner can view an AI-generated summary for maintenance requests. <br> - Summary highlights the main problem and suggested action. |
| US-7.3 | As an **Owner**, I want to see a monthly business report with financial data and occupancy rates, so that I can track my rental business performance. | Medium | - Report shows total revenue, pending payments, and occupancy percentage. <br> - Report is auto-generated and viewable from the dashboard. |

---

## 8. Admin Panel

| ID | User Story | Priority | Acceptance Criteria |
|----|-----------|----------|---------------------|
| US-8.1 | As an **Admin**, I want to view and manage all registered users, so that I can maintain platform integrity. | High | - Admin can see a list of all users with their roles. <br> - Admin can suspend or delete user accounts. |
| US-8.2 | As an **Admin**, I want to view system-wide analytics (total users, properties, revenue), so that I can monitor platform health. | Medium | - Dashboard shows key metrics with charts. <br> - Data updates in real time or on page refresh. |
| US-8.3 | As an **Admin**, I want to assign or change a user's role, so that I can manage who has Owner or Tenant access. | High | - Admin can change a user's role from a dropdown. <br> - Role change takes effect on the user's next login. |

---

## Story Map Overview

```
                    ┌─────────────────────────────────────────────────────────┐
                    │                      RentEase                          │
                    └─────────────────────────────────────────────────────────┘
                                            │
         ┌──────────────┬───────────────┬───┴────────────┬──────────────┐
         ▼              ▼               ▼                ▼              ▼
   ┌──────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌─────────┐
   │   Auth   │  │  Property  │  │  Payment   │  │Maintenance │  │  Admin  │
   │ US-1.x   │  │  US-2.x    │  │  US-4.x    │  │  US-5.x    │  │ US-8.x  │
   └──────────┘  │  US-3.x    │  └────────────┘  └────────────┘  └─────────┘
                 └────────────┘
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
        ┌───────────┐       ┌────────────┐
        │   Notif.  │       │  AI Asst.  │
        │  US-6.x   │       │  US-7.x    │
        └───────────┘       └────────────┘
```

---

## Traceability Matrix

This table maps each user story back to the SRS requirements and UML diagrams it relates to.

| User Story | SRS Section | UML Diagram Reference |
|------------|-------------|----------------------|
| US-1.1 – US-1.4 | 4.1 (Auth & RBAC) | Use Case Diagram, Sequence Diagram (Auth flow), State Chart (User Account) |
| US-2.1 – US-2.4 | 4.2 (Property & Tenant Mgmt) | Class Diagram (Property entity), Activity Diagram, State Chart (Property) |
| US-3.1 – US-3.3 | 4.2 (Property & Tenant Mgmt) | Class Diagram (Tenant entity), State Chart (Tenant/Lease) |
| US-4.1 – US-4.6 | 4.3 (Rent Tracking & QR Payment) | Sequence Diagram (Payment flow), Activity Diagram (Payment), State Chart (Payment) |
| US-5.1 – US-5.7 | 4.5 (Maintenance Request System) | Sequence Diagram (Maintenance flow), Activity Diagram (Maintenance), State Chart (Maintenance) |
| US-6.1 – US-6.4 | 3.4 (Communications), 4.4 | Component Diagram, State Chart (Notification) |
| US-7.1 – US-7.3 | 4.4 (AI Assistant & Analytics) | Component Diagram (Gemini API), Use Case Diagram |
| US-8.1 – US-8.3 | 2.3 (User Classes), 4.1 | Use Case Diagram (Admin actor), State Chart (User Account) |

---

*Prepared by Team RentEase — SGSITS, 2026*
