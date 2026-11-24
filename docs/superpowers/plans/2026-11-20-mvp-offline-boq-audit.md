# MVP Production Hardening: Offline Sync, BOQ Tracking, Export & Audit Trail Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement and verify the 4 foundational MVP capabilities for initial production release: Mobile Offline Sync Queue, BOQ Quantity Progress Tracking in Remarks, Export Verification (PDF/Excel), and Superadmin/Tenant Audit Trail.

**Architecture:** Flutter mobile client integrates local offline staging via `SyncQueueService` with auto-sync and manual triggers; BOQ tracking leverages structured templates in Remarks & Delays with web dossier visual parsing; NestJS API instruments administrative and field lifecycle events into PostgreSQL `audit_logs` exposed via `/audit` & `/platform/audit`; Web app provides audit views and verified Excel/PDF exports.

**Tech Stack:** Flutter / Dart (Riverpod, Dio, connectivity_plus), NestJS / TypeScript, Prisma ORM, PostgreSQL, Next.js / React 19 / Tailwind CSS.

**Spec:** [docs/superpowers/specs/2026-11-20-mvp-offline-boq-audit-design.md](file:///home/embdev/workspace/embdev/IT_projects/CivilERP/docs/superpowers/specs/2026-11-20-mvp-offline-boq-audit-design.md)

## Global Constraints
- Must maintain Emerald Green (`#0A5C36`) theme consistency across mobile and web UI.
- No breaking schema migrations: utilize existing `audit_logs` Prisma model and `remarks` fields.
- Zero loss of captured telemetry: photo bytes/files must be preserved locally when offline.
- Guardrails must remain strict (tenant isolation, superadmin self-deletion prevention).

## Review Focus
1. Mobile app submits while offline: must NOT crash or drop photo; must enqueue task and alert supervisor gracefully.
2. Mobile app comes back online: queue must sync sequentially without duplicating records in database.
3. BOQ chip template click: must cleanly append without wiping existing supervisor text in Remarks field.
4. Tenant admin queries audit trail: must ONLY see audit logs belonging to their own tenant (`tenantId`).
5. Superadmin queries platform audit trail: must see system-wide administrative events across all organizations.

---

### Task 1: Mobile Offline Sync Queue Integration

**Files:**
- Modify: `apps/mobile/lib/core/offline/sync_queue_service.dart`
- Modify: `apps/mobile/lib/features/submissions/presentation/submit_daily_report_screen.dart`
- Modify: `apps/mobile/lib/features/history/presentation/previous_reports_screen.dart`
- Create: `apps/mobile/test/sync_queue_service_test.dart`

**Interfaces:**
- Consumes: `Connectivity` from `connectivity_plus`, `SecureStorageService`, `SubmissionRepository`.
- Produces: `SyncQueueService.enqueueSubmission(...)`, `SyncQueueService.processPendingSubmissions(...)`, offline queue state stream.

- [ ] **Step 1: Write unit tests for `SyncQueueService`**
  - Test enqueueing a submission task with photo file paths.
  - Test task serialization to and from JSON.
  - Test queue count stream and removal of processed tasks.
- [ ] **Step 2: Run Flutter test to verify failure**
  - Run: `flutter test test/sync_queue_service_test.dart`
- [ ] **Step 3: Update `SyncQueueService` and wire into `SubmitDailyReportScreen`**
  - In `SubmitDailyReportScreen`, catch network errors (`DioExceptionType.connectionError`, socket exceptions).
  - Enqueue payload and photo paths to `SyncQueueService`.
  - Display "Saved to Offline Sync Queue" confirmation modal with clear status.
- [ ] **Step 4: Update `PreviousReportsScreen` with Offline Queue section**
  - Render a top banner if `pendingCount > 0` showing "N reports pending sync" with a "Sync Now" button.
  - Tap "Sync Now" runs queue processor and refreshes list.
- [ ] **Step 5: Run tests and verify PASS**
  - Run: `cd apps/mobile && flutter test`

---

### Task 2: BOQ Quantity Progress Tracking (Remarks Helper & Dossier Highlighter)

**Files:**
- Modify: `apps/mobile/lib/features/submissions/presentation/submit_daily_report_screen.dart`
- Modify: `apps/web/src/components/submissions/InspectionDossierDrawer.tsx`
- Create: `apps/mobile/test/boq_remarks_test.dart`

**Interfaces:**
- Consumes: Selected activities from `ActivitySelectorSheet`.
- Produces: Formatted BOQ string `[BOQ: <Name> | Qty: <amount> <unit>]` inside `remarks`, parsed in Web dossier into highlighted badges.

- [ ] **Step 1: Write test for BOQ template formatter & parser**
  - Test formatting template string from activity name and unit.
  - Test regex extraction of `[BOQ: ... | Qty: ...]` in remarks.
- [ ] **Step 2: Add "+ BOQ Qty" action chips to `SubmitDailyReportScreen`**
  - Above Remarks & Delays, display chips for currently selected activities.
  - Tapping opens a quick prompt or inserts `[BOQ: <Activity Name> | Qty: ____ <unit>]` into cursor position.
- [ ] **Step 3: Update `InspectionDossierDrawer.tsx` in Web App**
  - Parse `submission.remarks` for BOQ tags.
  - If BOQ tags present, render a dedicated Emerald Green highlight card: "Executed BOQ Quantities" displaying itemized badges.
- [ ] **Step 4: Verify formatting on mobile and web**
  - Run mobile and web lint/test suites.

---

### Task 3: Backend Audit Trail Service, Endpoints & Triggers

**Files:**
- Create: `apps/api/src/audit/audit.controller.ts`
- Modify: `apps/api/src/audit/audit.module.ts`
- Modify: `apps/api/src/audit/audit.service.ts`
- Modify: `apps/api/src/projects/projects.service.ts`
- Modify: `apps/api/src/activities/activities.service.ts`
- Modify: `apps/api/src/users/users.service.ts`
- Modify: `apps/api/src/platform/platform.service.ts`
- Create: `apps/api/test/audit-e2e.spec.ts`

**Interfaces:**
- Consumes: `PrismaService`, `AuthenticatedUser`.
- Produces: `GET /audit` (tenant audit logs), `GET /platform/audit` (platform admin audit logs), `AuditService.log()`.

- [ ] **Step 1: Write E2E test for audit trail endpoints and logging**
  - Test `GET /audit` returns tenant logs with authentication.
  - Test `GET /platform/audit` requires superadmin guard.
  - Test that creating a project records an audit log entry.
- [ ] **Step 2: Implement `AuditController` and query methods in `AuditService`**
  - `getTenantAuditLogs(user, query)`: filters by `user.tenantId`, sorts `occurredAt: desc`, supports pagination.
  - `getPlatformAuditLogs(query)`: filters across all tenants or specific tenant.
- [ ] **Step 3: Instrument lifecycle events**
  - In `projects.service.ts`: log `PROJECT_CREATED`, `PROJECT_DUPLICATED`.
  - In `activities.service.ts`: log `ACTIVITY_CREATED`, `ACTIVITY_UPDATED`, `ACTIVITY_DELETED`.
  - In `users.service.ts`: log `USER_PROVISIONED`, `PASSWORD_RESET`.
  - In `platform.service.ts`: log `SUPERADMIN_CREATED`, `SUPERADMIN_DELETED`, `TENANT_ONBOARDED`.
- [ ] **Step 4: Run E2E test to verify all pass**
  - Run: `cd apps/api && npm run build && npm run test -- audit-e2e`

---

### Task 4: Web UI Audit Trail View

**Files:**
- Create: `apps/web/src/app/org/audit/page.tsx`
- Modify: `apps/web/src/app/org/layout.tsx` (add Audit Trail to sidebar)
- Modify: `apps/web/src/app/platform/page.tsx` (add Platform Audit tab/drawer)

**Interfaces:**
- Consumes: `GET /audit`, `GET /platform/audit`.
- Produces: Accessible audit stream table with actor name, action badge, timestamp, and details JSON.

- [ ] **Step 1: Create Tenant Audit Page (`/org/audit`)**
  - Clean table showing: Timestamp, Action Badge (`PROJECT_CREATED`, `USER_PROVISIONED`, etc.), Entity Type, Actor (`@username`), and Details.
- [ ] **Step 2: Add "Audit Trail" to Tenant Navigation**
  - Add link with Shield / History icon in `apps/web/src/app/org/layout.tsx`.
- [ ] **Step 3: Add Audit Log section to Platform Superadmin (`/platform`)**
  - Platform superadmin tab/button to view global system events.
- [ ] **Step 4: Run Next.js build to verify 0 type errors**
  - Run: `cd apps/web && npm run build`

---

### Task 5: End-to-End Verification on Physical Device & Web

**Files:**
- Test scripts: `scratch/test-offline-flow.js`, ADB commands.

- [ ] **Step 1: Mobile Offline Simulation & Sync on physical device**
  - Disconnect port reverse or disable Wi-Fi.
  - Submit report with attached photo and BOQ remarks.
  - Confirm "Saved to Offline Sync Queue" prompt.
  - Check History screen shows "1 report pending sync".
  - Re-enable connection and tap "Sync Now".
  - Verify database receives the synced submission and uploaded photo.
- [ ] **Step 2: Verify Web Dossier BOQ Highlighting & Print/CSV Export**
  - View submission in `/org/submissions`: verify BOQ quantities are rendered in highlighted card.
  - Click Export to CSV: verify downloaded spreadsheet.
  - Click Print icon: verify browser print/PDF preview.
- [ ] **Step 3: Verify Audit Trail UI**
  - Open `/org/audit`: verify recent operations logged with correct actor and timestamp.
  - Open `/platform`: verify superadmin audit logs.
