# VYHIR CivilERP Web Control Center Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete Web Control Center for VYHIR CivilERP featuring a Platform Super Admin Portal (client organization onboarding and license management) and an Organization Admin Operations Portal (linear projects with start/end chainages and GPS, 2-level WBS activities, direct employee provisioning, daily submissions inspection dossier with photos, attendance logs, and Excel/CSV data exports) styled in Emerald Green (`#0A5C36`).

**Architecture:** Next.js (App Router) + TypeScript + Tailwind CSS frontend with unified role-based authentication communicating via REST with the NestJS + Prisma + PostgreSQL modular monolith backend.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS v4, Lucide React, NestJS, Prisma ORM, PostgreSQL 17, Argon2, JWT.

**Spec:** [control-center-web-design.md](file:///home/embdev/workspace/embdev/IT_projects/CivilERP/docs/superpowers/specs/2026-11-14-control-center-web-design.md)

---

## Global Constraints
- Primary Brand Color: Emerald Green `#0A5C36` (`theme-emerald`), with active/hover `#0F7E4A`, mint accent `#E8F5EE`, and slate dark neutrals `#0F172A`.
- Multi-tenancy: Platform Admin operates at system level; Organization Admins are strictly scoped to their `tenantId`.
- No client-side trust: All authorization and tenant boundaries must be verified server-side.
- Mobile compatibility: Mobile app API contracts must remain fully backward-compatible.
- Direct Employee Provisioning: HR/Org Admin assigns username and initial password directly.

## Review Focus
1. Login with username vs email: Ensure users can log in with either case-insensitively.
2. Platform Admin boundary: Ensure non-platform users cannot access `/platform` routes or endpoints.
3. 2-Level Activity hierarchy: Ensure deleting or updating parent activities preserves or safely cascades to subactivities without orphaned records.
4. Export data handling: Ensure CSV/Excel exports respect applied filters (date range, project, supervisor) and tenant isolation.
5. Chainage and GPS formats: Ensure linear chainages (e.g., `CH 15+400`) and decimal GPS coordinates handle nulls and edge values gracefully.

---

### Task 1: Database Schema Migration & Model Updates

**Files:**
- Modify: `apps/api/prisma/schema.prisma`
- Create/Run: Prisma migration in PostgreSQL
- Modify: `apps/api/src/database/prisma.service.ts` or seed script

**Interfaces:**
- Produces:
  - `User.username`: `String? @unique @db.VarChar(60)`
  - `User.isPlatformAdmin`: `Boolean @default(false)`
  - `Project`: `startChainage`, `endChainage`, `startLatitude`, `startLongitude`, `endLatitude`, `endLongitude`
  - `Activity`: `parentId`, `unit` with self-relation `subactivities`

- [ ] **Step 1: Update `schema.prisma` with new fields**
  - Add `username` and `isPlatformAdmin` to `User` model.
  - Add `startChainage`, `endChainage`, `startLatitude`, `startLongitude`, `endLatitude`, `endLongitude` to `Project` model.
  - Add `parentId` and `unit` to `Activity` model with self-relation for 2-level hierarchy.
- [ ] **Step 2: Generate and apply database migration**
  - Run `npx prisma migrate dev --name add_control_center_fields` (or `db push` in docker container).
  - Run `npx prisma generate` to rebuild Prisma client types.
- [ ] **Step 3: Verify migration and seed Platform Super Admin**
  - Create seed script or migration logic to ensure a default Platform Super Admin (`admin@vyhir.com` / `superadmin`) exists for initial login.
- [ ] **Step 4: Commit schema changes**
  - `git add apps/api/prisma/ schema.prisma`
  - `git commit -m "feat(db): add control center fields for username, platform admin, chainages, and activities"`

---

### Task 2: Backend Auth & Platform Super Admin Module

**Files:**
- Modify: `apps/api/src/auth/auth.service.ts`
- Modify: `apps/api/src/auth/auth.controller.ts`
- Create: `apps/api/src/platform/platform.module.ts`
- Create: `apps/api/src/platform/platform.controller.ts`
- Create: `apps/api/src/platform/platform.service.ts`
- Modify: `apps/api/src/app.module.ts`

**Interfaces:**
- `AuthService.login(identifier, password)`: Accepts email or username. Returns `{ accessToken, user: { ..., isPlatformAdmin }, tenant, roles }`.
- `PlatformService.getStats()`: Returns `{ clientOrgsCount, activeSitesCount, fieldTerminalsCount, systemHealth }`.
- `PlatformService.getTenants()`: Returns list of tenants with project and user counts.
- `PlatformService.createTenantWithAdmin(input)`: Atomic creation of Tenant + Owner User (with username & initial password) + Membership + Role.

- [ ] **Step 1: Write unit/integration test for login with username and platform stats**
- [ ] **Step 2: Update `auth.service.ts` to support login by username or email**
- [ ] **Step 3: Implement `PlatformModule` with guarded endpoints (`/platform/stats`, `/platform/tenants`)**
- [ ] **Step 4: Verify platform endpoints with curl / tests**
- [ ] **Step 5: Commit backend auth & platform module**
  - `git add apps/api/src/auth/ apps/api/src/platform/ apps/api/src/app.module.ts`
  - `git commit -m "feat(api): add platform superadmin module and username login support"`

---

### Task 3: Backend Direct Employee Provisioning & Project Hierarchy

**Files:**
- Modify: `apps/api/src/users/users.service.ts`
- Modify: `apps/api/src/users/users.controller.ts`
- Modify: `apps/api/src/projects/projects.service.ts`
- Modify: `apps/api/src/activities/activities.service.ts`
- Modify: `apps/api/src/activities/activities.controller.ts`

**Interfaces:**
- `UsersService.provisionEmployee(auth, input)`: `{ fullName, username, phone, email?, password, roleName }` $\rightarrow$ creates user, links to tenant, assigns role, returns employee record.
- `UsersService.resetPassword(auth, membershipId, newPassword)`: Updates password hash.
- `ProjectsService.create(auth, input)`: Stores `startChainage`, `endChainage`, `startLatitude`, etc.
- `ActivitiesService.getProjectActivityTree(auth, projectId)`: Returns parent activities with nested `subactivities`.

- [ ] **Step 1: Write integration test for direct employee provisioning and 2-level activities**
- [ ] **Step 2: Implement `provisionEmployee` and `resetPassword` in `users.service.ts`**
- [ ] **Step 3: Update `projects.service.ts` to accept chainages and GPS bounds**
- [ ] **Step 4: Update `activities.service.ts` to support 2-level hierarchy (`parentId`, `unit`, and tree endpoint)**
- [ ] **Step 5: Run tests and verify endpoints**
- [ ] **Step 6: Commit user provisioning and project hierarchy APIs**
  - `git add apps/api/src/users/ apps/api/src/projects/ apps/api/src/activities/`
  - `git commit -m "feat(api): direct employee provisioning and 2-level activity hierarchy"`

---

### Task 4: Next.js Web App Foundation & Unified Auth Screen

**Files:**
- Modify: `apps/web/package.json` (add `lucide-react`, `clsx`, `tailwind-merge`, etc.)
- Modify: `apps/web/src/app/globals.css` (configure Emerald `#0A5C36` theme tokens)
- Create: `apps/web/src/lib/api-client.ts`
- Create: `apps/web/src/context/auth-context.tsx`
- Create: `apps/web/src/app/login/page.tsx`
- Modify: `apps/web/src/app/page.tsx` (redirect based on auth state)

**Interfaces:**
- `useAuth()`: Provides `user`, `tenant`, `token`, `isPlatformAdmin`, `login(identifier, password, mode)`, `logout()`.
- Route `/login`: Renders unified login with mode toggle (`Organization Admin` vs `Platform Super Admin`), matching desktop mockup.

- [ ] **Step 1: Install frontend dependencies (`lucide-react`, helper packages)**
- [ ] **Step 2: Configure Emerald Green (`#0A5C36`) theme variables and utility classes in `globals.css`**
- [ ] **Step 3: Implement `api-client.ts` with token handling and error handling**
- [ ] **Step 4: Implement `AuthContext` with login, logout, and persistent session storage**
- [ ] **Step 5: Build the `/login` page matching the uploaded desktop mockup**
- [ ] **Step 6: Test login flow and role-based redirect**
- [ ] **Step 7: Commit web auth foundation**
  - `git add apps/web/`
  - `git commit -m "feat(web): unified login screen and auth context with emerald theme"`

---

### Task 5: Platform Super Admin Web Portal (`/platform`)

**Files:**
- Create: `apps/web/src/app/platform/layout.tsx`
- Create: `apps/web/src/app/platform/page.tsx`
- Create: `apps/web/src/components/platform/OnboardClientModal.tsx`
- Create: `apps/web/src/components/platform/TenantListTable.tsx`

**Interfaces:**
- Top bar with Platform Operator Mode indicator, 99.98% uptime badge, system telemetry.
- 4 Global KPI Cards: Client Orgs, Active Civil Sites, Field Terminals, Platform Health.
- High-density table of provisioned tenants with search, status filters, and "Onboard Client" button.
- Modal drawer for "Quick Provision Client" with Auto-generate initial passcode and copy-credentials card.

- [ ] **Step 1: Build `/platform/layout.tsx` with top bar and platform operator branding**
- [ ] **Step 2: Build `/platform/page.tsx` with KPI summary cards**
- [ ] **Step 3: Build `TenantListTable` with status pills and action buttons**
- [ ] **Step 4: Build `OnboardClientModal` with form validation, passcode generator, and API submit**
- [ ] **Step 5: Test onboarding a client tenant and copying generated credentials**
- [ ] **Step 6: Commit platform super admin portal**
  - `git add apps/web/src/app/platform/ apps/web/src/components/platform/`
  - `git commit -m "feat(web): platform superadmin portal with client onboarding"`

---

### Task 6: Organization Admin Control Center — Projects & 2-Level WBS (`/org/projects`)

**Files:**
- Create: `apps/web/src/app/org/layout.tsx` (sidebar navigation, active org picker, shift info)
- Create: `apps/web/src/app/org/projects/page.tsx`
- Create: `apps/web/src/components/projects/CreateProjectModal.tsx`
- Create: `apps/web/src/components/projects/ProjectDetailDrawer.tsx`
- Create: `apps/web/src/components/projects/TwoLevelActivityWBS.tsx`

**Interfaces:**
- Shared `/org/layout.tsx`: Left sidebar (Dashboard, Projects, Workforce, Submissions, Attendance) + Top header.
- `/org/projects`: Package Master list with chainage tags (`CH 00+000 - CH 48+500`), budget, deployed civil engineers.
- `CreateProjectModal`: Inputs for code, name, start chainage, end chainage, start/end GPS, dates, budget.
- `TwoLevelActivityWBS`: Expandable 2-level tree view (Parent Activity $\rightarrow$ Subactivities with units like `Sqm`, `Cum`, `Rmt`).

- [ ] **Step 1: Build shared `/org/layout.tsx` with Emerald navigation and active organization context**
- [ ] **Step 2: Build `/org/projects/page.tsx` with package master cards and linear corridor bars**
- [ ] **Step 3: Build `CreateProjectModal` with chainage and GPS coordinates inputs**
- [ ] **Step 4: Build `TwoLevelActivityWBS` component allowing adding parent activities and subactivities**
- [ ] **Step 5: Test project creation and activity tree manipulation**
- [ ] **Step 6: Commit projects and 2-level WBS features**
  - `git add apps/web/src/app/org/ apps/web/src/components/projects/`
  - `git commit -m "feat(web): package master and 2-level WBS activity manager"`

---

### Task 7: Organization Admin Control Center — Workforce & Crew (`/org/employees`)

**Files:**
- Create: `apps/web/src/app/org/employees/page.tsx`
- Create: `apps/web/src/components/employees/AddEmployeeModal.tsx`
- Create: `apps/web/src/components/employees/ResetPasswordModal.tsx`

**Interfaces:**
- Metrics Bar: Total Headcount, On-Site Today, Field Biometric Terminals, Pending Password Resets.
- Workforce Directory Table: Employee Name & Avatar, Role & Discipline, Linear Chainage Zone, Terminal Handle (Username), Contact Phone, GPS/Telemetry Status, Actions (Reset PIN, Reassign, Status toggle).
- `AddEmployeeModal`: Full Name, Username (terminal login), Phone, Email (optional), Role (Supervisor, Project Manager), Auto-generate initial password, "Copy Credentials" card.

- [ ] **Step 1: Build `/org/employees/page.tsx` table and summary metrics matching mockup**
- [ ] **Step 2: Implement `AddEmployeeModal` with username, phone, role, and auto-generated temporary password**
- [ ] **Step 3: Implement `ResetPasswordModal` for HR admin to reset employee credentials**
- [ ] **Step 4: Test creating an employee, copying credentials, and logging in with the new credentials**
- [ ] **Step 5: Commit workforce and employee management**
  - `git add apps/web/src/app/org/employees/ apps/web/src/components/employees/`
  - `git commit -m "feat(web): workforce directory with direct employee credential provisioning"`

---

### Task 8: Field Operations & Inspection Dossier with Excel/CSV Export (`/org/submissions`)

**Files:**
- Create: `apps/web/src/app/org/submissions/page.tsx`
- Create: `apps/web/src/components/submissions/InspectionDossierDrawer.tsx`
- Create: `apps/web/src/lib/export-utils.ts` (CSV & Excel generation)

**Interfaces:**
- Filter Bar: Date Window, Contract Package, Activity Filter, Field Supervisor.
- "Export Data" button: Dropdown for "Export to Excel (.xlsx)" and "Export to CSV (.csv)".
- Real-Time Daily Submissions Grid: Ref ID, Chainage Span (`CH 15+400 - 15+850`), Work Activity & Layer, Supervisor, Status badge, Photo preview thumbnails.
- Inspection Dossier Drawer (Right Side):
  - Linear alignment window with active span highlighted.
  - Geotagged site photos with metadata badges.
  - GPS coordinates and elevation datum.
  - Quality and compaction parameters (Layer, lift, roller, OMC, MDD density).
  - Lead inspector remarks and verification stamp.

- [ ] **Step 1: Implement `export-utils.ts` for CSV and tabular Excel data formatting**
- [ ] **Step 2: Build `/org/submissions/page.tsx` with filter bar and data table**
- [ ] **Step 3: Build `InspectionDossierDrawer` matching the desktop mockup layout**
- [ ] **Step 4: Test filtering submissions and downloading CSV/Excel export**
- [ ] **Step 5: Commit submissions control center and export utilities**
  - `git add apps/web/src/app/org/submissions/ apps/web/src/components/submissions/ apps/web/src/lib/export-utils.ts`
  - `git commit -m "feat(web): daily submissions control center with inspection dossier and CSV export"`

---

### Task 9: Org Admin Dashboard & Attendance Log (`/org/dashboard` & `/org/attendance`)

**Files:**
- Create: `apps/web/src/app/org/dashboard/page.tsx`
- Create: `apps/web/src/app/org/attendance/page.tsx`

**Interfaces:**
- `/org/dashboard`:
  - 4 KPI cards: Active Packages, Supervisors Checked-In, Submissions Today, Linear Chainage Done.
  - Live Field Activity Stream feed with photo cards, chainage chips, and QC signoff status.
  - Milestone Progress Linear Track & Geofence Compliance meter.
- `/org/attendance`:
  - Metrics: Personnel Present, Open Sessions, Late Check-ins, Geofence Breaches.
  - Muster & Site Time Log table: Employee Name & Role, Package/Section, Check-in Time & GPS tag, Check-out Time & GPS tag, Duration, Status.
  - "Export Daily Attendance Sheet (XLS/CSV)" action button.

- [ ] **Step 1: Build `/org/dashboard/page.tsx` matching desktop dashboard mockup**
- [ ] **Step 2: Build `/org/attendance/page.tsx` with punch-in/out logs and session status**
- [ ] **Step 3: Connect "Export Attendance Sheet" to `export-utils.ts`**
- [ ] **Step 4: Verify dashboard and attendance displays with real database records**
- [ ] **Step 5: Commit dashboard and attendance log**
  - `git add apps/web/src/app/org/dashboard/ apps/web/src/app/org/attendance/`
  - `git commit -m "feat(web): org admin dashboard and attendance time log with export"`

---

### Task 10: End-to-End Verification & Docker Build Check

**Files:**
- Verify: Full web and api build in Docker Compose

- [ ] **Step 1: Verify TypeScript build in `apps/api` (`npm run build`)**
- [ ] **Step 2: Verify TypeScript build in `apps/web` (`npm run build`)**
- [ ] **Step 3: Verify all test suites pass**
- [ ] **Step 4: Test full end-to-end user journeys:**
  - Journey A: Platform Super Admin logs in, creates a new Organization (`Apex Highway Infra Ltd`) and generates Org Admin credentials.
  - Journey B: Org Admin logs in, creates a Project with start/end chainages (`CH 00+000 - CH 48+500`) and 2-level activities.
  - Journey C: Org Admin creates an Employee with username (`r.verma.nh48`) and temporary password.
  - Journey D: Employee can authenticate using username.
  - Journey E: Submissions and attendance can be viewed, filtered, and exported as CSV.
- [ ] **Step 5: Final commit and summary documentation**
