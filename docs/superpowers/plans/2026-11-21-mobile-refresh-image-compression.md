# Mobile Refresh & Real-Time Sync and Dual Image Compression Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eliminate stale cached data on the mobile app when projects and activities are updated on the web, and build an end-to-end image compression & review pipeline (client-side compression in Flutter + backend reviewer & sharp compressor in NestJS) that enforces sensible limits (~300KB-600KB output, max 15MB upload cap, 1920px Full HD), keeps photos crystal-clear for civil inspections, and ensures uniform quality across devices.

---

### Sensible Limits & Standards Specification
- **Max Image Dimensions**: 1920 × 1080 (Full HD, preserving original aspect ratio). This provides optimal resolution for structural civil inspections, crack details, chainage markers, and stamped HUD text while avoiding multi-megabyte sensor noise.
- **Client Compression (Mobile)**:
  - `image_picker`: Request `maxWidth: 1920`, `maxHeight: 1920`, `imageQuality: 85`.
  - `PhotoOverlayService`: Export as optimized JPEG (`quality: 85`) instead of raw uncompressed PNG. File size drops from ~15MB to ~350KB-600KB (~95% reduction).
- **Backend Reviewer & Compressor (API)**:
  - Upload Ceiling: Reject files > 15MB immediately at Multer layer.
  - Reviewer: Validate magic bytes, verify image can be decoded by `sharp`, extract metadata (width, height, original size).
  - Compressor: Re-compress uniformly to WebP/JPEG (max 1920x1920, 82% quality, metadata stripped except orientation) saving to storage disk and updating `fileSize` and `mimeType` in Prisma `site_submission_photos`.
- **Data Freshness (Mobile)**:
  - Add `AppLifecycleListener` on `MainNavigationScaffold` to automatically invalidate `projectsFutureProvider` and active `projectActivitiesFamily` on app resume.
  - Add explicit Refresh button in `ActivitySelectorSheet` header so supervisors can pull latest WBS tree instantly with 1 tap without closing the modal or logging out.
  - Add `RefreshIndicator` / pull-to-refresh on `SubmitDailyReportScreen` and `AttendanceScreen`.

---

## File Structure & Responsibilities

| File | Status | Responsibility |
| :--- | :--- | :--- |
| `apps/mobile/lib/features/projects/data/project_repository.dart` | Modified | Add helper functions to invalidate and refresh projects and activities. |
| `apps/mobile/lib/shared/widgets/main_navigation_scaffold.dart` | Modified | Add `AppLifecycleListener` / `WidgetsBindingObserver` to auto-refresh on app resume. |
| `apps/mobile/lib/features/submissions/presentation/widgets/activity_selector_sheet.dart` | Modified | Add manual refresh icon button in header and refresh on sheet mount. |
| `apps/mobile/lib/features/submissions/presentation/submit_daily_report_screen.dart` | Modified | Add pull-to-refresh (`RefreshIndicator`) and pass maxWidth/maxHeight to picker. |
| `apps/mobile/lib/features/attendance/presentation/attendance_screen.dart` | Modified | Add pull-to-refresh (`RefreshIndicator`) for project list. |
| `apps/mobile/lib/core/services/photo_overlay_service.dart` | Modified | Switch overlay export from lossless PNG to JPEG (`quality: 85`) using `package:image`. |
| `apps/api/src/common/services/image-processor.service.ts` | New | Backend image reviewer & compressor using `sharp` (validate, review, resize, compress). |
| `apps/api/src/site-submissions/site-submissions.controller.ts` | Modified | Integrate image processor in photo upload endpoint with 15MB limit and metadata tracking. |
| `apps/api/src/site-submissions/site-submissions.service.ts` | Modified | Store processed file size and uniform mime type in database. |
| `apps/mobile/test/photo_overlay_service_test.dart` | Modified | Verify compressed JPEG output format and size reduction. |
| `apps/api/src/common/services/image-processor.service.spec.ts` | New | Unit tests for backend reviewer, size validation, and compression. |

---

## Tasks

### Task 1: Mobile Data Freshness & Real-Time Sync
- [ ] Step 1.1: In `apps/mobile/lib/features/projects/data/project_repository.dart`, expose an explicit refresh helper `refreshProjects(WidgetRef ref)` and `refreshProjectActivities(WidgetRef ref, String projectId)`.
- [ ] Step 1.2: In `apps/mobile/lib/features/submissions/presentation/widgets/activity_selector_sheet.dart`, add a refresh icon button next to the "Select Activities" header that invalidates `projectActivitiesFamily(widget.projectId)` and shows an inline spinner.
- [ ] Step 1.3: In `apps/mobile/lib/features/submissions/presentation/submit_daily_report_screen.dart` and `attendance_screen.dart`, wrap the scroll view in `RefreshIndicator` triggering `ref.invalidate(projectsFutureProvider)`.
- [ ] Step 1.4: In `apps/mobile/lib/shared/widgets/main_navigation_scaffold.dart`, implement `WidgetsBindingObserver` to re-fetch projects and activities when `AppLifecycleState.resumed` fires.
- [ ] Step 1.5: Run `flutter test` to verify all widget and navigation tests pass.

### Task 2: Client-Side Image Compressor in Mobile
- [ ] Step 2.1: Update `PhotoOverlayService` in `apps/mobile/lib/core/services/photo_overlay_service.dart` to use `package:image` to encode the stamped canvas pixels to high-fidelity JPEG (`quality: 85`) instead of raw uncompressed PNG.
- [ ] Step 2.2: Ensure `image_picker` in `submit_daily_report_screen.dart` and `photo_picker_strip.dart` sets `maxWidth: 1920`, `maxHeight: 1920`, and `imageQuality: 85`.
- [ ] Step 2.3: Update `photo_overlay_service_test.dart` to assert image mime type is `image/jpeg` and verify that compressed bytes are significantly smaller than raw uncompressed bitmaps.
- [ ] Step 2.4: Run `flutter test` to ensure 100% test pass rate.

### Task 3: Backend Image Reviewer & Sharp Compressor Service
- [ ] Step 3.1: Create `apps/api/src/common/services/image-processor.service.ts` with `reviewAndCompressImage(filePath: string)` using `sharp`:
  - Check file size against 15MB hard limit.
  - Review image integrity, orientation, format, and dimensions.
  - Resize to max 1920×1920 (without enlarging), strip unneeded metadata, convert to optimized WebP/JPEG (82% quality).
  - Return `{ finalPath, mimeType, fileSize, width, height, compressionRatio }`.
- [ ] Step 3.2: Write unit test in `apps/api/src/common/services/image-processor.service.spec.ts` testing valid images, oversized images, and format conversion.
- [ ] Step 3.3: In `apps/api/src/site-submissions/site-submissions.controller.ts`, run `imageProcessor.reviewAndCompressImage` on uploaded photos before finalizing them in storage.
- [ ] Step 3.4: In `apps/api/src/site-submissions/site-submissions.service.ts`, record the compressed `fileSize` and `mimeType` in the `site_submission_photos` database record.
- [ ] Step 3.5: Run API unit tests with `npm --prefix apps/api run test`.

### Task 4: End-to-End Verification on Device & Web
- [ ] Step 4.1: Rebuild APK and deploy to physical device (`moto g54 5G`).
- [ ] Step 4.2: Test data freshness: Add a new activity on Web App (e.g. `ACT3 - Electrical Ducting`), tap refresh on mobile Activity Selector &rarr; Verify `ACT3` immediately appears without logging out.
- [ ] Step 4.3: Test image compression: Take photo on device, submit daily report &rarr; Verify uploaded photo file size in Postgres and storage is ~200KB-600KB (compared to previous ~10MB+) and visually crisp with legible text overlay.
- [ ] Step 4.4: Verify Web Dossier drawer loads the compressed photo quickly and renders properly.
