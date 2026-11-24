# Phase 6: Superadmin Management & Deletion + Comprehensive Quality Audit

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

## Goal
1. Implement full management (editing profile, resetting password, toggling status) and deletion for platform superusers on the backend and frontend.
2. Enforce safeguards:
   - Prevent deleting yourself.
   - Prevent deactivating yourself.
   - Prevent deleting the last remaining superadmin.
   - Prevent deactivating the last active superadmin.
   - Handle foreign key constraints cleanly (revoke `isPlatformAdmin` if tenant memberships exist, delete user record if standalone).
3. Conduct a comprehensive non-hosting quality and issue audit across the entire application stack (API, Web, Mobile).

---

## File Structure & Responsibilities

### API
- `apps/api/src/platform/dto/platform.dto.ts`: Add `UpdateSuperadminDto`.
- `apps/api/src/platform/platform.service.ts`:
  - `updatePlatformAdmin(auth, id, dto)`: Update superadmin details, password, and status.
  - `deletePlatformAdmin(auth, id)`: Safe deletion/revocation with self-deletion and last-active checks.
- `apps/api/src/platform/platform.controller.ts`:
  - `PATCH /platform/admins/:id`: Route to `updatePlatformAdmin`.
  - `DELETE /platform/admins/:id`: Route to `deletePlatformAdmin`.

### Web
- `apps/web/src/components/platform/SuperadminUsersModal.tsx`:
  - Add inline/drawer edit panel for managing superadmin details, status toggle, and password resets.
  - Add delete action with confirmation modal and self-deletion disabled protection (`user.id === currentUser.id`).

---

## Tasks

### Task 1: API - Superadmin Update & Deletion Endpoints
- [ ] In `apps/api/src/platform/dto/platform.dto.ts`, add `UpdateSuperadminDto` (`fullName`, `email`, `phone`, `status`, `newPassword`).
- [ ] In `apps/api/src/platform/platform.service.ts`, implement `updatePlatformAdmin` and `deletePlatformAdmin` with guardrails and audit logging.
- [ ] In `apps/api/src/platform/platform.controller.ts`, map `PATCH /platform/admins/:id` and `DELETE /platform/admins/:id`.
- [ ] Run `npm --prefix apps/api run build` to verify compilation.

### Task 2: Web - Superadmin Management & Deletion UI
- [ ] In `apps/web/src/components/platform/SuperadminUsersModal.tsx`:
  - Inject `useAuth()` to identify the current logged-in superadmin.
  - Add edit modal/form allowing modification of name, email, phone, status, and password reset.
  - Add delete button with confirmation dialog.
  - Disable delete button on self with "(You)" badge.
- [ ] Run `npm --prefix apps/web run build` to verify compilation.

### Task 3: Comprehensive Non-Hosting Quality Audit & Verification
- [ ] Run automated API tests for superadmin update, status toggle, delete, and self-delete rejection.
- [ ] Run `cd apps/mobile && flutter test` to verify all 52 mobile tests pass.
- [ ] Audit remaining non-hosting code paths for edge cases.
