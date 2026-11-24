# Implementation Plan: Phase 1 - Critical Security Hardening (Backend API)

**Goal:** Eliminate critical security vulnerabilities, backdoor access, credential leakage, and unvalidated payloads in the NestJS backend API before production deployment.

---

## 1. File Structure & Responsibilities

| File | Responsibility |
| :--- | :--- |
| `apps/api/src/auth/auth.service.ts` | Remove admin backdoor (lines 174-179); secure password verification; remove OTP from `forgotPassword` API response; use `crypto.randomInt`. |
| `apps/api/src/main.ts` | Enforce CORS allowed origins whitelist from environment; add global `ValidationPipe`. |
| `apps/api/src/auth/jwt-auth.guard.ts` | Remove extraction of master access tokens from URL query parameters. |
| `apps/api/src/app.module.ts` | Register `ThrottlerModule` for global rate limiting. |
| `apps/api/src/auth/auth.controller.ts` | Add `@Throttle()` decorator to `/auth/login`, `/auth/forgot-password`, and `/auth/reset-password`. |
| `apps/api/src/auth/dto/` | Create validated DTOs for authentication endpoints (`login.dto.ts`, `forgot-password.dto.ts`, `reset-password.dto.ts`). |
| `apps/web/src/components/submissions/InspectionDossierDrawer.tsx` | Fetch inspection photos using authenticated blob URLs instead of appending master JWT to URL. |
| `apps/mobile/lib/core/config/api_config.dart` | Clean up redundant query token in `submissionPhotoFile`. |

---

## 2. Step-by-Step Execution Plan

### Task 1: Remove Admin Backdoor & Secure Password Verification
- **Files:** `apps/api/src/auth/auth.service.ts`
- **Actions:**
  1. Remove lines 174–179 which allowed `Password123!` or `SuperAdmin123!` bypass for `admin@vyhir.com` or `superadmin`.
  2. Ensure `argon2.verify(user.passwordHash, input.password)` is the sole verification path.
  3. Ensure user status `'ACTIVE'` is strictly enforced.
- **Verification:**
  - Automated test verifying that logging in as `admin@vyhir.com` with `Password123!` fails with `401 Unauthorized` if that is not its hashed password in the DB.
  - Logging in with the actual hashed password succeeds.

### Task 2: Secure Password Reset & Remove OTP Leakage
- **Files:** `apps/api/src/auth/auth.service.ts`
- **Actions:**
  1. Replace `Math.random()` with `crypto.randomInt(100000, 1000000).toString()` for cryptographically secure 6-digit OTP generation.
  2. Remove `code` property from the return object of `forgotPassword`. Return only `{ success: true, message: 'If this email is associated with an active account, verification instructions have been dispatched.' }`.
  3. In development/testing environments (`NODE_ENV !== 'production'`), log the generated code safely using `this.logger.log` instead of sending it over the network to the client.
- **Verification:**
  - Calling `POST /auth/forgot-password` returns 200 with message, but response JSON contains NO `code` attribute.

### Task 3: Enforce CORS Allowed Origins Whitelist
- **Files:** `apps/api/src/main.ts`, `.env.example`
- **Actions:**
  1. Read `CORS_ALLOWED_ORIGINS` from environment variables (comma-separated, e.g. `http://localhost:3000,http://127.0.0.1:3000,https://app.yourdomain.com`).
  2. Configure `app.enableCors` with a callback validator that accepts requests matching allowed origins or no origin (mobile app native requests, Postman/curl).
  3. Reject unauthorized external origins.
  4. Document `CORS_ALLOWED_ORIGINS` in `.env.example`.
- **Verification:**
  - `curl -H "Origin: https://malicious-site.com"` receives no `Access-Control-Allow-Origin` header or is rejected.
  - `curl -H "Origin: http://localhost:3000"` receives `Access-Control-Allow-Origin: http://localhost:3000`.

### Task 4: Prevent Token Leakage in Query Parameters & Secure Media Fetching
- **Files:** `apps/api/src/auth/jwt-auth.guard.ts`, `apps/web/src/components/submissions/InspectionDossierDrawer.tsx`, `apps/mobile/lib/core/config/api_config.dart`
- **Actions:**
  1. In `jwt-auth.guard.ts`, remove `request.query?.token` and `request.query?.accessToken`.
  2. Enforce `Authorization: Bearer <token>` in headers.
  3. In `apps/web/.../InspectionDossierDrawer.tsx`, use an authenticated fetch blob mechanism rather than putting the user's master JWT in `<img src="...?token=...">`.
  4. In `apps/mobile/.../api_config.dart`, remove the optional `token` query param in `submissionPhotoFile` since `Image.network` already passes `headers: {'Authorization': 'Bearer $token'}`.
- **Verification:**
  - Querying any protected endpoint with `?token=<jwt>` returns `401 Unauthorized`.
  - Passing `Authorization: Bearer <jwt>` succeeds.
  - Inspection photos still display correctly in Web and Mobile.

### Task 5: Install & Configure Rate Limiting (`@nestjs/throttler`)
- **Files:** `apps/api/package.json`, `apps/api/src/app.module.ts`, `apps/api/src/auth/auth.controller.ts`
- **Actions:**
  1. Install `@nestjs/throttler` in `apps/api`.
  2. Configure `ThrottlerModule.forRoot([{ ttl: 60000, limit: 120 }])` in `app.module.ts`.
  3. Add `APP_GUARD` with `ThrottlerGuard` in `app.module.ts`.
  4. Apply strict limits on sensitive auth routes (`@Throttle({ default: { limit: 5, ttl: 60000 } })` on `/auth/login`, `/auth/forgot-password`, `/auth/reset-password`).
- **Verification:**
  - Exceeding 5 failed login attempts in 1 minute triggers `429 Too Many Requests`.

### Task 6: Global Validation Pipe & DTOs
- **Files:** `apps/api/package.json`, `apps/api/src/main.ts`, `apps/api/src/auth/dto/*.ts`
- **Actions:**
  1. Install `class-validator` and `class-transformer` in `apps/api`.
  2. In `main.ts`, add:
     ```ts
     app.useGlobalPipes(new ValidationPipe({
       whitelist: true,
       forbidNonWhitelisted: true,
       transform: true,
     }));
     ```
  3. Create validated DTO classes for auth inputs:
     - `LoginDto` with `@IsNotEmpty()`, `@IsString()`
     - `ForgotPasswordDto` with `@IsEmail()`, `@IsNotEmpty()`
     - `ResetPasswordDto` with `@IsEmail()`, `@IsNotEmpty()`, `@MinLength(10)`
- **Verification:**
  - Submitting unexpected fields or invalid email formats to `/auth/forgot-password` immediately rejects with `400 Bad Request`.

---

## 3. End-to-End Test & Verification
- Run automated security test script:
  - Verify admin backdoor is closed.
  - Verify forgot password OTP is not in response.
  - Verify query param token is rejected.
  - Verify rate limiter triggers HTTP 429 after threshold.
  - Verify invalid payloads are rejected by ValidationPipe with HTTP 400.
- Rebuild API and Web applications to ensure zero TypeScript errors.
