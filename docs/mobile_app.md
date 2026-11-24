# Karya Setu - Site Reports — Mobile Application Documentation

## 1. Overview

**Karya Setu - Site Reports** is a multi-role Flutter mobile application built for civil engineering field operations under **YEC India**. Designed for use across all site roles — including **Supervisors, Site Engineers, and Project Managers** — it facilitates mandatory daily progress reporting, attendance punch in/out with GPS geofencing, multi-photo documentation with tamper-evident digital watermarking, and historical submission audits.

- **Platform**: Flutter (Android & iOS)
- **App Name**: `Karya Setu - Site Reports`
- **Version**: `1.0.0` (Build `1`)
- **Application Package / Bundle ID**: `com.vyhir.civil_erp`
- **Primary Color / Theme**: Emerald Green (`#0A5C36`)
- **State Management**: Flutter Riverpod (`flutter_riverpod`)
- **Routing**: GoRouter (`go_router`)

---

## 2. Architecture & Directory Structure

The mobile codebase follows a **Feature-First Architecture** inside `apps/mobile/lib/`:

```
apps/mobile/
├── android/                        # Native Android configuration & manifests
├── assets/
│   └── images/                     # App branding & logo assets
│       └── yec_logo.png            # YEC India corporate logo
├── lib/
│   ├── core/                       # Core infrastructure services & configuration
│   │   ├── config/
│   │   │   └── api_config.dart     # Backend API base URL & endpoints
│   │   ├── network/
│   │   │   └── api_client.dart     # HTTP client with JWT interceptor & auto-retry
│   │   ├── services/
│   │   │   ├── location_service.dart     # GPS acquisition & coordinate verification
│   │   │   └── photo_overlay_service.dart# Canvas watermark card engine
│   │   ├── storage/
│   │   │   └── secure_storage_service.dart # Encrypted token & session persistence
│   │   └── theme/
│   │       └── app_theme.dart      # Emerald Green theme definitions & typography
│   ├── features/
│   │   ├── attendance/             # Attendance, GPS shift punch in/out
│   │   │   ├── data/attendance_repository.dart
│   │   │   └── presentation/attendance_screen.dart
│   │   ├── auth/                   # Authentication & secure 2-step OTP password reset
│   │   │   ├── data/auth_repository.dart
│   │   │   └── presentation/
│   │   │       ├── login_screen.dart
│   │   │       └── forgot_password_screen.dart
│   │   ├── history/                # Historical submission list and report inspection
│   │   │   └── presentation/
│   │   │       ├── previous_reports_screen.dart
│   │   │       └── report_detail_screen.dart
│   │   ├── profile/                # Supervisor ID, basic info & photo update
│   │   │   └── presentation/supervisor_id_screen.dart
│   │   ├── projects/               # Project selection & activity models
│   │   │   ├── data/project_repository.dart
│   │   │   └── domain/
│   │   │       ├── activity_model.dart
│   │   │       └── project_model.dart
│   │   └── submissions/            # Daily report submission & photo strip
│   │       ├── data/submission_repository.dart
│   │       ├── domain/submission_model.dart
│   │       └── presentation/
│   │           ├── submit_daily_report_screen.dart
│   │           └── widgets/
│   │               ├── activity_selector_sheet.dart
│   │               └── photo_picker_strip.dart
│   ├── shared/
│   │   └── widgets/main_navigation_scaffold.dart
│   └── main.dart                   # Application entrypoint & ProviderScope
└── test/
    ├── corner_cases_mobile_test.dart  # Corner case test suite (GPS, bounds, validation)
    ├── photo_overlay_service_test.dart# Watermark canvas generator test suite
    ├── responsive_layout_test.dart    # 320px–600px & 1.5x text scale responsive tests
    └── widget_test.dart               # Core widget and screen smoke tests
```

---

## 3. Core Features & User Workflows

### 3.1 Authentication & Security
- **Login Screen** (`login_screen.dart`):
  - Operator ID / Email and password authentication against `POST /api/v1/auth/login`.
  - Persists JWT access and refresh tokens using Android Keystore / iOS Keychain via `flutter_secure_storage`.
  - Displays YEC India branding and logo.
- **Forgot Password Flow** (`forgot_password_screen.dart`):
  - **Step 1**: Request 6-digit OTP to registered mobile or email (`POST /api/v1/auth/forgot-password/request-otp`).
  - **Step 2**: Verify OTP and enter new password (`POST /api/v1/auth/forgot-password/verify-and-reset`).
  - Eliminates insecure direct resets.

### 3.2 Shift Attendance & GPS Verification
- **Attendance Screen** (`attendance_screen.dart`):
  - Provides a single prominent **PUNCH IN SHIFT** / **PUNCH OUT SHIFT** action button.
  - Automatically captures high-accuracy GPS coordinates (Latitude, Longitude, Accuracy).
  - Displays live shift timer (`HH:mm:ss`), in-time, and out-time.
  - Displays supervisor avatar and quick links to submit reports.

### 3.3 Daily Progress Report Submission (Mandatory Rules)
- **Submit Daily Report Screen** (`submit_daily_report_screen.dart`):
  - **Mandatory Validation Checklist**:
    1. **Project Selection (`* Mandatory`)**: Must be selected from assigned projects.
    2. **Start & End Chainage (`* Mandatory`)**: Must contain raw numeric meter values (e.g. `1450` start chainage to `1800` end chainage).
    3. **Project Activities (`* Mandatory`)**: At least 1 activity must be chosen.
    4. **Site Photographs (`* Mandatory`)**: At least 1 stamped site photo must be attached. Submission is strictly blocked if 0 photos are attached.
  - **Real-time Span Calculation**: Automatically calculates extent (e.g. `350m span` or `X.XX km span`).
  - **Photo Strip & Tamper-Proof Watermark**:
    - Integrated camera capture and gallery picker.
    - Stamped with top HUD overlay badge:
      - App & Organization: `● KARYA SETU - SITE REPORTS • AUDIT`
      - High-precision timestamp: `dd-MMM-yyyy • hh:mm:ss a`
      - GPS Coordinates: `📍 Lat xx.xxxxxx°, Long xx.xxxxxx° (±X.Xm)`
      - Chainage Range: `📏 CHAINAGE: 1450 ➜ 1800`
      - Project Title: `PROJECT NAME`

### 3.4 History & Report Inspection
- **Previous Reports Screen** (`previous_reports_screen.dart`):
  - Lists historical submissions with search filter, date sorting, and status chips (Submitted, Approved, Draft).
- **Report Detail Screen** (`report_detail_screen.dart`):
  - Detailed audit breakdown with supervisor info, project meta, activities, notes, and interactive thumbnail gallery.
  - Full-screen high-resolution photo viewer.
  - Layout is fully responsive and immune to overflow on small displays.

### 3.5 Supervisor Profile & Details
- **Supervisor ID Screen** (`supervisor_id_screen.dart`):
  - Allows the supervisor to view and edit basic contact information:
    - Full Name
    - Mobile Number
    - Emergency Contact (Phone Number)
  - Profile avatar upload and update (persisted directly to backend user records).
  - Synchronizes changes instantly across the app and navigation drawer.

---

## 4. Responsive Design & Layout Guidelines

The app is built to support a wide range of rugged and standard Android/iOS field devices:
- **Screen Widths Supported**: 320px (e.g. compact field devices) up to 600px+ (tablets/foldables).
- **Font Scaling**: Resilient against Android accessibility text scaling up to **1.5x**.
- **Flex Rules**:
  - Always wrap dynamic text in `Row` within `Expanded` or `Flexible` with `TextOverflow.ellipsis`.
  - Use `Wrap` instead of horizontal `Row` for badges, tags, and multi-line headers.
  - Wrap content bodies in `SingleChildScrollView` to prevent keyboard or small-screen vertical overflows.

---

## 5. Development & Build Commands

### Prerequisites
- Flutter SDK 3.24+ / Dart 3.5+
- Android Studio / Android SDK Platform 34+
- Physical Android device with USB debugging enabled or Android Emulator

### Environment Setup
The app connects to the NestJS backend via `lib/core/config/api_config.dart`.
- Local device with ADB reverse: `http://127.0.0.1:3001`
- Android Emulator: `http://10.0.2.2:3001`

```bash
# Enable ADB port forwarding when running with a physical USB device
adb reverse tcp:3001 tcp:3001
```

### Running Tests & Static Analysis
```bash
cd apps/mobile

# Run static analysis
flutter analyze

# Run all automated unit and widget tests
flutter test

# Run responsive layout test suite specifically
flutter test test/responsive_layout_test.dart
```

### Building Application Binaries
```bash
cd apps/mobile

# Build Debug APK
flutter build apk --debug

# Build Release APK
flutter build apk --release

# Install to connected device
adb install -r build/app/outputs/flutter-apk/app-debug.apk
```
