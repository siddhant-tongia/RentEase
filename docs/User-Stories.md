# User Stories — RentEase

## Table of Contents

- [User Stories — RentEase](#user-stories--rentease)
  - [Table of Contents](#table-of-contents)
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

### US-1.1

**User Story:**
As a **new user**, I want to register with my name, email, and password, so that I can create an account on RentEase.

**Pre-requisite:**
None

**Acceptance Criteria:**
- Registration form validates email format and password strength.
- Duplicate email is rejected with a clear message.
- On success, account is created and user is redirected to login.

---

### US-1.2

**User Story:**
As a **registered user**, I want to log in with my email and password, so that I can access my dashboard.

**Pre-requisite:**
US-1.1

**Acceptance Criteria:**
- Valid credentials generate a JWT token stored in HttpOnly cookie.
- Invalid credentials show an error message.
- User is redirected to their role-specific dashboard.

---

### US-1.3

**User Story:**
As a **logged-in user**, I want to log out, so that my session is ended securely.

**Pre-requisite:**
US-1.2

**Acceptance Criteria:**
- JWT token is cleared on logout.
- User is redirected to the login page.
- Accessing protected routes after logout redirects to login.

---

### US-1.4

**User Story:**
As a **registered user**, I want the system to restrict access based on my role, so that I only see features meant for me.

**Pre-requisite:**
US-1.1

**Acceptance Criteria:**
- Admin, Owner, and Tenant each see different dashboard content.
- Accessing an unauthorized route shows a 403 error or redirects.

---

## 2. Property Management

### US-2.1

**User Story:**
As an **Owner**, I want to add a new property with details and images, so that I can list it on the platform.

**Pre-requisite:**
US-1.2, US-1.4

**Acceptance Criteria:**
- Form accepts title, address, rent amount, security deposit, and type.
- Images are uploaded and URLs are saved.
- New property shows up on the Owner's dashboard.

---

### US-2.2

**User Story:**
As an **Owner**, I want to edit my property details, so that I can keep the listing up to date.

**Pre-requisite:**
US-2.1

**Acceptance Criteria:**
- Owner can update any field (title, rent, address, images).
- Changes are saved and reflected immediately.

---

### US-2.3

**User Story:**
As an **Owner**, I want to delete a property listing, so that I can remove properties I no longer manage.

**Pre-requisite:**
US-2.1

**Acceptance Criteria:**
- Property is removed from the Owner's dashboard.
- Associated data is handled properly (tenant unlinked if any).

---

### US-2.4

**User Story:**
As an **Owner**, I want to see the status of each property (Vacant, Occupied, Under Maintenance), so that I can quickly know which ones need attention.

**Pre-requisite:**
US-2.1

**Acceptance Criteria:**
- Dashboard shows status badges for each property.
- Status updates automatically when a tenant is assigned or removed.

---

## 3. Tenant Management

### US-3.1

**User Story:**
As an **Owner**, I want to assign a registered tenant to one of my properties, so that I can start the tenancy.

**Pre-requisite:**
US-2.1, US-1.1 (tenant registered)

**Acceptance Criteria:**
- Owner selects a tenant and a vacant property.
- Lease start date and rent terms are defined during assignment.
- Property status changes from Vacant to Occupied.

---

### US-3.2

**User Story:**
As an **Owner**, I want to remove a tenant from a property, so that I can mark it as vacant when the lease ends.

**Pre-requisite:**
US-3.1

**Acceptance Criteria:**
- Tenant is unlinked from the property.
- Property status changes back to Vacant.

---

### US-3.3

**User Story:**
As a **Tenant**, I want to view my assigned property details, so that I know my rent amount and lease dates.

**Pre-requisite:**
US-3.1

**Acceptance Criteria:**
- Tenant dashboard shows property address, rent, lease start/end dates.
- If no property is assigned, a message is displayed.

---

## 4. Rent Tracking & Payment Verification

### US-4.1

**User Story:**
As a **Tenant**, I want to see a UPI QR code for my assigned property, so that I can make rent payments easily.

**Pre-requisite:**
US-3.1

**Acceptance Criteria:**
- A static UPI QR code is displayed for the active property.
- QR code is scannable by any UPI app.

---

### US-4.2

**User Story:**
As a **Tenant**, I want to submit my payment UTR number after paying, so that the Owner can verify it.

**Pre-requisite:**
US-4.1

**Acceptance Criteria:**
- Tenant enters UTR and payment date.
- Payment is recorded with status "Pending".
- Owner is notified about the new payment submission.

---

### US-4.3

**User Story:**
As an **Owner**, I want to verify or reject a tenant's payment using the UTR, so that I can confirm rent is received.

**Pre-requisite:**
US-4.2

**Acceptance Criteria:**
- Owner sees list of pending payments with UTR details.
- Owner can mark payment as "Verified" or "Rejected" (with reason).
- Tenant is notified of the result.

---

### US-4.4

**User Story:**
As a **Tenant**, I want to download a rent receipt after my payment is verified, so that I have proof of payment.

**Pre-requisite:**
US-4.3 (verified)

**Acceptance Criteria:**
- Receipt is auto-generated upon verification.
- Tenant can download it as a PDF.

---

### US-4.5

**User Story:**
As a **Tenant**, I want to view my full payment history, so that I can track all my past rent payments.

**Pre-requisite:**
US-4.2

**Acceptance Criteria:**
- Payment history shows date, amount, UTR, status, and receipt link.
- Records are sorted by date (newest first).

---

### US-4.6

**User Story:**
As an **Owner**, I want to see a payment overview for all my properties, so that I can track which tenants have paid.

**Pre-requisite:**
US-4.2

**Acceptance Criteria:**
- Dashboard shows payment status per property per month.
- Overdue payments are highlighted.

---

## 5. Maintenance Request System

### US-5.1

**User Story:**
As a **Tenant**, I want to submit a maintenance request with a title, description, category, and photos, so that my property issue gets reported.

**Pre-requisite:**
US-3.1

**Acceptance Criteria:**
- Form requires title, description, and category.
- Photos are optional but can be attached.
- Request is created with status "Open" and auto-calculated priority.

---

### US-5.2

**User Story:**
As a **Tenant**, I want the system to assign a priority (Critical / High / Medium / Low) based on the issue category, so that urgent problems are flagged automatically.

**Pre-requisite:**
US-5.1

**Acceptance Criteria:**
- Priority is calculated from category and keywords.
- Safety/habitability issues get Critical or High priority.
- Cosmetic/routine issues get Medium or Low priority.

---

### US-5.3

**User Story:**
As an **Owner**, I want to receive a notification when a tenant submits a maintenance request, so that I can review it promptly.

**Pre-requisite:**
US-5.1, US-6.1

**Acceptance Criteria:**
- In-app notification is sent via WebSocket.
- Email notification is sent as a fallback.
- Notification includes request title, property, and priority.

---

### US-5.4

**User Story:**
As an **Owner**, I want to acknowledge and update the status of a maintenance request (Acknowledged → In Progress → Resolved), so that the tenant knows it is being handled.

**Pre-requisite:**
US-5.1

**Acceptance Criteria:**
- Owner can change status step by step.
- Each status change is recorded with timestamp.
- Tenant is notified of every status change.

---

### US-5.5

**User Story:**
As an **Owner**, I want to adjust the priority of a request with a reason, so that I can correctly reflect the urgency.

**Pre-requisite:**
US-5.2

**Acceptance Criteria:**
- Owner can change priority from the request detail page.
- A reason field is mandatory for priority changes.
- Change is recorded in the audit trail.

---

### US-5.6

**User Story:**
As a **Tenant**, I want to confirm or reopen a resolved request, so that I can report if the issue is not actually fixed.

**Pre-requisite:**
US-5.4 (resolved)

**Acceptance Criteria:**
- Tenant sees "Confirm" and "Reopen" buttons on resolved requests.
- Confirming moves status to "Closed".
- Reopening requires an explanation and moves status back to "In Progress".

---

### US-5.7

**User Story:**
As a **Tenant**, I want to view all my submitted maintenance requests with their current status, so that I can track progress.

**Pre-requisite:**
US-5.1

**Acceptance Criteria:**
- List shows title, status, priority, and last updated date.
- Tenant can click on a request to see full details and history.

---

## 6. Notifications

### US-6.1

**User Story:**
As a **user**, I want to receive real-time in-app notifications for important events, so that I stay updated without refreshing the page.

**Pre-requisite:**
US-1.2

**Acceptance Criteria:**
- Notifications are delivered via WebSocket when user is online.
- A notification bell icon shows unread count.

---

### US-6.2

**User Story:**
As a **user**, I want to receive email notifications when I am offline, so that I don't miss important updates.

**Pre-requisite:**
US-1.1

**Acceptance Criteria:**
- Email is sent via SMTP when WebSocket delivery fails.
- Email contains the event details and a link to the app.

---

### US-6.3

**User Story:**
As a **user**, I want to mark notifications as read, so that I can keep my notification list organized.

**Pre-requisite:**
US-6.1

**Acceptance Criteria:**
- Clicking a notification marks it as read.
- Unread count updates accordingly.

---

### US-6.4

**User Story:**
As a **Tenant**, I want to receive a rent reminder before the due date, so that I don't forget to pay on time.

**Pre-requisite:**
US-3.1, US-6.1

**Acceptance Criteria:**
- Reminder is sent a few days before the due date.
- Reminder appears as both an in-app notification and an email.

---

## 7. AI-Powered Assistant & Analytics

### US-7.1

**User Story:**
As a **user**, I want to chat with an AI assistant about rental-related queries, so that I can get quick answers without contacting support.

**Pre-requisite:**
US-1.2

**Acceptance Criteria:**
- Chat interface is available from the dashboard.
- AI responds with context-aware answers using property/tenant data.
- Responses are powered by Google Gemini API.

---

### US-7.2

**User Story:**
As an **Owner**, I want the AI to summarize tenant complaints, so that I can quickly understand the key issues.

**Pre-requisite:**
US-5.1, US-7.1

**Acceptance Criteria:**
- Owner can view an AI-generated summary for maintenance requests.
- Summary highlights the main problem and suggested action.

---

### US-7.3

**User Story:**
As an **Owner**, I want to see a monthly business report with financial data and occupancy rates, so that I can track my rental business performance.

**Pre-requisite:**
US-4.2, US-2.1

**Acceptance Criteria:**
- Report shows total revenue, pending payments, and occupancy percentage.
- Report is auto-generated and viewable from the dashboard.

---

## 8. Admin Panel

### US-8.1

**User Story:**
As an **Admin**, I want to view and manage all registered users, so that I can maintain platform integrity.

**Pre-requisite:**
US-1.4 (admin role)

**Acceptance Criteria:**
- Admin can see a list of all users with their roles.
- Admin can suspend or delete user accounts.

---

### US-8.2

**User Story:**
As an **Admin**, I want to view system-wide analytics (total users, properties, revenue), so that I can monitor platform health.

**Pre-requisite:**
US-8.1

**Acceptance Criteria:**
- Dashboard shows key metrics with charts.
- Data updates in real time or on page refresh.

---

### US-8.3

**User Story:**
As an **Admin**, I want to assign or change a user's role, so that I can manage who has Owner or Tenant access.

**Pre-requisite:**
US-8.1

**Acceptance Criteria:**
- Admin can change a user's role from a dropdown.
- Role change takes effect on the user's next login.

---

*Prepared by Team RentEase — SGSITS, 2026*
