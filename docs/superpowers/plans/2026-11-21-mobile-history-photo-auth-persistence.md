# Plan: Fix Mobile History Tab Photo Loading & Token Refresh Persistence

## Problem Statement
In the mobile app History tab (`PreviousReportsScreen` and `ReportDetailScreen`), photo thumbnails and full-screen previews frequently fail to load with broken image icons after normal usage. The user must log out and log back in for images to display again.

## Root Cause Analysis
1. **15-Minute Access Token Expiration**:
   - Backend `AuthModule` issues access tokens with `expiresIn: '15m'`.
   - When 15 minutes pass, the access token expires.
2. **`authProvider` Desynchronization on Refresh**:
   - When API calls (e.g. `getSubmissions`) receive a 401, `ApiClient.dio`'s error interceptor calls `/auth/refresh`, saves the new token to `SecureStorageService`, and retries the API call.
   - However, `ApiClient` never notifies Riverpod's `authProvider`. `ref.watch(authProvider).token` retains the stale, expired token in memory.
3. **`Image.network` Bypasses `ApiClient`**:
   - Flutter's `Image.network` uses `dart:io`'s raw `HttpClient` with headers `{ 'Authorization': 'Bearer $token' }` using the stale token from `authProvider`.
   - When the backend returns 401 Unauthorized, `Image.network` cannot refresh the token, fails immediately, and triggers `errorBuilder: Icons.broken_image_rounded`.
   - Flutter's `PaintingBinding.instance.imageCache` caches this broken state. Pulling to refresh does not fix it because `authProvider.token` remains expired until a manual logout/login replaces it.
4. **Backend `JwtAuthGuard` Lacks Query Token Support**:
   - `JwtAuthGuard` strictly enforces `request.headers.authorization` and rejects query tokens (`?token=...`).

## Proposed Architecture & Fix

### Task 1: Backend `JwtAuthGuard` Query Token & Cache Header
- Update `apps/api/src/auth/jwt-auth.guard.ts` to inspect `request.query?.token` as a valid authentication fallback when `Authorization` header is not present or when media elements fetch directly.
- Add `Cache-Control: private, max-age=86400` to `getPhoto` in `apps/api/src/site-submissions/site-submissions.controller.ts`.

### Task 2: `ApiClient` Token Refresh Callback & Byte Downloader
- In `apps/mobile/lib/core/network/api_client.dart`:
  - Add `void Function(String newAccessToken)? onTokenRefreshed;` callback.
  - Call `onTokenRefreshed?.call(newAccessToken)` inside the 401 refresh handler.
  - Implement `Future<Uint8List> getBytes(String url)` using `dio.get<List<int>>` with `ResponseType.bytes`. This ensures all photo downloads automatically use the 401 refresh and retry interceptor.

### Task 3: `AuthNotifier` Reactive Synchronization
- In `apps/mobile/lib/features/auth/data/auth_repository.dart`:
  - Wire `apiClient.onTokenRefreshed` to update `state = state.copyWith(token: newToken)`.
  - Add `void updateToken(String newToken)` to `AuthNotifier`.

### Task 4: Reusable `AuthenticatedImage` Widget on Mobile
- Create `apps/mobile/lib/shared/widgets/authenticated_image.dart`:
  - High-performance, memory-cached image loader for authenticated endpoints.
  - Uses `ImageCacheManager` / in-memory `Uint8List` dictionary to prevent re-fetching on scroll.
  - Uses `ref.read(apiClientProvider).getBytes(url)` to fetch authenticated bytes with automatic 401 token refresh.
  - Renders `Image.memory` with smooth fade-in, loading placeholder, and 1-tap retry on failure.

### Task 5: Refactor History Screens
- In `apps/mobile/lib/features/history/presentation/previous_reports_screen.dart` and `report_detail_screen.dart`:
  - Replace `Image.network` in thumbnail lists and full-screen preview modals with `AuthenticatedImage`.

### Task 6: Automated Testing & Live Verification
- Unit test for `ApiClient` `onTokenRefreshed` and `getBytes`.
- Unit test for `JwtAuthGuard` accepting `?token=`.
- Widget test for `AuthenticatedImage`.
- Build APK, deploy to connected `moto g54 5G`, and verify live.
