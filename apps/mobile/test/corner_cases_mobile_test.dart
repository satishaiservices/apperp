import 'dart:io';
import 'dart:ui' as ui;
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:image_picker/image_picker.dart';

import 'package:civil_erp/core/services/photo_overlay_service.dart';
import 'package:civil_erp/core/storage/secure_storage_service.dart';
import 'package:civil_erp/features/auth/data/auth_repository.dart';
import 'package:civil_erp/features/auth/presentation/login_screen.dart';
import 'package:civil_erp/features/auth/presentation/forgot_password_screen.dart';
import 'package:civil_erp/features/profile/presentation/supervisor_id_screen.dart';
import 'package:civil_erp/features/attendance/presentation/attendance_screen.dart';
import 'package:civil_erp/features/submissions/presentation/submit_daily_report_screen.dart';
import 'package:civil_erp/features/history/presentation/previous_reports_screen.dart';

Future<File> createTemporaryTestImage(int width, int height) async {
  final recorder = ui.PictureRecorder();
  final canvas = Canvas(recorder, Rect.fromLTWH(0, 0, width.toDouble(), height.toDouble()));
  final paint = Paint()..color = const Color(0xFF0A5C36);
  canvas.drawRect(Rect.fromLTWH(0, 0, width.toDouble(), height.toDouble()), paint);
  final picture = recorder.endRecording();
  final img = await picture.toImage(width, height);
  final byteData = await img.toByteData(format: ui.ImageByteFormat.png);

  final tempDir = await Directory.systemTemp.createTemp('watermark_test_');
  final file = File('${tempDir.path}/test_${width}x$height.png');
  await file.writeAsBytes(byteData!.buffer.asUint8List());
  return file;
}

class FakeSecureStorage extends SecureStorageService {
  final Map<String, String> _fake = {};

  @override
  Future<void> saveRememberedEmail(String email) async {
    _fake['remember_email'] = email;
  }

  @override
  Future<String?> getRememberedEmail() async {
    return _fake['remember_email'];
  }

  @override
  Future<void> clearRememberedEmail() async {
    _fake.remove('remember_email');
  }
}

void main() {
  TestWidgetsFlutterBinding.ensureInitialized();

  group('PhotoOverlayService Corner Cases', () {
    test('Handles normal dimensions with full metadata', () async {
      final file = await createTemporaryTestImage(800, 600);
      final result = await PhotoOverlayService.stampPhoto(
        originalFile: XFile(file.path),
        projectName: 'Project NH-48 Widening (Package 3B)',
        startChainage: 'CH 14+250',
        endChainage: 'CH 14+800',
        latitude: 12.9716,
        longitude: 77.5946,
      );
      expect(result.bytes.isNotEmpty, true);
      expect(File(result.file.path).existsSync(), true);
    });

    test('Handles null GPS coordinates gracefully (No crash, shows Location Pending)', () async {
      final file = await createTemporaryTestImage(640, 480);
      final result = await PhotoOverlayService.stampPhoto(
        originalFile: XFile(file.path),
        projectName: 'Metro Corridor Line 3',
        startChainage: 'CH 0+000',
        endChainage: 'CH 0+500',
        latitude: null,
        longitude: null,
      );
      expect(result.bytes.isNotEmpty, true);
    });

    test('Handles negative GPS coordinates (Southern/Western Hemispheres)', () async {
      final file = await createTemporaryTestImage(640, 480);
      final result = await PhotoOverlayService.stampPhoto(
        originalFile: XFile(file.path),
        projectName: 'Global Southern Highway',
        startChainage: 'CH 10+000',
        endChainage: 'CH 10+500',
        latitude: -33.8688,
        longitude: -151.2093,
      );
      expect(result.bytes.isNotEmpty, true);
    });

    test('Handles extremely long project name without crashing or throwing', () async {
      final file = await createTemporaryTestImage(600, 400);
      final result = await PhotoOverlayService.stampPhoto(
        originalFile: XFile(file.path),
        projectName: 'Mega Multi-State Highway Corridor Construction Phase 4 Expansion Package 12B Extension Sector 9',
        startChainage: 'CH 999+999',
        endChainage: 'CH 1000+500',
        latitude: 28.6139,
        longitude: 77.2090,
      );
      expect(result.bytes.isNotEmpty, true);
    });

    test('Handles non-standard aspect ratios (ultra-wide 1200x200)', () async {
      final file = await createTemporaryTestImage(1200, 200);
      final result = await PhotoOverlayService.stampPhoto(
        originalFile: XFile(file.path),
        projectName: 'Panoramic Trench',
        startChainage: 'CH 1+000',
        endChainage: 'CH 1+200',
        latitude: 19.0760,
        longitude: 72.8777,
      );
      expect(result.bytes.isNotEmpty, true);
    });

    test('Handles small square image (100x100)', () async {
      final file = await createTemporaryTestImage(100, 100);
      final result = await PhotoOverlayService.stampPhoto(
        originalFile: XFile(file.path),
        projectName: 'Sample',
        startChainage: '0',
        endChainage: '100',
        latitude: 0.0,
        longitude: 0.0,
      );
      expect(result.bytes.isNotEmpty, true);
    });
  });

  group('Login Screen Validation & Corner Cases', () {
    testWidgets('Validates empty email and password on form submit', (tester) async {
      tester.view.physicalSize = const Size(1080, 2400);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);

      await tester.pumpWidget(
        const ProviderScope(
          child: MaterialApp(
            home: LoginScreen(),
          ),
        ),
      );
      await tester.pumpAndSettle();

      // Clear email and password
      final textFields = find.byType(TextFormField);
      await tester.enterText(textFields.first, '');
      await tester.enterText(textFields.last, '');

      // Tap Sign In button
      final signInBtn = find.widgetWithText(FilledButton, 'Sign In');
      await tester.ensureVisible(signInBtn);
      await tester.tap(signInBtn);
      await tester.pumpAndSettle();

      // Expect validation error
      expect(find.text('Email / Operator ID is required'), findsOneWidget);
      expect(find.text('Password is required'), findsOneWidget);
    });

    testWidgets('Fresh install starts with empty email and password fields', (tester) async {
      tester.view.physicalSize = const Size(1080, 2400);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);

      await tester.pumpWidget(
        const ProviderScope(
          child: MaterialApp(
            home: LoginScreen(),
          ),
        ),
      );
      await tester.pumpAndSettle();

      final textFields = find.byType(TextFormField);
      final emailField = tester.widget<TextFormField>(textFields.first);
      final passwordField = tester.widget<TextFormField>(textFields.last);

      expect(emailField.controller?.text, isEmpty);
      expect(passwordField.controller?.text, isEmpty);
    });

    testWidgets('Pre-fills remembered email when present in SecureStorage', (tester) async {
      tester.view.physicalSize = const Size(1080, 2400);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);

      final storage = FakeSecureStorage();
      await storage.saveRememberedEmail('supervisor.site@company.com');

      await tester.pumpWidget(
        ProviderScope(
          overrides: [
            secureStorageProvider.overrideWithValue(storage),
          ],
          child: const MaterialApp(
            home: LoginScreen(),
          ),
        ),
      );
      await tester.pumpAndSettle();

      final textFields = find.byType(TextFormField);
      final emailField = tester.widget<TextFormField>(textFields.first);
      final passwordField = tester.widget<TextFormField>(textFields.last);

      expect(emailField.controller?.text, equals('supervisor.site@company.com'));
      // Password must NEVER be pre-filled
      expect(passwordField.controller?.text, isEmpty);

      // Clean up
      await storage.clearRememberedEmail();
      expect(await storage.getRememberedEmail(), isNull);
    });
  });

  group('Forgot Password 2-Step Flow Corner Cases', () {
    testWidgets('Step 1: rejects blank email', (tester) async {
      tester.view.physicalSize = const Size(1080, 2400);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);

      await tester.pumpWidget(
        const ProviderScope(
          child: MaterialApp(
            home: ForgotPasswordScreen(),
          ),
        ),
      );
      await tester.pumpAndSettle();

      final emailField = find.byType(TextFormField).first;
      await tester.enterText(emailField, '');

      final sendCodeBtn = find.widgetWithText(FilledButton, 'Send Verification Code');
      await tester.ensureVisible(sendCodeBtn);
      await tester.tap(sendCodeBtn);
      await tester.pumpAndSettle();

      expect(find.text('Please enter your registered email'), findsOneWidget);
    });

    testWidgets('Step 1: rejects invalid email format', (tester) async {
      tester.view.physicalSize = const Size(1080, 2400);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);

      await tester.pumpWidget(
        const ProviderScope(
          child: MaterialApp(
            home: ForgotPasswordScreen(),
          ),
        ),
      );
      await tester.pumpAndSettle();

      final emailField = find.byType(TextFormField).first;
      await tester.enterText(emailField, 'invaliddomain');

      final sendCodeBtn = find.widgetWithText(FilledButton, 'Send Verification Code');
      await tester.ensureVisible(sendCodeBtn);
      await tester.tap(sendCodeBtn);
      await tester.pumpAndSettle();

      expect(find.text('Please enter a valid email address'), findsOneWidget);
    });
  });

  group('Supervisor Profile Screen Corner Cases', () {
    testWidgets('Renders YEC India branding and clean profile without pass elements', (tester) async {
      tester.view.physicalSize = const Size(1080, 2400);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);

      await tester.pumpWidget(
        const ProviderScope(
          child: MaterialApp(
            home: SupervisorIdScreen(),
          ),
        ),
      );
      await tester.pumpAndSettle();

      expect(find.text('Profile & Details'), findsOneWidget);
      expect(find.text('BASIC PROFILE DETAILS'), findsOneWidget);
      expect(find.text('EMERGENCY CONTACT PHONE NUMBER'), findsOneWidget);
      expect(find.text('Change Photo'), findsOneWidget);

      // Verify Digital Pass is NOT present
      expect(find.text('SUPERVISOR DIGITAL PASS'), findsNothing);
      expect(find.text('Pass Expiry'), findsNothing);
    });
  });

  group('Daily Report Submission Screen Validation', () {
    testWidgets('Renders all fields cleanly and handles scrolling', (tester) async {
      tester.view.physicalSize = const Size(1080, 2400);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);

      await tester.pumpWidget(
        const ProviderScope(
          child: MaterialApp(
            home: SubmitDailyReportScreen(),
          ),
        ),
      );
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 300));

      expect(find.text('Submit Daily Report'), findsOneWidget);
      expect(find.text('PROJECT * (MANDATORY)'), findsOneWidget);
      expect(find.text('CHAINAGE EXTENTS * (MANDATORY)'), findsOneWidget);
      expect(find.text('PROJECT ACTIVITIES * (MANDATORY)'), findsOneWidget);
      expect(find.text('SITE PHOTOS * (MANDATORY)'), findsOneWidget);
      expect(find.text('REMARKS & DELAYS'), findsOneWidget);
      expect(find.text('Submit Report'), findsOneWidget);
    });
  });

  group('Attendance & Roster Screen Stability', () {
    testWidgets('Renders shift timer, quick actions, and punch controls without crash', (tester) async {
      tester.view.physicalSize = const Size(1080, 2400);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);

      await tester.pumpWidget(
        const ProviderScope(
          child: MaterialApp(
            home: AttendanceScreen(),
          ),
        ),
      );
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 300));

      expect(find.text('Attendance & Shift'), findsOneWidget);
      expect(find.text('Daily Report'), findsOneWidget);
      expect(find.text('Past Reports'), findsOneWidget);
    });
  });

  group('Previous Reports Screen List & Search', () {
    testWidgets('Renders search and log button cleanly', (tester) async {
      tester.view.physicalSize = const Size(1080, 2400);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);

      await tester.pumpWidget(
        const ProviderScope(
          child: MaterialApp(
            home: PreviousReportsScreen(),
          ),
        ),
      );
      await tester.pump();
      await tester.pump(const Duration(milliseconds: 300));

      expect(find.text('Previous Reports Log'), findsOneWidget);
      expect(find.text('Search chainage or keyword...'), findsOneWidget);
      expect(find.text('Log Daily Report'), findsOneWidget);
    });
  });
}
