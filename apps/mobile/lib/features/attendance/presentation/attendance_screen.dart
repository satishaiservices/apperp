import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';

import 'package:civil_erp/core/config/api_config.dart';
import 'package:civil_erp/core/services/location_service.dart';
import 'package:civil_erp/core/theme/app_theme.dart';
import 'package:civil_erp/features/auth/data/auth_repository.dart';
import 'package:civil_erp/features/projects/data/project_repository.dart';
import 'package:civil_erp/features/attendance/data/attendance_repository.dart';

class AttendanceScreen extends ConsumerStatefulWidget {
  const AttendanceScreen({super.key});

  @override
  ConsumerState<AttendanceScreen> createState() => _AttendanceScreenState();
}

class _AttendanceScreenState extends ConsumerState<AttendanceScreen> {
  bool _isProcessing = false;

  Future<void> _handlePunchAction(
      bool hasOpenSession, String? sessionId, String? defaultProjectId) async {
    setState(() => _isProcessing = true);

    try {
      final loc = await LocationService.getCurrentLocation();
      final repo = ref.read(attendanceRepositoryProvider);

      if (hasOpenSession) {
        // Punch Out
        await repo.checkOut(
          sessionId: sessionId,
          latitude: loc.latitude,
          longitude: loc.longitude,
          accuracyM: loc.accuracy,
          remarks: 'Shift closed',
        );

        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Punch-out recorded successfully!'),
              backgroundColor: AppTheme.greenTag,
              behavior: SnackBarBehavior.floating,
            ),
          );
        }
      } else {
        // Punch In
        final projects = await ref.read(projectsFutureProvider.future);
        final projId = defaultProjectId ??
            (projects.isNotEmpty ? projects.first.id : '');

        if (projId.isEmpty) {
          throw 'No active project available to punch in';
        }

        await repo.checkIn(
          projectId: projId,
          latitude: loc.latitude,
          longitude: loc.longitude,
          accuracyM: loc.accuracy,
          remarks: 'Shift check-in on site',
        );

        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('Punch-in recorded successfully! Shift started.'),
              backgroundColor: AppTheme.greenTag,
              behavior: SnackBarBehavior.floating,
            ),
          );
        }
      }

      ref.invalidate(currentAttendanceProvider);
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Attendance error: $e'),
            backgroundColor: AppTheme.redDanger,
            behavior: SnackBarBehavior.floating,
          ),
        );
      }
    } finally {
      if (mounted) setState(() => _isProcessing = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final authState = ref.watch(authProvider);
    final attendanceAsync = ref.watch(currentAttendanceProvider);
    final projectsAsync = ref.watch(projectsFutureProvider);
    final timeFormat = DateFormat('hh:mm:ss a');

    return Scaffold(
      backgroundColor: AppTheme.bgLight,
      appBar: AppBar(
        title: const Text('Attendance & Shift'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh_rounded),
            tooltip: 'Refresh Attendance & Projects',
            onPressed: () {
              ref.invalidate(currentAttendanceProvider);
              ref.invalidate(projectsFutureProvider);
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text('Refreshing attendance & projects...'),
                  duration: Duration(seconds: 1),
                  behavior: SnackBarBehavior.floating,
                ),
              );
            },
          ),
        ],
      ),
      body: SafeArea(
        child: RefreshIndicator(
          color: AppTheme.primaryEmerald,
          onRefresh: () async {
            ref.invalidate(currentAttendanceProvider);
            ref.invalidate(projectsFutureProvider);
            await ref.read(projectsFutureProvider.future);
          },
          child: SingleChildScrollView(
            physics: const AlwaysScrollableScrollPhysics(),
            padding: const EdgeInsets.all(16),
            child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              // 1. Employee Profile & Shift Card
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Row(
                    children: [
                      Builder(
                        builder: (context) {
                          final user = authState.user;
                          final avatarFile = user?.avatarPath != null
                              ? File(user!.avatarPath!)
                              : null;
                          final hasLocalAvatar =
                              avatarFile != null && avatarFile.existsSync();
                          final avatarUrl = user?.avatarUrl;

                          return Container(
                            height: 56,
                            width: 56,
                            decoration: BoxDecoration(
                              color: AppTheme.primaryEmerald,
                              borderRadius: BorderRadius.circular(14),
                            ),
                            clipBehavior: Clip.antiAlias,
                            child: hasLocalAvatar
                                ? Image.file(
                                    avatarFile,
                                    fit: BoxFit.cover,
                                  )
                                : (avatarUrl != null && avatarUrl.isNotEmpty)
                                    ? Image.network(
                                        avatarUrl.startsWith('http')
                                            ? avatarUrl
                                            : '${ApiConfig.baseUrl}$avatarUrl',
                                        fit: BoxFit.cover,
                                        errorBuilder: (_, __, ___) =>
                                            const Icon(
                                          Icons.person_rounded,
                                          color: Colors.white,
                                          size: 34,
                                        ),
                                      )
                                    : const Icon(
                                        Icons.person_rounded,
                                        color: Colors.white,
                                        size: 34,
                                      ),
                          );
                        },
                      ),
                      const SizedBox(width: 14),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              authState.user?.fullName ?? 'Field Employee',
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: const TextStyle(
                                fontSize: 17,
                                fontWeight: FontWeight.w800,
                                color: AppTheme.primaryNavy,
                              ),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              authState.tenant?.name ?? 'Organization',
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                              style: const TextStyle(
                                fontSize: 12,
                                fontWeight: FontWeight.w600,
                                color: AppTheme.textMuted,
                              ),
                            ),
                            const SizedBox(height: 4),
                            Container(
                              padding: const EdgeInsets.symmetric(
                                  horizontal: 8, vertical: 2),
                              decoration: BoxDecoration(
                                color: AppTheme.greenLight,
                                borderRadius: BorderRadius.circular(4),
                              ),
                              child: const Text(
                                '● ON SITE • SHIFT ACTIVE',
                                style: TextStyle(
                                  fontSize: 10,
                                  fontWeight: FontWeight.w800,
                                  color: AppTheme.greenTag,
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(width: 8),
                      Flexible(
                        child: FittedBox(
                          fit: BoxFit.scaleDown,
                          alignment: Alignment.centerRight,
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.end,
                            children: [
                              Text(
                                timeFormat.format(DateTime.now()),
                                style: const TextStyle(
                                  fontSize: 13,
                                  fontWeight: FontWeight.w800,
                                  color: AppTheme.primaryNavy,
                                ),
                              ),
                              const Text(
                                '7h 15m left',
                                style: TextStyle(
                                  fontSize: 11,
                                  color: AppTheme.textMuted,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 14),

              // 2. Punch In / Punch Out Active State Card
              attendanceAsync.when(
                loading: () => const Card(
                  child: Padding(
                    padding: EdgeInsets.all(24),
                    child: Center(child: CircularProgressIndicator()),
                  ),
                ),
                error: (err, _) => Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Text('Attendance sync error: $err',
                        style: const TextStyle(color: AppTheme.redDanger)),
                  ),
                ),
                data: (current) {
                  final isOpen = current.active;
                  final session = current.session;
                  final hours = current.elapsedMinutes ~/ 60;
                  final mins = current.elapsedMinutes % 60;

                  return Card(
                    child: Padding(
                      padding: const EdgeInsets.all(16),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: [
                          // Status Header (Responsive Wrap)
                          Wrap(
                            alignment: WrapAlignment.spaceBetween,
                            runAlignment: WrapAlignment.center,
                            crossAxisAlignment: WrapCrossAlignment.center,
                            spacing: 8,
                            runSpacing: 8,
                            children: [
                              Container(
                                padding: const EdgeInsets.symmetric(
                                    horizontal: 10, vertical: 4),
                                decoration: BoxDecoration(
                                  color: isOpen
                                      ? AppTheme.emeraldLight
                                      : const Color(0xFFF1F5F9),
                                  borderRadius: BorderRadius.circular(6),
                                ),
                                child: Text(
                                  isOpen
                                      ? '● ON DUTY • SHIFT ACTIVE'
                                      : '○ OFF DUTY / SHIFT COMPLETED',
                                  style: TextStyle(
                                    fontSize: 11,
                                    fontWeight: FontWeight.w800,
                                    color: isOpen
                                        ? AppTheme.primaryEmerald
                                        : AppTheme.textMuted,
                                  ),
                                ),
                              ),
                              Container(
                                padding: const EdgeInsets.symmetric(
                                    horizontal: 8, vertical: 3),
                                decoration: BoxDecoration(
                                  color: const Color(0xFFDCFCE7),
                                  borderRadius: BorderRadius.circular(4),
                                ),
                                child: const Row(
                                  mainAxisSize: MainAxisSize.min,
                                  children: [
                                    Icon(Icons.gps_fixed_rounded,
                                        size: 12, color: AppTheme.primaryEmerald),
                                    SizedBox(width: 4),
                                    Text(
                                      'Geofence Verified',
                                      style: TextStyle(
                                        fontSize: 11,
                                        fontWeight: FontWeight.w700,
                                        color: AppTheme.primaryEmerald,
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ],
                          ),
                          const SizedBox(height: 16),

                          // Responsive Stat Grid: In Time, Out Time, Duration
                          LayoutBuilder(
                            builder: (context, constraints) {
                              final isNarrow = constraints.maxWidth < 360;

                              Widget buildStatTile({
                                required String title,
                                required String value,
                                required String subtitle,
                                Color? valueColor,
                                double valueSize = 15,
                              }) {
                                return Container(
                                  padding: EdgeInsets.symmetric(
                                      horizontal: isNarrow ? 10 : 12,
                                      vertical: 10),
                                  decoration: BoxDecoration(
                                    color: AppTheme.bgLight,
                                    borderRadius: BorderRadius.circular(10),
                                    border: Border.all(
                                        color: AppTheme.borderColor),
                                  ),
                                  child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    mainAxisSize: MainAxisSize.min,
                                    children: [
                                      Text(
                                        title,
                                        style: const TextStyle(
                                          fontSize: 10,
                                          fontWeight: FontWeight.w800,
                                          color: AppTheme.textMuted,
                                          letterSpacing: 0.5,
                                        ),
                                      ),
                                      const SizedBox(height: 3),
                                      FittedBox(
                                        fit: BoxFit.scaleDown,
                                        alignment: Alignment.centerLeft,
                                        child: Text(
                                          value,
                                          style: TextStyle(
                                            fontSize: valueSize,
                                            fontWeight: FontWeight.w800,
                                            color: valueColor ?? AppTheme.textDark,
                                          ),
                                        ),
                                      ),
                                      const SizedBox(height: 2),
                                      FittedBox(
                                        fit: BoxFit.scaleDown,
                                        alignment: Alignment.centerLeft,
                                        child: Text(
                                          subtitle,
                                          style: const TextStyle(
                                            fontSize: 10,
                                            color: AppTheme.textMuted,
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                );
                              }

                              final inTile = buildStatTile(
                                title: 'IN TIME',
                                value: session != null
                                    ? DateFormat('hh:mm a')
                                        .format(session.checkInAt)
                                    : '--:--',
                                subtitle: session != null
                                    ? DateFormat('dd MMM')
                                        .format(session.checkInAt)
                                    : 'Ready to Punch',
                              );

                              final outTile = buildStatTile(
                                title: 'OUT TIME',
                                value: isOpen
                                    ? 'In Progress'
                                    : (session?.checkOutAt != null
                                        ? DateFormat('hh:mm a')
                                            .format(session!.checkOutAt!)
                                        : '--:--'),
                                subtitle: isOpen
                                    ? 'Active Shift'
                                    : (session?.checkOutAt != null
                                        ? DateFormat('dd MMM')
                                            .format(session!.checkOutAt!)
                                        : 'Pending Punch'),
                                valueColor: isOpen
                                    ? AppTheme.primaryEmerald
                                    : AppTheme.textDark,
                                valueSize: isOpen ? 13 : 15,
                              );

                              final durationTile = buildStatTile(
                                title: 'DURATION',
                                value: session != null
                                    ? '${hours}h ${mins}m'
                                    : '0h 0m',
                                subtitle: isOpen ? 'Running Timer' : 'Total Shift',
                                valueColor: AppTheme.primaryEmerald,
                              );

                              if (isNarrow) {
                                return Column(
                                  children: [
                                    Row(
                                      children: [
                                        Expanded(child: inTile),
                                        const SizedBox(width: 8),
                                        Expanded(child: outTile),
                                      ],
                                    ),
                                    const SizedBox(height: 8),
                                    SizedBox(
                                      width: double.infinity,
                                      child: durationTile,
                                    ),
                                  ],
                                );
                              }

                              return Row(
                                children: [
                                  Expanded(child: inTile),
                                  const SizedBox(width: 8),
                                  Expanded(child: outTile),
                                  const SizedBox(width: 8),
                                  Expanded(child: durationTile),
                                ],
                              );
                            },
                          ),
                          const SizedBox(height: 16),

                          // GPS Verification & Coordinates Display
                          Container(
                            padding: const EdgeInsets.symmetric(
                                horizontal: 12, vertical: 8),
                            decoration: BoxDecoration(
                              color: AppTheme.bgLight,
                              borderRadius: BorderRadius.circular(8),
                              border: Border.all(color: AppTheme.borderColor),
                            ),
                            child: Row(
                              children: [
                                const Icon(Icons.location_on_outlined,
                                    size: 16, color: AppTheme.primaryEmerald),
                                const SizedBox(width: 8),
                                Expanded(
                                  child: Text(
                                    session?.latitude != null
                                        ? 'Check-In GPS: ${session!.latitude!.toStringAsFixed(4)}, ${session.longitude!.toStringAsFixed(4)}${session.checkOutLatitude != null ? ' • Out: ${session.checkOutLatitude!.toStringAsFixed(4)}, ${session.checkOutLongitude!.toStringAsFixed(4)}' : ''}'
                                        : 'Live GPS coordinates will be captured and stored upon punch',
                                    style: const TextStyle(
                                      fontSize: 11,
                                      fontWeight: FontWeight.w600,
                                      color: AppTheme.textDark,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                          const SizedBox(height: 14),

                          // Action Button: Punch In or Punch Out
                          SizedBox(
                            height: 52,
                            child: FilledButton.icon(
                              onPressed: _isProcessing
                                  ? null
                                  : () async {
                                      if (isOpen) {
                                        final confirm = await showDialog<bool>(
                                          context: context,
                                          builder: (ctx) => AlertDialog(
                                            title: const Text('Confirm Punch Out'),
                                            content: const Text(
                                                'Are you sure you want to end your active shift and record punch-out timestamp?'),
                                            actions: [
                                              TextButton(
                                                onPressed: () =>
                                                    Navigator.pop(ctx, false),
                                                child: const Text('Cancel'),
                                              ),
                                              ElevatedButton(
                                                onPressed: () =>
                                                    Navigator.pop(ctx, true),
                                                style: ElevatedButton.styleFrom(
                                                  backgroundColor:
                                                      const Color(0xFFDC2626),
                                                  foregroundColor: Colors.white,
                                                ),
                                                child:
                                                    const Text('Punch Out Now'),
                                              ),
                                            ],
                                          ),
                                        );
                                        if (confirm != true) return;
                                      }

                                      final defaultProj = projectsAsync.asData
                                          ?.value.firstOrNull?.id;
                                      _handlePunchAction(
                                          isOpen, session?.id, defaultProj);
                                    },
                              style: FilledButton.styleFrom(
                                backgroundColor: isOpen
                                    ? const Color(0xFFDC2626) // Red on punch out
                                    : AppTheme.primaryEmerald, // Emerald on punch in
                                foregroundColor: Colors.white,
                                elevation: 1,
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(10),
                                ),
                              ),
                              icon: _isProcessing
                                  ? const SizedBox(
                                      height: 18,
                                      width: 18,
                                      child: CircularProgressIndicator(
                                        strokeWidth: 2,
                                        valueColor:
                                            AlwaysStoppedAnimation(Colors.white),
                                      ),
                                    )
                                  : Icon(isOpen
                                      ? Icons.logout_rounded
                                      : Icons.login_rounded),
                              label: FittedBox(
                                fit: BoxFit.scaleDown,
                                child: Text(
                                  isOpen ? 'PUNCH OUT SHIFT' : 'PUNCH IN SHIFT',
                                  style: const TextStyle(
                                    fontSize: 15,
                                    fontWeight: FontWeight.w800,
                                    letterSpacing: 0.5,
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  );
                },
              ),
              const SizedBox(height: 16),

              // 3. Quick Actions Row
              Row(
                children: [
                  Expanded(
                    child: InkWell(
                      onTap: () => context.go('/submit-report'),
                      borderRadius: BorderRadius.circular(12),
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 14, vertical: 16),
                        decoration: BoxDecoration(
                          color: AppTheme.primaryEmerald,
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: const Row(
                          children: [
                            Icon(Icons.edit_note_rounded,
                                color: Colors.white, size: 22),
                            SizedBox(width: 6),
                            Expanded(
                              child: FittedBox(
                                fit: BoxFit.scaleDown,
                                alignment: Alignment.centerLeft,
                                child: Text(
                                  'Daily Report',
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.w800,
                                    fontSize: 14,
                                  ),
                                ),
                              ),
                            ),
                            Icon(Icons.arrow_forward_ios_rounded,
                                color: Colors.white70, size: 13),
                          ],
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: InkWell(
                      onTap: () => context.go('/history'),
                      borderRadius: BorderRadius.circular(12),
                      child: Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 12, vertical: 14),
                        decoration: BoxDecoration(
                          color: AppTheme.emeraldDark,
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: const Row(
                          children: [
                            Icon(Icons.history_rounded,
                                color: Colors.white, size: 22),
                            SizedBox(width: 6),
                            Expanded(
                              child: FittedBox(
                                fit: BoxFit.scaleDown,
                                alignment: Alignment.centerLeft,
                                child: Text(
                                  'Past Reports',
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.w800,
                                    fontSize: 14,
                                  ),
                                ),
                              ),
                            ),
                            Icon(Icons.arrow_forward_ios_rounded,
                                color: Colors.white70, size: 13),
                          ],
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
        ),
      ),
    );
  }
}
