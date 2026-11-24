# Implementation Plan: Phase 2 - Auth Lifecycle & Web Application Resilience

**Goal:** Implement rotating refresh tokens across backend, web, and mobile to ensure seamless, long-lived sessions, configure Next.js edge route middleware, enforce production HTTP security headers, and add robust React error boundaries.

---

## 1. File Structure & Responsibilities

| File | Responsibility |
| :--- | :--- |
| `apps/api/src/auth/auth.service.ts` | Generate rotating refresh tokens (`7d`) on login; implement `refreshToken` verification and re-issuance. |
| `apps/api/src/auth/auth.controller.ts` | Expose `POST /auth/refresh` endpoint with rate limiting. |
| `apps/api/src/auth/dto/auth.dto.ts` | Add `RefreshTokenDto` with validation. |
| `apps/web/src/lib/api-client.ts` | Intercept 401s, perform silent refresh with stored refresh token, replay pending requests, set session cookie. |
| `apps/mobile/lib/core/storage/secure_storage_service.dart` | Store and retrieve `refreshToken`. |
| `apps/mobile/lib/features/auth/data/auth_repository.dart` | Save refresh token on login and handle token refresh calls. |
| `apps/mobile/lib/core/network/api_client.dart` | Add Dio interceptor to seamlessly refresh access token on 401 responses. |
| `apps/web/src/middleware.ts` | Server-side Next.js route protection for `/org/*` and `/platform/*`. |
| `apps/web/next.config.ts` | Add production security headers (`CSP`, `HSTS`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`). |
| `apps/web/src/app/error.tsx` | Next.js route segment error boundary with retry UI. |
| `apps/web/src/app/global-error.tsx` | Root Next.js error boundary. |
| `apps/web/src/app/not-found.tsx` | 404 page styled in Emerald Green design system. |

---

## 2. Step-by-Step Execution Plan

### Task 1: Backend Refresh Token Mechanism
- **Files:** `apps/api/src/auth/dto/auth.dto.ts`, `apps/api/src/auth/auth.service.ts`, `apps/api/src/auth/auth.controller.ts`
- **Actions:**
  1. In `auth.dto.ts`, add `RefreshTokenDto` requiring a non-empty string `refreshToken`.
  2. In `auth.service.ts`, create helper `createTokens(user, tenantId, membershipId, roles, isPlatformAdmin)`:
     - Access token expires in `15m` (`900s`).
     - Refresh token signed with `{ sub: user.id, type: 'refresh', tenantId, membershipId }` expiring in `7d`.
  3. Include `refreshToken` in login return payload.
  4. Implement `refreshToken(input: RefreshTokenDto)`:
     - Verify JWT signature and ensure `payload.type === 'refresh'`.
     - Confirm user is `status: 'ACTIVE'`.
     - If not platform admin, verify tenant membership is `membershipStatus: 'ACTIVE'`.
     - Generate and return new access token and revolving refresh token.
  5. In `auth.controller.ts`, expose `@Post('refresh')` with `@Throttle({ default: { limit: 20, ttl: 60000 } })`.
- **Verification:**
  - Test `POST /auth/refresh` with valid refresh token returns new access token & refresh token.
  - Test `POST /auth/refresh` with invalid/tampered token returns `401 Unauthorized`.

### Task 2: Web Client Silent Token Refresh & Cookie Sync
- **Files:** `apps/web/src/lib/api-client.ts`, `apps/web/src/context/auth-context.tsx`
- **Actions:**
  1. In `api-client.ts`, store `vyhir_refresh_token` in `localStorage` on login and write `vyhir_token` to `document.cookie` (for Next.js middleware).
  2. In `apiRequest`:
     - If response is `401 Unauthorized` and `url !== '/auth/login'` and `url !== '/auth/refresh'`:
       - Attempt silent refresh via `POST /auth/refresh` with `vyhir_refresh_token`.
       - If refresh succeeds, update tokens in `localStorage` and `document.cookie`, and replay the failed request.
       - If refresh fails, clear tokens, wipe cookie, and redirect to `/login`.
- **Verification:**
  - Mock an expired access token; verify that `apiRequest` silently refreshes tokens and succeeds without logging out the user.

### Task 3: Mobile Client Silent Token Refresh (Dio Interceptor)
- **Files:** `apps/mobile/lib/core/storage/secure_storage_service.dart`, `apps/mobile/lib/features/auth/data/auth_repository.dart`, `apps/mobile/lib/core/network/api_client.dart`
- **Actions:**
  1. In `secure_storage_service.dart`, add `saveRefreshToken(String token)`, `getRefreshToken()`, and clean it up in `clearSession()`.
  2. In `auth_repository.dart`, save `refreshToken` from login response.
  3. In `api_client.dart`, add an `onError` QueuedInterceptor in Dio:
     - When receiving `401`:
       - Call `POST /auth/refresh` using stored refresh token.
       - On success: store new tokens and retry the original request with the fresh token.
       - On failure: call logout and redirect to login.
- **Verification:**
  - Run `flutter test` to verify mobile test suite passes.

### Task 4: Next.js Edge Route Middleware
- **Files:** `apps/web/src/middleware.ts`
- **Actions:**
  1. Create `middleware.ts` matching `/org/:path*`, `/platform/:path*`, `/login`.
  2. Inspect `vyhir_token` cookie.
  3. If unauthenticated user accesses `/org/*` or `/platform/*`, redirect to `/login` with `redirect` search param.
  4. If authenticated user accesses `/login`, redirect to `/org/dashboard`.
- **Verification:**
  - Accessing `http://localhost:3000/org/dashboard` without cookie immediately redirects to `/login`.

### Task 5: Production HTTP Security Headers in Next.js
- **Files:** `apps/web/next.config.ts`
- **Actions:**
  1. Add `headers()` configuration returning `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Strict-Transport-Security`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Content-Security-Policy`.
- **Verification:**
  - Build `apps/web` and verify response headers via curl.

### Task 6: Error Boundaries & 404 Page
- **Files:** `apps/web/src/app/error.tsx`, `apps/web/src/app/global-error.tsx`, `apps/web/src/app/not-found.tsx`
- **Actions:**
  1. Implement `error.tsx` (client component) with retry button, error reference ID, and back-to-dashboard navigation.
  2. Implement `global-error.tsx` for root crashes.
  3. Implement `not-found.tsx` styled with the Emerald Green theme and a return button.
- **Verification:**
  - Run Next.js production build (`npm run build`) with zero errors.

---

## 3. End-to-End Test & Verification
- Test `POST /auth/refresh` API flow.
- Test web silent refresh and cookie synchronization.
- Test edge middleware redirection.
- Verify security headers in curl response.
- Run mobile test suite (`flutter test`).
