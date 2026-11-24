import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import 'package:civil_erp/core/theme/app_theme.dart';
import 'package:civil_erp/features/attendance/presentation/attendance_screen.dart';
import 'package:civil_erp/features/auth/data/auth_repository.dart';
import 'package:civil_erp/features/auth/presentation/forgot_password_screen.dart';
import 'package:civil_erp/features/auth/presentation/login_screen.dart';
import 'package:civil_erp/features/history/presentation/previous_reports_screen.dart';
import 'package:civil_erp/features/history/presentation/report_detail_screen.dart';
import 'package:civil_erp/features/profile/presentation/supervisor_id_screen.dart';
import 'package:civil_erp/features/submissions/presentation/submit_daily_report_screen.dart';
import 'package:civil_erp/shared/widgets/main_navigation_scaffold.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const ProviderScope(child: CivilErpApp()));
}

final routerProvider = Provider<GoRouter>((ref) {
  final authState = ref.watch(authProvider);

  return GoRouter(
    initialLocation: '/login',
    redirect: (context, state) {
      final isAuth = authState.isAuthenticated;
      final isLoggingIn = state.matchedLocation == '/login' ||
          state.matchedLocation == '/forgot-password';

      if (!isAuth && !isLoggingIn) {
        return '/login';
      }
      if (isAuth && isLoggingIn) {
        return '/submit-report';
      }
      return null;
    },
    routes: [
      GoRoute(
        path: '/login',
        builder: (context, state) => const LoginScreen(),
      ),
      GoRoute(
        path: '/forgot-password',
        builder: (context, state) => const ForgotPasswordScreen(),
      ),
      ShellRoute(
        builder: (context, state, child) {
          return MainNavigationScaffold(
            location: state.matchedLocation,
            child: child,
          );
        },
        routes: [
          GoRoute(
            path: '/attendance',
            builder: (context, state) => const AttendanceScreen(),
          ),
          GoRoute(
            path: '/submit-report',
            builder: (context, state) => const SubmitDailyReportScreen(),
          ),
          GoRoute(
            path: '/history',
            builder: (context, state) => const PreviousReportsScreen(),
          ),
          GoRoute(
            path: '/profile',
            builder: (context, state) => const SupervisorIdScreen(),
          ),
        ],
      ),
      GoRoute(
        path: '/report-detail/:id',
        builder: (context, state) {
          final id = state.pathParameters['id'] ?? '';
          return ReportDetailScreen(submissionId: id);
        },
      ),
    ],
  );
});

class CivilErpApp extends ConsumerWidget {
  const CivilErpApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final router = ref.watch(routerProvider);

    return MaterialApp.router(
      title: 'Karya Setu - Site Reports',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.lightTheme,
      routerConfig: router,
    );
  }
}
