# Phase 5: Security Hardening, Controller DTOs, Superuser Management & iOS Permissions

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

## Goal
Implement Option 1 security hardening:
1. Magic-byte photo upload validation & strict MIME restriction in `site-submissions.controller.ts`.
2. Dedicated DTO validation classes with `class-validator` across `projects`, `activities`, `dprs`, `site-submissions`, and `platform`.
3. iOS permission description strings in `Info.plist`.
4. Platform Superadmin management utility (API endpoints + UI modal) and database superuser account provisioning with known credentials.

---

## File Structure & Responsibilities

### API
- `apps/api/src/common/utils/file-signature.util.ts`: Helper to inspect buffer magic bytes for JPEG (`FF D8 FF`), PNG (`89 50 4E 47`), and WebP (`52 49 46 46`).
- `apps/api/src/site-submissions/site-submissions.controller.ts`: Refactor upload interceptor to disallow `application/octet-stream`, validate file magic bytes, and reject spoofed headers.
- `apps/api/src/projects/dto/project.dto.ts`: `CreateProjectDto`, `UpdateProjectDto`, `DuplicateProjectDto`.
- `apps/api/src/projects/projects.controller.ts`: Enforce typed DTOs on route handlers.
- `apps/api/src/activities/dto/activity.dto.ts`: `CreateActivityDto`, `UpdateActivityDto`, `SetAssignmentsDto`.
- `apps/api/src/activities/activities.controller.ts`: Enforce typed DTOs on route handlers.
- `apps/api/src/dprs/dto/dpr.dto.ts`: `CreateDprDto`, `UpdateDprDto`, `ReviewDprDto`.
- `apps/api/src/dprs/dprs.controller.ts`: Enforce typed DTOs on route handlers.
- `apps/api/src/site-submissions/dto/submission.dto.ts`: `CreateSubmissionDto`, `ListSubmissionsQueryDto`.
- `apps/api/src/site-submissions/site-submissions.controller.ts`: Enforce typed DTOs on route handlers.
- `apps/api/src/platform/dto/platform.dto.ts`: `CreateSuperadminDto`, `CreateTenantDto`, `UpdateTenantDto`.
- `apps/api/src/platform/platform.service.ts` & `platform.controller.ts`: Add `GET /platform/admins` and `POST /platform/admins` endpoints.

### Web
- `apps/web/src/components/platform/SuperadminUsersModal.tsx`: Modal dialog to view active platform superadmins and provision new ones.
- `apps/web/src/app/platform/page.tsx`: Add "Manage Superusers" trigger button to platform super admin dashboard.

### Mobile
- `apps/mobile/ios/Runner/Info.plist`: Add `NSCameraUsageDescription`, `NSLocationWhenInUseUsageDescription`, `NSPhotoLibraryUsageDescription`.

### Database
- Direct provisioning script / Prisma client seed to ensure `superuser` (`superuser@vyhir.com`, `Password123!`) exists with `isPlatformAdmin = true`.

---

## Tasks

### Task 1: Magic Byte File Inspection & Strict Photo Uploads
- [ ] Create `apps/api/src/common/utils/file-signature.util.ts` with `validateImageMagicBytes(buffer: Buffer): boolean`.
- [ ] In `apps/api/src/site-submissions/site-submissions.controller.ts`:
  - Disallow `application/octet-stream` from `isMimeAllowed`.
  - Validate buffer magic bytes before calling `StorageService.saveFile`.
  - Return `BadRequestException('Invalid file format: Genuine JPEG, PNG or WebP image required')` on mismatch.
- [ ] Verify photo upload rejection for renamed text files and acceptance for valid images.

### Task 2: Controller DTOs & ValidationPipe Enforcement
- [ ] Create `apps/api/src/projects/dto/project.dto.ts` with `CreateProjectDto`, `UpdateProjectDto`, `DuplicateProjectDto`.
- [ ] Create `apps/api/src/activities/dto/activity.dto.ts` with `CreateActivityDto`, `UpdateActivityDto`, `SetAssignmentsDto`.
- [ ] Create `apps/api/src/dprs/dto/dpr.dto.ts` with `CreateDprDto`, `UpdateDprDto`, `ReviewDprDto`.
- [ ] Create `apps/api/src/site-submissions/dto/submission.dto.ts` with `CreateSubmissionDto`.
- [ ] Create `apps/api/src/platform/dto/platform.dto.ts` with `CreateSuperadminDto`.
- [ ] Refactor controllers (`projects.controller.ts`, `activities.controller.ts`, `dprs.controller.ts`, `site-submissions.controller.ts`, `platform.controller.ts`) to use concrete DTOs.
- [ ] Run `npm --prefix apps/api run build` to confirm compilation.

### Task 3: Platform Superadmin Management API & Database User Provisioning
- [ ] In `apps/api/src/platform/platform.service.ts`:
  - Implement `listPlatformAdmins(auth: AuthenticatedUser)` returning users with `isPlatformAdmin: true`.
  - Implement `createPlatformAdmin(auth: AuthenticatedUser, dto: CreateSuperadminDto)` that hashes password with Argon2, sets `isPlatformAdmin: true`, status `ACTIVE`, and logs `SUPERADMIN_CREATED` audit event.
- [ ] In `apps/api/src/platform/platform.controller.ts`:
  - Add `@Get('admins')` and `@Post('admins')` protected with `PlatformGuard`.
- [ ] Execute database provisioning script to create or update `superuser@vyhir.com` (`username: superuser`, password: `Password123!`, `isPlatformAdmin: true`).
- [ ] Test login via `POST /api/v1/auth/login` with `superuser` credentials.

### Task 4: Platform Superadmin Management UI
- [ ] Create `apps/web/src/components/platform/SuperadminUsersModal.tsx` displaying:
  - List of all platform superadmins (name, username, email, phone, created date, status).
  - Form to add new Superadmin with validation.
  - Toast notifications and clean Emerald Green styling.
- [ ] Update `apps/web/src/app/platform/page.tsx`:
  - Add "Superuser Accounts" button in header next to "Onboard Organization".
  - Wire state to open `SuperadminUsersModal`.
- [ ] Run `npm --prefix apps/web run build` to ensure clean build.

### Task 5: iOS Permissions Configuration
- [ ] In `apps/mobile/ios/Runner/Info.plist`:
  - Add `NSCameraUsageDescription`.
  - Add `NSLocationWhenInUseUsageDescription`.
  - Add `NSPhotoLibraryUsageDescription`.
- [ ] Run `cd apps/mobile && flutter test` to ensure all 52 tests pass.

---

## Verification Plan
1. `npm --prefix apps/api run build` passes with 0 errors.
2. `npm --prefix apps/web run build` passes with 0 errors.
3. `cd apps/mobile && flutter test` passes 52/52 tests.
4. Python test script logs in with `superuser` / `Password123!`, retrieves `GET /api/v1/platform/admins`, and verifies superuser access.
5. Python test script attempts to upload a spoofed `.jpg` file containing plain text and verifies `400 Bad Request` with magic-byte rejection.
