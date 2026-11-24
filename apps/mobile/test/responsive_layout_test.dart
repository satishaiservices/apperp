import 'dart:typed_data';
import 'package:civil_erp/core/config/api_config.dart';
import 'package:civil_erp/shared/widgets/authenticated_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:civil_erp/features/attendance/presentation/attendance_screen.dart';
import 'package:civil_erp/features/submissions/presentation/submit_daily_report_screen.dart';
import 'package:civil_erp/features/history/presentation/previous_reports_screen.dart';
import 'package:civil_erp/features/history/presentation/report_detail_screen.dart';
import 'package:civil_erp/features/profile/presentation/supervisor_id_screen.dart';
import 'package:civil_erp/features/auth/presentation/login_screen.dart';
import 'package:civil_erp/features/submissions/domain/submission_model.dart';
import 'package:civil_erp/features/projects/domain/activity_model.dart';

final mockReport = SubmissionModel(
  id: 'sub-1',
  projectId: 'proj-1',
  projectName: 'Metro Corridor Line 3 Underground Section Express',
  projectCode: 'PRJ-METRO-03',
  startChainage: 'CH 14+250 (Section 4A)',
  endChainage: 'CH 14+800 (Section 4B)',
  latitude: 28.613939,
  longitude: 77.209021,
  locationAccuracyM: 12.5,
  remarks: 'Earthwork excavation and compaction completed along span 550m with moisture control.',
  submittedAt: DateTime(2026, 11, 14, 10, 45),
  supervisorName: 'Senior Supervisor Marcus Autelius',
  activities: const [
    ActivityModel(id: 'act-1', name: 'Earthwork Excavation', activityCode: 'ACT-01'),
    ActivityModel(id: 'act-2', name: 'Sub-grade Compaction', activityCode: 'ACT-02'),
  ],
  photos: [
    SubmissionPhotoModel(
      id: 'photo-1',
      storageKey: 'key-1',
      mimeType: 'image/jpeg',
      fileSize: 1024,
      uploadedAt: DateTime.now(),
    ),
  ],
);

void main() {
  setUpAll(() {
    final transparentPng = Uint8List.fromList([
      0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
      0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x08, 0x06, 0x00, 0x00, 0x00, 0x1F, 0x15, 0xC4, 0x89, 0x00, 0x00, 0x00,
      0x0A, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9C, 0x63, 0x00, 0x01, 0x00, 0x00,
      0x05, 0x00, 0x01, 0x0D, 0x0A, 0x2D, 0xB4, 0x00, 0x00, 0x00, 0x00, 0x49,
      0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82,
    ]);
    AuthenticatedImageCache.put(
      ApiConfig.submissionPhotoFile('sub-1', 'photo-1'),
      transparentPng,
    );
  });

  const testScreenSizes = [
    Size(320, 568),  // iPhone SE 1st gen / ultra compact
    Size(360, 640),  // Compact Android (common budget devices)
    Size(390, 844),  // Modern phone
    Size(600, 960),  // Foldable / Mini tablet
  ];

  for (final size in testScreenSizes) {
    group('Responsive layout test at ${size.width}x${size.height}', () {
      testWidgets('AttendanceScreen renders with 0 overflow errors', (tester) async {
        tester.view.physicalSize = size;
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
        await tester.pump(const Duration(milliseconds: 100));

        final err = tester.takeException();
        if (err is FlutterError) {
          debugPrint('>>> DIAGNOSTICS: ${err.diagnostics.map((d) => d.toString()).join("\n")}');
        }
        expect(err, isNull,
            reason: 'No RenderFlex overflow on ${size.width}x${size.height}');
      });

      testWidgets('SubmitDailyReportScreen renders with 0 overflow errors', (tester) async {
        tester.view.physicalSize = size;
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
        await tester.pump(const Duration(milliseconds: 100));

        final err = tester.takeException();
        if (err is FlutterError) {
          debugPrint('>>> DIAGNOSTICS: ${err.diagnostics.map((d) => d.toString()).join("\n")}');
        }
        expect(err, isNull,
            reason: 'No RenderFlex overflow on ${size.width}x${size.height}');
      });

      testWidgets('ReportDetailScreen renders with 0 overflow errors', (tester) async {
        tester.view.physicalSize = size;
        tester.view.devicePixelRatio = 1.0;
        addTearDown(tester.view.resetPhysicalSize);
        addTearDown(tester.view.resetDevicePixelRatio);

        await tester.pumpWidget(
          ProviderScope(
            overrides: [
              reportDetailFamily('sub-1').overrideWith((ref) => Future.value(mockReport)),
            ],
            child: const MaterialApp(
              home: ReportDetailScreen(submissionId: 'sub-1'),
            ),
          ),
        );
        await tester.pump(const Duration(milliseconds: 100));

        final err = tester.takeException();
        if (err is FlutterError) {
          debugPrint('>>> REPORT DETAIL DIAGNOSTICS: ${err.diagnostics.map((d) => d.toString()).join("\n")}');
        }
        expect(err, isNull,
            reason: 'No RenderFlex overflow on ReportDetailScreen at ${size.width}x${size.height}');
      });

      testWidgets('PreviousReportsScreen renders with 0 overflow errors', (tester) async {
        tester.view.physicalSize = size;
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
        await tester.pump(const Duration(milliseconds: 100));

        final err = tester.takeException();
        if (err is FlutterError) {
          debugPrint('>>> DIAGNOSTICS: ${err.diagnostics.map((d) => d.toString()).join("\n")}');
        }
        expect(err, isNull,
            reason: 'No RenderFlex overflow on ${size.width}x${size.height}');
      });

      testWidgets('SupervisorIdScreen renders with 0 overflow errors', (tester) async {
        tester.view.physicalSize = size;
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
        await tester.pump(const Duration(milliseconds: 100));

        final err = tester.takeException();
        if (err is FlutterError) {
          debugPrint('>>> DIAGNOSTICS: ${err.diagnostics.map((d) => d.toString()).join("\n")}');
        }
        expect(err, isNull,
            reason: 'No RenderFlex overflow on ${size.width}x${size.height}');
      });

      testWidgets('LoginScreen renders with 0 overflow errors', (tester) async {
        tester.view.physicalSize = size;
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
        await tester.pump(const Duration(milliseconds: 100));

        expect(tester.takeException(), isNull,
            reason: 'No RenderFlex overflow on ${size.width}x${size.height}');
      });
    });
  }

  group('Accessibility text scale (1.5x) test', () {
    testWidgets('ReportDetailScreen renders cleanly under large font scale', (tester) async {
      tester.view.physicalSize = const Size(360, 640);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);

      await tester.pumpWidget(
        ProviderScope(
          overrides: [
            reportDetailFamily('sub-1').overrideWith((ref) => Future.value(mockReport)),
          ],
          child: const MaterialApp(
            home: MediaQuery(
              data: MediaQueryData(textScaler: TextScaler.linear(1.5)),
              child: ReportDetailScreen(submissionId: 'sub-1'),
            ),
          ),
        ),
      );
      await tester.pump(const Duration(milliseconds: 100));

      expect(tester.takeException(), isNull);
    });

    testWidgets('AttendanceScreen renders cleanly under large font scale', (tester) async {
      tester.view.physicalSize = const Size(360, 640);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);

      await tester.pumpWidget(
        const ProviderScope(
          child: MaterialApp(
            home: MediaQuery(
              data: MediaQueryData(textScaler: TextScaler.linear(1.5)),
              child: AttendanceScreen(),
            ),
          ),
        ),
      );
      await tester.pump(const Duration(milliseconds: 100));

      expect(tester.takeException(), isNull);
    });

    testWidgets('SupervisorIdScreen renders cleanly under large font scale', (tester) async {
      tester.view.physicalSize = const Size(360, 640);
      tester.view.devicePixelRatio = 1.0;
      addTearDown(tester.view.resetPhysicalSize);
      addTearDown(tester.view.resetDevicePixelRatio);

      await tester.pumpWidget(
        const ProviderScope(
          child: MaterialApp(
            home: MediaQuery(
              data: MediaQueryData(textScaler: TextScaler.linear(1.5)),
              child: SupervisorIdScreen(),
            ),
          ),
        ),
      );
      await tester.pump(const Duration(milliseconds: 100));

      expect(tester.takeException(), isNull);
    });
  });
}
