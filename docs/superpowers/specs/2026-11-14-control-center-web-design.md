# VYHIR CivilERP Web Control Center — Architecture & Design Specification

**Document Version:** 1.0  
**Date:** 2026-11-14  
**Primary Brand Color:** Emerald Green (`#0A5C36`)  
**Design Reference:** Industrial High-Density Civil Construction Control Center UI (provided in reference mockups)

---

## 1. Executive Summary & Goals

VYHIR CivilERP is a specialized multi-tenant SaaS ERP for civil and linear infrastructure (highways, railways, bridges, earthworks). While field supervisors use the Flutter mobile app to punch attendance and submit daily progress reports with GPS, chainages, and watermarked photos, the **Web Application serves as the Operations Control Center**.

The Web Control Center fulfills two essential personas:
1. **Platform Super Admin (Software Vendor / Your Company)**:
   - Secure operator access (isolated from tenant organizations).
   - Provision new client organizations (tenants).
   - Create initial Organization Administrator credentials (username + master passcode).
   - Global multi-tenant health & site monitoring.
2. **Organization Admin (Civil Contracting Companies)**:
   - Manage Projects with linear infrastructure parameters (Start/End Chainages, Start/End GPS coordinates).
   - Manage 2-Level Activity Master (Parent Activities e.g. Earthwork $\rightarrow$ Subactivities e.g. Embankment Compaction).
   - Manage Workforce / Employees: Direct provisioning of employee accounts with username, initial password, and role assignments.
   - Field Operations Monitoring: Real-time stream of daily submissions, geotagged photos inspection dossier, and attendance tracking with full Excel/CSV export capabilities.

---

## 2. Information Architecture & Navigation

### 2.1 Unified Login (`/login`)
- Clean split card with architectural grid aesthetic and Emerald Green `#0A5C36` accent.
- Mode Selector: `Organization Admin` vs `Platform Super Admin`.
- Accepts either `username` or `email` along with password.
- Automatic session routing:
  - If user is Platform Admin $\rightarrow$ `/platform`
  - If user is Organization Admin/Manager $\rightarrow$ `/org/dashboard`

### 2.2 Platform Super Admin Portal (`/platform`)
- **Global Operations Bar**: Active Client Orgs (38), Active Civil Sites (142), Field Terminals Active (2,480), System Health (99.98%).
- **Provisioned Tenants Directory**: High-density table of all client organizations with slug, tier, package count, terminals count, status (Active/Suspended), and actions.
- **Quick Provision Client Drawer/Modal**:
  - Company Name, Org Slug, Tax/GSTIN ID.
  - Primary Admin Name, Username, Email, Phone.
  - Initial Passcode Generator (`Auto-generate` & `Copy Credentials`).
  - Deployment Tier (Standard, Enterprise).

### 2.3 Organization Control Center (`/org/*`)
- **Top Bar**: Organization selector, active project breadcrumb, shift indicator (Day Shift 07:00–19:00), GPS telemetry status, notification bell, user profile menu.
- **Left Sidebar Navigation**:
  1. `Dashboard` (`/org/dashboard`): High-level operational KPIs, live inspection feed, corridor chainage progress.
  2. `Projects & Linear Setup` (`/org/projects`): Package master, chainage termini, 2-level WBS activity breakdown, employee assignments.
  3. `Workforce & Crew` (`/org/employees`): Employee directory, direct user creation with initial passwords, role assignment, password resets.
  4. `Field Submissions` (`/org/submissions`): Live stream of site submissions, filter bar, Excel/CSV export, inspection dossier with photos.
  5. `Attendance & Logs` (`/org/attendance`): Daily punch-in/out logs, open sessions, geofence compliance, Excel/CSV export.

---

## 3. Data Model & Schema Enhancements

### 3.1 User Model (`users`)
- `username` (`varchar(60)`, unique): Allows supervisors and staff to log in with an HR-assigned username without needing an email.
- `isPlatformAdmin` (`boolean`, default `false`): Restricts platform-wide tenant provisioning to platform operators.

### 3.2 Project Model (`projects`)
- `startChainage` (`varchar(50)`): e.g., `CH 00+000`.
- `endChainage` (`varchar(50)`): e.g., `CH 48+500`.
- `startLatitude` / `startLongitude` (`decimal(10, 7)`): Origin benchmark GPS coordinates.
- `endLatitude` / `endLongitude` (`decimal(10, 7)`): Terminal benchmark GPS coordinates.

### 3.3 Activity Model (`activities`)
- `parentId` (`uuid`, nullable, self-referential foreign key): Defines 2-level parent/child hierarchy.
  - Parent activity: e.g. `1.0 Earthwork & Embankment` (parentId = null).
  - Subactivity: e.g. `1.1 Clearing & Grubbing`, `1.2 Borrow Area Excavation` (parentId = parent.id).
- `unit` (`varchar(30)`): Standard civil measurement unit (e.g. `Sqm`, `Cum`, `Rmt`, `Tonne`, `Nos`).

---

## 4. API Endpoints Contract

### 4.1 Authentication
- `POST /auth/login`: Accepts `{ identifier: string, password: string }` where `identifier` matches either `username` or `email`. Returns JWT, user profile, role list, and `isPlatformAdmin`.

### 4.2 Platform Administration
- `GET /platform/stats`: Summary metrics for platform operators.
- `GET /platform/tenants`: List all tenants with statistics.
- `POST /platform/tenants`: Create a new tenant and the initial tenant owner user with username & password in an atomic transaction.
- `PATCH /platform/tenants/:id`: Update tenant status (`ACTIVE`, `SUSPENDED`).

### 4.3 Employee & User Management
- `GET /users`: List tenant members with roles, username, contact info, and assigned projects count.
- `POST /users/provision`: Direct creation of new employee user and tenant membership with initial password.
- `POST /users/:membershipId/reset-password`: Reset user password by Org Admin.
- `PATCH /users/:membershipId/status`: Activate or deactivate employee membership.

### 4.4 Projects & 2-Level Activities
- `GET /projects`: List all tenant projects with chainage and location metadata.
- `POST /projects`: Create project with start/end chainages, start/end GPS coordinates.
- `PATCH /projects/:id`: Update project details.
- `DELETE /projects/:id`: Archive project.
- `GET /projects/:id/activities/tree`: Return 2-level parent/subactivity hierarchy.
- `POST /projects/:id/activities`: Add parent activity or subactivity (`parentId`).
- `GET /projects/:id/assignments`: List assigned personnel.
- `POST /projects/:id/assignments`: Assign employee to project.

### 4.5 Submissions & Attendance Reporting
- `GET /reports/submissions`: Filtered submissions with project, chainage, supervisor, activities, GPS, photos.
- `GET /reports/attendance`: Filtered attendance sessions with check-in/out timestamps, GPS, duration.
- Client-side & server-side export helpers for Excel (.xlsx) and CSV (.csv).

---

## 5. Visual Styling Guidelines (Matching Mockups)
- **Primary Color:** `#0A5C36` (Emerald Green)
- **Primary Hover:** `#084A2B`
- **Background:** `#F8FAFC`
- **Dark Elements / Sidebar:** Slate-900 `#0F172A` with Emerald Active States
- **Card Surface:** Pure White `#FFFFFF` with Slate-200 borders (`#E2E8F0`)
- **Typography:** High legibility sans-serif with monospace font for Chainages (`font-mono`) and coordinates.
