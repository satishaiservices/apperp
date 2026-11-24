# Implementation Plan: Phase 3 - Production Docker, Storage Abstraction & Audit Logging

**Goal:** Establish an enterprise-ready infrastructure foundation: abstract file uploads to an extensible `StorageService` (supporting persistent volume and S3 cloud storage), wire business events to the `audit_logs` database table, and configure production Docker compose with an Nginx reverse proxy.

---

## 1. File Structure & Responsibilities

| File | Responsibility |
| :--- | :--- |
| `apps/api/src/storage/storage.interface.ts` | Interface defining `IStorageService` (`upload`, `getFilePath`, `delete`). |
| `apps/api/src/storage/local-storage.service.ts` | Local disk storage provider with persistent directory support. |
| `apps/api/src/storage/storage.module.ts` | Storage module exporting provider dynamically based on environment. |
| `apps/api/src/site-submissions/site-submissions.service.ts` | Refactor photo handling to use `StorageService`. |
| `apps/api/src/audit/audit.service.ts` | Service writing audit events to the PostgreSQL `audit_logs` table. |
| `apps/api/src/audit/audit.module.ts` | NestJS module exporting `AuditService`. |
| `apps/api/src/projects/projects.service.ts` | Record audit entries on project creation, duplication, update, and deletion. |
| `apps/api/src/activities/activities.service.ts` | Record audit entries on activity creation, edit, and deletion. |
| `apps/api/src/users/users.service.ts` | Record audit entries on user provisioning and role updates. |
| `infrastructure/docker/nginx.conf` | Production Nginx reverse proxy routing web (`:3000`) and api (`:3001`), SSL termination, and security headers. |
| `infrastructure/docker/docker-compose.prod.yml` | Multi-container production compose with production stages, isolated private database network, and Nginx. |
| `infrastructure/docker/Dockerfile.api` | Verify and harden production stage (ensure non-root user, proper prisma client copying, and migration readiness). |

---

## 2. Step-by-Step Execution Plan

### Task 1: Storage Service Abstraction (`apps/api/src/storage`)
- **Actions:**
  1. Create `storage.interface.ts` with `IStorageService`:
     - `saveFile(subDir: string, filename: string, buffer: Buffer, mimeType: string): Promise<{ storageKey: string; filePath: string }>`
     - `getFilePath(subDir: string, storageKey: string): string`
     - `deleteFile(subDir: string, storageKey: string): Promise<boolean>`
  2. Implement `LocalStorageService` with directory creation and path containment checks (prevent directory traversal).
  3. Export `StorageModule` and inject into `SiteSubmissionsModule` and `AuthModule`.
  4. Refactor `site-submissions.service.ts` and `auth.controller.ts` to use `StorageService`.
- **Verification:**
  - Automated test verifying photo uploads save and retrieve cleanly via `StorageService`.

### Task 2: Audit Logging Service & Event Wiring (`apps/api/src/audit`)
- **Actions:**
  1. Create `apps/api/src/audit/audit.service.ts`:
     - Method `log(auth: AuthenticatedUser, action: string, entityType: string, entityId?: string, metadata?: any): Promise<AuditLog>`
  2. Create `apps/api/src/audit/audit.module.ts` and import into `AppModule`.
  3. Wire audit logging into:
     - `projects.service.ts`: log `PROJECT_CREATED`, `PROJECT_DUPLICATED`, `PROJECT_UPDATED`, `PROJECT_DELETED`.
     - `activities.service.ts`: log `ACTIVITY_CREATED`, `ACTIVITY_UPDATED`, `ACTIVITY_DELETED`.
     - `users.service.ts`: log `USER_PROVISIONED`, `USER_ROLES_UPDATED`, `USER_DEACTIVATED`.
- **Verification:**
  - Create a project and duplicate it; query PostgreSQL `audit_logs` table to confirm entries were recorded with correct `tenantId`, `actorMembershipId`, and `metadata`.

### Task 3: Production Nginx Reverse Proxy Configuration
- **Actions:**
  1. Create `infrastructure/docker/nginx.conf`:
     - Upstream `api_upstream` pointing to `api:3001`.
     - Upstream `web_upstream` pointing to `web:3000`.
     - Routing `/api/v1/` to `api:3001`.
     - Routing `/` to `web:3000`.
     - Client max body size set to `50M` (for multi-photo site submissions).
     - Gzip compression enabled.
     - Security headers and SSL template blocks included.
- **Verification:**
  - Validate Nginx configuration syntax.

### Task 4: Production Docker Compose (`docker-compose.prod.yml`)
- **Actions:**
  1. Create `infrastructure/docker/docker-compose.prod.yml`:
     - Target `production` stages for API and Web.
     - PostgreSQL database without host port exposure (`ports: []`), accessible only within internal `vyhir-prod-network`.
     - Nginx service on ports `80:80` and `443:443`.
     - Persistent named volumes for database and media storage (`vyhir_storage_data`, `vyhir_db_data`).
     - Container restart policies (`restart: always`).
     - Proper healthchecks for zero-downtime container management.
- **Verification:**
  - Validate compose configuration with `docker compose -f infrastructure/docker/docker-compose.prod.yml config`.

---

## 3. End-to-End Test & Verification
- Test file upload and storage via `StorageService`.
- Test audit log recording in database.
- Validate production compose configuration and Nginx configuration.
- Rebuild API and Web applications to ensure zero TypeScript errors.
