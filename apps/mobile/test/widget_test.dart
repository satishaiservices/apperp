import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:civil_erp/main.dart';
import 'package:civil_erp/features/auth/presentation/forgot_password_screen.dart';
import 'package:civil_erp/features/submissions/presentation/submit_daily_report_screen.dart';
import 'package:civil_erp/features/history/presentation/previous_reports_screen.dart';
import 'package:civil_erp/features/attendance/presentation/attendance_screen.dart';
import 'package:civil_erp/features/profile/presentation/supervisor_id_screen.dart';

void main() {
  testWidgets('Login screen renders with supervisor fields', (WidgetTester tester) async {
    await tester.pumpWidget(
      const ProviderScope(
        child: CivilErpApp(),
      ),
    );
    await tester.pumpAndSettle();

    expect(find.text('Karya Setu - Site Reports'), findsOneWidget);
    expect(find.text('Sign In'), findsAtLeastNWidgets(1));
    expect(find.text('OPERATOR ID / EMAIL'), findsOneWidget);
    expect(find.text('FIELD ACCESS PASSWORD / PIN'), findsOneWidget);
    expect(find.text('Keep logged for 12h shift'), findsOneWidget);
    expect(find.text('Forgot Password or Lockout?'), findsOneWidget);
  });

  testWidgets('Forgot password screen renders cleanly', (WidgetTester tester) async {
    await tester.pumpWidget(
      const ProviderScope(
        child: MaterialApp(
          home: ForgotPasswordScreen(),
        ),
      ),
    );
    await tester.pumpAndSettle();

    expect(find.text('Reset Password'), findsOneWidget);
    expect(find.text('Forgot Field Password?'), findsOneWidget);
    expect(find.text('OPERATOR EMAIL'), findsOneWidget);
    expect(find.text('Send Verification Code'), findsOneWidget);
  });

  testWidgets('Submit daily report screen renders all core field requirements', (WidgetTester tester) async {
    await tester.pumpWidget(
      const ProviderScope(
        child: MaterialApp(
          home: SubmitDailyReportScreen(),
        ),
      ),
    );
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 200));

    // 1. GPS Fix Status
    expect(find.textContaining('GPS FIX'), findsOneWidget);

    // 2. Project dropdown section
    expect(find.text('PROJECT * (MANDATORY)'), findsOneWidget);

    // 3. Chainage extents textboxes
    expect(find.text('CHAINAGE EXTENTS * (MANDATORY)'), findsOneWidget);
    expect(find.text('START CHAINAGE *'), findsOneWidget);
    expect(find.text('END CHAINAGE *'), findsOneWidget);

    // 4. Project activities section
    expect(find.text('PROJECT ACTIVITIES * (MANDATORY)'), findsOneWidget);
    expect(find.text('Select a project to load activities'), findsOneWidget);

    // 5. Site photos camera section
    expect(find.text('SITE PHOTOS * (MANDATORY)'), findsOneWidget);
    expect(find.text('Add Photo'), findsOneWidget);

    // 6. Remarks and delays textarea
    expect(find.text('REMARKS & DELAYS'), findsOneWidget);

    // 7. Submit button
    expect(find.text('Submit Report'), findsOneWidget);
  });

  testWidgets('Previous reports screen renders search and summary', (WidgetTester tester) async {
    await tester.pumpWidget(
      const ProviderScope(
        child: MaterialApp(
          home: PreviousReportsScreen(),
        ),
      ),
    );
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 200));

    expect(find.text('Previous Reports Log'), findsOneWidget);
    expect(find.text('Search chainage or keyword...'), findsOneWidget);
    expect(find.text('Log Daily Report'), findsOneWidget);
  });

  testWidgets('Attendance screen renders profile and quick actions', (WidgetTester tester) async {
    await tester.pumpWidget(
      const ProviderScope(
        child: MaterialApp(
          home: AttendanceScreen(),
        ),
      ),
    );
    await tester.pump();
    await tester.pump(const Duration(milliseconds: 200));

    expect(find.text('Attendance & Shift'), findsOneWidget);
    expect(find.text('Daily Report'), findsOneWidget);
    expect(find.text('Past Reports'), findsOneWidget);
  });

  testWidgets('Profile screen renders profile and basic details editor', (WidgetTester tester) async {
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
    expect(find.text('Edit Details'), findsOneWidget);
    expect(find.text('EDIT BASIC DETAILS'), findsOneWidget);
    expect(find.text('Change Photo'), findsOneWidget);
  });
}
