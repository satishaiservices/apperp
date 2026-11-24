# Karya Setu - Site Reports — Mobile App (Flutter)

A Flutter application built for civil engineering field operations (Supervisors, Engineers, and Managers) working with **YEC India**.

For full architecture, workflows, UI guidelines, and test instructions, see the comprehensive [Mobile App Documentation](file:///home/embdev/workspace/embdev/IT_projects/CivilERP/docs/mobile_app.md).

## Quick Start

### 1. Prerequisites
- Flutter 3.24+ / Dart 3.5+
- Android SDK Platform 34+
- USB Debugging enabled on physical device or Android Emulator

### 2. Configure Device Port Forwarding
```bash
# If using a physical USB device, forward API port 3001
adb reverse tcp:3001 tcp:3001
```

### 3. Run and Test
```bash
# Analyze code
flutter analyze

# Run unit, widget, and responsive layout tests
flutter test

# Run app on connected device
flutter run
```

### 4. Build APK
```bash
# Debug APK
flutter build apk --debug

# Install to connected device
adb install -r build/app/outputs/flutter-apk/app-debug.apk
```
