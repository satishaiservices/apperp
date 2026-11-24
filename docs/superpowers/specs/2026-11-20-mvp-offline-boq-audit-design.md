# MVP Production Hardening: Offline Sync, BOQ Tracking, Export & Audit Trail

**Date:** 2026-11-20  
**Status:** Approved  
**Scope:** Mobile App (Flutter), Web Client (Next.js), Backend (NestJS + Prisma + PostgreSQL)

---

## 1. Intent & Context
To prepare the CivilERP (Vyhir) platform for its initial real-world field production rollout, this MVP phase hardens four foundational operational capabilities:
1. **Offline Sync Resilience:** Ensure site supervisors working in remote highway cuts, tunnels, and network dead-zones can seamlessly record reports without data loss.
2. **Export Capabilities:** Validate and ensure print/PDF and spreadsheet export for compliance and consultant reporting.
3. **Physical BOQ Quantity Progress Tracking:** Streamline daily execution recording by utilizing structured BOQ helper templates inside the Remarks & Delays section.
4. **Administrative Audit Trail:** Maintain an immutable record of critical administrative and operations events (e.g., project modifications, activity deletions, employee provisioning, role changes).

---

## 2. Goals & Non-Goals

### Goals
- **Mobile Offline Queue:** Persist report submissions and captured photos locally when internet is down; automatically process and flush the queue upon reconnection with a manual "Sync Now" trigger.
- **Visual Sync Status:** Provide clear indicators on mobile (e.g. "Saved Offline", "Pending Sync (X items)") and in history logs.
- **BOQ Remarks Helper:** Enable 1-tap template insertion in the Remarks field based on currently selected activities, formatted as `[BOQ: <Activity Name> | Qty: <amount> <unit>]`.
- **Dossier BOQ Highlight:** Visually emphasize BOQ quantity lines inside the web Inspection Dossier drawer.
- **Audit Logging:** Expose `GET /audit` (tenant-scoped) and `GET /platform/audit` (platform superadmin), logging events: `USER_PROVISIONED`, `PROJECT_CREATED`, `PROJECT_DUPLICATED`, `ACTIVITY_CREATED`, `ACTIVITY_UPDATED`, `ACTIVITY_DELETED`.
- **Audit Web UI:** Provide an accessible Audit Trail view in both the Tenant Portal and the Platform Superadmin panel.

### Non-Goals
- Full standalone BOQ estimation engine / schedule of rates (relegated to Post-MVP).
- Peer-to-peer mesh sync between mobile devices.
- Complex multi-approver workflow engine (kept to simple supervisor submission & dossier review).

---

## 3. Approaches Considered

### Feature 1: Mobile Offline Storage
- **Approach A (In-memory cache):** Simple, but loses unsynced reports on app crash or OS process kill. *(Rejected)*
- **Approach B (Persistent Secure / Encrypted JSON File Queue):** Build upon existing `SyncQueueService` with persistent storage of pending payloads and local image file paths. Automatically hooks into `connectivity_plus` and provides manual retry. *(Chosen - clean, robust, zero new native dependency conflicts)*.

### Feature 2: BOQ Quantity Progress Tracking
- **Approach A (Complete relational BOQ schema rewrite):** Requires modifying child tables, migration scripts, and breaking changes to existing controller DTOs. *(Overkill for MVP)*.
- **Approach B (Structured Remarks Template with UI Parsers):** Use the user-specified Remarks & Delays section. Add smart chip helpers on mobile that insert pre-formatted BOQ tags, and render them with styled badges in web Inspection Dossier. *(Chosen - completely backward-compatible, intuitive for field supervisors)*.

### Feature 3: Audit Trail API & UI
- **Approach A (Separate microservice / external log aggregator):** Heavy operational overhead. *(Rejected)*.
- **Approach B (First-party Prisma AuditLog integration):** Leverage existing `AuditLog` table and `AuditService` in `apps/api/src/audit`. Expose NestJS controllers and render an audit table in the Web UI. *(Chosen - high performance, transactional integrity)*.

---

## 4. Technical Architecture & Components

```
                                      +-----------------------------+
                                      |     Physical Mobile Device  |
                                      |  (Offline Queue / Sync Svc) |
                                      +--------------+--------------+
                                                     |
                                        Sync when    | Staged locally
                                        Online       | when Offline
                                                     v
                                      +-----------------------------+
                                      |     NestJS REST API (:3001) |
                                      +--------------+--------------+
                                                     |
                    +--------------------------------+-------------------------------+
                    |                                |                               |
                    v                                v                               v
     +------------------------------+ +------------------------------+ +------------------------------+
     |   /site-submissions (Photos) | |     /audit & /platform/audit | |     /projects & /activities  |
     +--------------+---------------+ +--------------+---------------+ +--------------+---------------+
                    |                                |                                |
                    +--------------------------------+--------------------------------+
                                                     |
                                                     v
                                      +-----------------------------+
                                      |     PostgreSQL (audit_logs, |
                                      |      site_submissions, etc) |
                                      +-----------------------------+
                                                     |
                                                     v
                                      +-----------------------------+
                                      |      Next.js Web Portal     |
                                      |   - Inspection Dossier (PDF)|
                                      |   - CSV / Excel Export      |
                                      |   - Audit Trail Stream      |
                                      +-----------------------------+
```

### Component 1: Mobile Offline Sync Queue (`apps/mobile`)
1. **Queue Store:** Updates `SyncQueueService` to store local photo file paths alongside the report metadata in secure persistent storage.
2. **Offline Interceptor / Handler:** In `submit_daily_report_screen.dart`:
   - Checks connectivity before submission, or catches network exceptions (`DioExceptionType.connectionError`, `connectionTimeout`).
   - If offline, enqueues the `SyncTask` with photo local paths, notifies supervisor with a prominent green/amber status bar: *"Offline mode active: Report saved locally. Will sync automatically when connection restores."*
   - Returns to previous screen or history.
3. **History Screen (`previous_reports_screen.dart`):**
   - Displays pending tasks at the top with a "Pending Sync (N)" badge and a "Sync Now" button.
   - On tapping "Sync Now" or when network restores, runs `processQueue()`, uploading the report and sequentially uploading photographs.

### Component 2: BOQ Remarks Assistant (`apps/mobile` & `apps/web`)
1. **Mobile Input UI:** In `SubmitDailyReportScreen`:
   - Under "PROJECT ACTIVITIES (MANDATORY)", when activities are selected, render an "+ Insert BOQ Qty" action chip for each selected subactivity.
   - Tapping it appends `[BOQ: <Activity Name> | Qty: ____ <unit>]` directly into `_remarksController`.
2. **Web Dossier UI:** In `InspectionDossierDrawer.tsx`:
   - Detect and extract `\[BOQ: (.*?) \| Qty: (.*?)\]` patterns from `submission.remarks`.
   - Render a dedicated highlighted "Executed BOQ Quantities" card with quantity badges.

### Component 3: Audit Trail System (`apps/api` & `apps/web`)
1. **API Endpoints:**
   - `GET /audit`: Returns tenant audit logs (`tenantId` scoped from authenticated user), with pagination and filtering.
   - `GET /platform/audit`: Returns platform superadmin audit logs across all tenants.
2. **Audit Instrumentation:**
   - Call `AuditService.log()` upon:
     - Project created (`PROJECT_CREATED`)
     - Project duplicated (`PROJECT_DUPLICATED`)
     - WBS activity created / updated / deleted (`ACTIVITY_CREATED`, `ACTIVITY_UPDATED`, `ACTIVITY_DELETED`)
     - Employee provisioned (`USER_PROVISIONED`)
     - Password reset (`PASSWORD_RESET`)
3. **Web Portal UI:**
   - Add "Audit Trail" tab/view in Tenant Navigation and Platform Superadmin to inspect logs with actor, timestamp, action badge, and metadata.

---

## 5. Verification Plan
- **Mobile Offline Test:**
  - Put device in airplane mode or disconnect reverse port.
  - Submit report with activities, BOQ remarks, and site photo.
  - Verify prompt: "Saved to Offline Sync Queue".
  - Verify pending item shown in History with badge.
  - Re-enable connection, trigger sync, verify database insertion and photo upload.
- **Web Export Test:**
  - Verify CSV export downloads correctly formatted spreadsheets.
  - Verify print action opens preview with all dossier elements intact.
- **Audit Trail Test:**
  - Perform actions (create project, edit activity, provision employee).
  - Verify audit entries generated in PostgreSQL `audit_logs` table and accessible via API & Web UI.
