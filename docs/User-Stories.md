# User Stories — RentEase

## Table of Contents

- [1. User Authentication & Registration](#1-user-authentication--registration)
- [2. Owner Property Management](#2-owner-property-management)
- [3. Tenant Property Browsing](#3-tenant-property-browsing)
- [4. Authorization & Access Control](#4-authorization--access-control)
- [5. User Interface & Navigation](#5-user-interface--navigation)
- [6. Administrator Owner Verification](#6-administrator-owner-verification)

---

## 1. User Authentication & Registration

### US-1.1

**User Story:**
As a **new user**, I want to register with my credentials as an owner, so that I can manage properties.

**Pre-requisite:**
User is on the registration page.

**Acceptance Criteria:**
- Registration form collects name, email, phone number, password, role, and an ownership proof document.
- Name must be between 2 and 50 characters.
- Email must be in a valid format and unique.
- Phone number must be at least 10 digits and unique across all accounts.
- Password must be at least 8 characters (enforced on frontend and backend).
- Duplicate email is rejected with "Email already registered".
- Duplicate phone is rejected with "Phone number already registered".
- Owners must upload a proof document (JPG, PNG, WebP, or PDF up to 5MB).
- On success, account is created with status "pending" and the owner is presented with the Verification Status Card.
- Password is hashed using Argon2 before storage.

---

### US-1.2

**User Story:**
As a **new user**, I want to register with my credentials as a tenant, so that I can browse properties.

**Pre-requisite:**
User is on the registration page.

**Acceptance Criteria:**
- Registration form defaults the role selector to "tenant".
- Form collects name, email, phone number, and password.
- No document upload is required for tenants.
- Phone number must be at least 10 digits and unique.
- On success, a confirmation message is shown with a link to login.
- Form fields are cleared after successful registration.

---

### US-1.3

**User Story:**
As a **registered user**, I want to log in with my credentials, so that I can securely access my dashboard.

**Pre-requisite:**
User has successfully registered an account.

**Acceptance Criteria:**
- Login form provides toggle tabs between Email and Phone login modes.
- Valid credentials generate a JWT stored in an HttpOnly cookie.
- Owner is redirected to the Owner Dashboard.
- Tenant is redirected to the Browse Properties page.
- Admin is redirected to the Admin Dashboard.
- Unverified owners (pending) receive: "Your account is pending verification. Please wait for admin approval."
- Rejected owners receive: "Your verification was rejected. Please re-register with valid documents."
- Invalid credentials show "Invalid credentials."
- Empty fields show "Please fill in all fields."
- Submit button shows "Logging in…" while processing.

---

### US-1.4

**User Story:**
As a **logged-in user**, I want my session to persist, so that I stay logged in after a refresh.

**Pre-requisite:**
User is successfully logged into the system.

**Acceptance Criteria:**
- On application load, the system calls the current-user endpoint to check the session.
- If the cookie is valid, user state is restored automatically.
- If the cookie is expired or missing, the user is treated as unauthenticated.
- A loading state is shown while the session check is in progress.

---

### US-1.5

**User Story:**
As a **logged-in user**, I want to log out safely, so that I avoid accidental session termination.

**Pre-requisite:**
User is successfully logged into the system.

**Acceptance Criteria:**
- Clicking Logout shows a browser confirmation: "Are you sure you want to logout?"
- Clicking Cancel keeps the user logged in.
- Clicking OK calls the logout endpoint, which clears the access_token cookie if present (the backend endpoint itself does not require authentication), and redirects to login.
- Accessing protected routes after logout redirects to login.

---

### US-1.6

**User Story:**
As a **new user**, I want strict password validation, so that my account remains secure.

**Pre-requisite:**
User is on the registration page.

**Acceptance Criteria:**
- Frontend checks password is at least 8 characters before submitting.
- If too short, "Password must be at least 8 characters long." is shown without an API call.
- Backend schema also enforces minimum length of 8 via Pydantic validation.

---

### US-1.7

**User Story:**
As an **owner**, I want to view my verification status and refresh it in real time, so that I know when my account has been approved.

**Pre-requisite:**
Owner has submitted registration with an ownership proof document.

**Acceptance Criteria:**
- Upon owner registration, the form is replaced by a Verification Status Card displaying the account email.
- The card displays a status badge: "Pending Admin Review" while under evaluation.
- Clicking "Refresh Status" queries `/api/auth/status` and updates the badge without a full page reload.
- Once the administrator approves the account, clicking "Refresh Status" updates the badge to "Approved" and displays a "Proceed to Login" button.
- If rejected, the card indicates rejection and offers a "Register Again" button.

---

### US-1.8

**User Story:**
As a **registered user**, I want to log in using either my phone number or email, so that I have flexible sign-in options.

**Pre-requisite:**
User has a registered account with an email and phone number.

**Acceptance Criteria:**
- The login page provides distinct toggle buttons for "Email" and "Phone".
- Selecting "Email" presents an email input field and password field.
- Selecting "Phone" presents a phone number input field and password field.
- Submitting either mode authenticates the user against their respective unique identifier in MongoDB.
- Both modes securely set the HttpOnly authentication cookie upon successful credential verification.

---

## 2. Owner Property Management

### US-2.1

**User Story:**
As a **property owner**, I want to add property details, so that my listing appears in my portfolio.

**Pre-requisite:**
User is logged in as an Owner.

**Acceptance Criteria:**
- Form collects: title (optional), address (required), property type (apartment/house/room/other), monthly rent (required, > 0), availability (available/occupied), description (optional).
- Frontend validates address is not empty and rent is greater than 0.
- On success, user is redirected to the property list.
- On validation error, backend error messages are displayed.

---

### US-2.2

**User Story:**
As a **property owner**, I want to view my property list, so that I can monitor my portfolio.

**Pre-requisite:**
User is logged in as an Owner and has added properties.

**Acceptance Criteria:**
- Each property card shows title (or "Untitled Property"), address, type, rent, and availability badge.
- Each card has View Details, Edit, and Delete action buttons.
- An "+ Add Property" button is visible in the page header.
- If no properties exist, an empty state message with "Add Your First Property" link is shown.
- A loading message is shown while fetching.

---

### US-2.3

**User Story:**
As a **property owner**, I want to view specific property details, so that I can review its information.

**Pre-requisite:**
User is logged in as an Owner with existing properties.

**Acceptance Criteria:**
- All fields are displayed: title, address, type, monthly rent (₹), availability badge, description.
- Edit and Delete buttons are available.
- A "Back to Properties" link is provided.
- Invalid property ID shows "Invalid property ID." error.
- Nonexistent property shows "Property not found." error.

---

### US-2.4

**User Story:**
As a **property owner**, I want to edit a property, so that my listing stays accurate.

**Pre-requisite:**
User is logged in as an Owner with existing properties.

**Acceptance Criteria:**
- Form is pre-populated with the property's current values.
- All fields can be modified.
- Same validation rules as property creation apply.
- On success, user is redirected to the property list.
- Page heading shows "Edit Property" instead of "Add New Property".

---

### US-2.5

**User Story:**
As a **property owner**, I want to delete a property safely, so that I can remove old listings.

**Pre-requisite:**
User is logged in as an Owner with existing properties.

**Acceptance Criteria:**
- Clicking Delete shows a browser confirmation: "Are you sure you want to delete this property?"
- Clicking Cancel keeps the property.
- Clicking OK permanently removes the property.
- Deleted property no longer appears in the owner's list or tenant's available list.

---

### US-2.6

**User Story:**
As a **property owner**, I want to view a dashboard summary, so that I get a quick portfolio overview.

**Pre-requisite:**
User is logged in as an Owner.

**Acceptance Criteria:**
- Dashboard displays the owner's email and role.
- Dashboard shows the total number of properties owned.
- A "Manage Properties" button links to the property list page.

---

### US-2.7

**User Story:**
As a **property owner**, I want to upload property images, so that my listing is more attractive and descriptive to potential tenants.

**Pre-requisite:**
User is logged in as an Owner and creating or editing a property.

**Acceptance Criteria:**
- Form includes an image upload area supporting up to 3 image files (JPG, PNG, WebP ≤ 5MB each).
- Selected images are previewed in an interactive grid with individual remove ("✕") buttons.
- A "+ Add" button is visible when fewer than 3 images are selected, and hidden when 3 images are reached.
- Images are uploaded to Cloudinary, and their secure URLs are saved with the property document.
- In edit mode, existing images can be individually removed or supplemented with new uploads.
- Property cards render the first image as a thumbnail (or a "No image available" placeholder).
- The property details page renders an image carousel with navigation controls.

---

## 3. Tenant Property Browsing

### US-3.1

**User Story:**
As a **tenant**, I want to browse available properties, so that I can find a suitable rental.

**Pre-requisite:**
User is logged in as a Tenant.

**Acceptance Criteria:**
- Only properties with availability "available" are shown.
- Each card shows title, address, type, rent, availability badge, and top image thumbnail (or placeholder).
- Each card has only a "View Details" button (no edit/delete).
- If no available properties exist, a friendly message is shown: "No available properties at the moment."
- Owner ID is not exposed in the response.

---

### US-3.2

**User Story:**
As a **tenant**, I want to view property details, so that I can make an informed decision.

**Pre-requisite:**
User is logged in as a Tenant and navigating the properties list.

**Acceptance Criteria:**
- All fields are displayed: title, address, type, monthly rent (₹), availability badge, description.
- No edit or delete buttons are shown.
- A "Back to Properties" link navigates to the tenant's property list.
- If property is not found or no longer available, an appropriate error is shown.

---

### US-3.3

**User Story:**
As a **tenant**, I want to view property photos and the owner's direct phone number, so that I can evaluate the property and contact the owner.

**Pre-requisite:**
User is logged in as a Tenant and viewing a property's detail page.

**Acceptance Criteria:**
- An interactive image carousel displays property images at the top of the detail page.
- For multiple images, previous ("◀") and next ("▶") buttons and dot indicators allow carousel navigation.
- A dedicated "Contact Owner" section displays the owner's name and telephone number.
- The phone number is rendered as a clickable `tel:` link for direct calling on mobile and supported devices.

---

## 4. Authorization & Access Control

### US-4.1

**User Story:**
As the **system**, I want to reject unauthenticated requests, so that sensitive data remains secure.

**Pre-requisite:**
The system is running and receiving API requests.

**Acceptance Criteria:**
- Requests without the authentication cookie receive a 401 response.
- Requests with an expired JWT receive a 401 response.
- Requests with a tampered JWT receive a 401 response.
- Unauthenticated users on the frontend are redirected to login.

---

### US-4.2

**User Story:**
As the **system**, I want to enforce role-based access, so that users only access permitted features.

**Pre-requisite:**
Users are logged in and interacting with protected endpoints.

**Acceptance Criteria:**
- A tenant calling owner-only endpoints receives a 403 response.
- An owner calling tenant-only endpoints receives a 403 response.
- On the frontend, accessing a route with the wrong role redirects to home.
- The navbar only shows links relevant to the current user's role.

---

### US-4.3

**User Story:**
As the **system**, I want to isolate owner data, so that owners cannot access others' properties.

**Pre-requisite:**
Multiple owners exist with their respective properties.

**Acceptance Criteria:**
- Listing returns only properties where owner_id matches the authenticated user.
- Viewing, updating, or deleting another owner's property returns 404.
- An owner cannot see another owner's property count or details.

---

## 5. User Interface & Navigation

### US-5.1

**User Story:**
As a **user**, I want role-specific navigation, so that my interface is uncluttered.

**Pre-requisite:**
User is interacting with the application interface.

**Acceptance Criteria:**
- Unauthenticated users see Login and Register links.
- Owners see Dashboard and My Properties links, plus a Logout button.
- Tenants see Browse Properties link, plus a Logout button.
- Administrators see the Admin Panel link, plus a Logout button.
- The RentEase brand link always navigates to the home page.

---

### US-5.2

**User Story:**
As a **user**, I want a welcoming home page with relevant actions, so that I know what to do.

**Pre-requisite:**
User is visiting the root URL of the platform.

**Acceptance Criteria:**
- Unauthenticated visitors see Login and Register buttons.
- Logged-in owners see a "Go to Dashboard" button.
- Logged-in tenants see a "Browse Properties" button.

---

### US-5.3

**User Story:**
As a **user**, I want a friendly 404 page, so that I can easily return to safety.

**Pre-requisite:**
User navigates to an undefined route.

**Acceptance Criteria:**
- Any undefined route shows a "404 — Page Not Found" page.
- A "Go Home" button links back to the home page.

---

### US-5.4

**User Story:**
As a **user**, I want clear network error messages, so that I understand connection issues.

**Pre-requisite:**
User attempts an action while the backend is unavailable.

**Acceptance Criteria:**
- If the backend is not running, the message "Cannot connect to server. Please make sure the backend is running." is displayed.
- The application does not crash on network errors.

---

## 6. Administrator Owner Verification

### US-6.1

**User Story:**
As an **administrator**, I want to review submitted owner verifications and approve or reject them, so that only authentic property owners can list rentals.

**Pre-requisite:**
User is logged in as an Administrator.

**Acceptance Criteria:**
- Navigating to `/admin/dashboard` displays a list of all owners with "pending" status.
- Each pending item shows the owner's name, email, phone number, and a "View Document" button.
- Clicking "View Document" opens the uploaded ownership proof directly from Cloudinary in a new tab.
- Clicking "Approve" updates the owner's status to "approved" and removes the card from the pending queue.
- Clicking "Reject" updates the owner's status to "rejected".
- If no verifications are pending, an empty state message is displayed.

---

*Prepared by Team RentEase — SGSITS, 2026*
