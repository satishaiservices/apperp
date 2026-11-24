import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:image_picker/image_picker.dart';
import 'package:intl/intl.dart';

import 'package:civil_erp/core/config/api_config.dart';
import 'package:civil_erp/core/offline/sync_queue_service.dart';
import 'package:civil_erp/core/theme/app_theme.dart';
import 'package:civil_erp/shared/widgets/authenticated_image.dart';
import 'package:civil_erp/features/auth/data/auth_repository.dart';
import 'package:civil_erp/features/projects/data/project_repository.dart';
import 'package:civil_erp/features/projects/domain/project_model.dart';
import 'package:civil_erp/features/submissions/data/submission_repository.dart';
import 'package:civil_erp/features/submissions/domain/submission_model.dart';

class PreviousReportsScreen extends ConsumerStatefulWidget {
  const PreviousReportsScreen({super.key});

  @override
  ConsumerState<PreviousReportsScreen> createState() =>
      _PreviousReportsScreenState();
}

class _PreviousReportsScreenState extends ConsumerState<PreviousReportsScreen> {
  final _searchController = TextEditingController();
  ProjectModel? _filterProject;
  String _searchQuery = '';
  bool _isSyncing = false;

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  Future<void> _syncPendingTasks() async {
    setState(() => _isSyncing = true);
    final syncQueue = ref.read(syncQueueServiceProvider);
    final submissionRepo = ref.read(submissionRepositoryProvider);

    await syncQueue.processQueue((task) async {
      try {
        final payload = task.payload;
        final photoFiles = task.photoPaths.map((p) => XFile(p)).toList();
        await submissionRepo.createDailyReport(
          projectId: payload['projectId'] as String,
          startChainage: payload['startChainage'] as String,
          endChainage: payload['endChainage'] as String,
          activityIds: (payload['activityIds'] as List)
              .map((e) => e.toString())
              .toList(),
          latitude: (payload['latitude'] as num).toDouble(),
          longitude: (payload['longitude'] as num).toDouble(),
          accuracyMeters: (payload['locationAccuracyM'] as num?)?.toDouble(),
          capturedAt: DateTime.tryParse(
              payload['locationCapturedAt'] as String? ?? ''),
          remarks: payload['remarks'] as String?,
          photoFiles: photoFiles,
        );
        return true;
      } catch (e) {
        debugPrint('Error syncing task: $e');
        return false;
      }
    });

    setState(() => _isSyncing = false);
    ref.invalidate(submissionsFutureProvider);
    if (mounted) {
      final remaining = await syncQueue.getCount();
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(remaining == 0
              ? 'All pending reports synced successfully!'
              : '$remaining reports could not be synced.'),
          backgroundColor:
              remaining == 0 ? AppTheme.greenTag : AppTheme.amberAccent,
          behavior: SnackBarBehavior.floating,
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final projectsAsync = ref.watch(projectsFutureProvider);
    final pendingCountAsync = ref.watch(pendingSyncCountProvider);
    final pendingCount = pendingCountAsync.asData?.value ?? 0;
    final submissionsAsync = ref.watch(
      submissionsFutureProvider(
        (projectId: _filterProject?.id, search: _searchQuery),
      ),
    );

    return Scaffold(
      backgroundColor: AppTheme.bgLight,
      appBar: AppBar(
        title: const Text('Previous Reports Log'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh_rounded),
            tooltip: 'Refresh',
            onPressed: () {
              ref.invalidate(submissionsFutureProvider);
            },
          ),
        ],
      ),
      body: SafeArea(
        child: Column(
          children: [
            // Filter Bar
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
              color: Colors.white,
              child: Column(
                children: [
                  // Search Box
                  TextField(
                    controller: _searchController,
                    decoration: InputDecoration(
                      hintText: 'Search chainage or keyword...',
                      prefixIcon:
                          const Icon(Icons.search, color: AppTheme.textMuted),
                      suffixIcon: _searchQuery.isNotEmpty
                          ? IconButton(
                              icon: const Icon(Icons.clear, size: 18),
                              onPressed: () {
                                _searchController.clear();
                                setState(() => _searchQuery = '');
                              },
                            )
                          : null,
                      isDense: true,
                      contentPadding: const EdgeInsets.symmetric(
                          vertical: 10, horizontal: 12),
                    ),
                    onSubmitted: (val) {
                      setState(() => _searchQuery = val.trim());
                    },
                  ),
                  const SizedBox(height: 10),

                  // Project Filter Dropdown
                  Row(
                    children: [
                      const Icon(Icons.filter_list_rounded,
                          size: 18, color: AppTheme.primaryNavy),
                      const SizedBox(width: 8),
                      Expanded(
                        child: projectsAsync.when(
                          loading: () => const LinearProgressIndicator(),
                          error: (_, __) => const SizedBox(),
                          data: (projects) {
                            return DropdownButton<ProjectModel?>(
                              value: _filterProject,
                              isExpanded: true,
                              underline: const SizedBox(),
                              hint: const Text('All Projects',
                                  style: TextStyle(
                                      fontSize: 13,
                                      fontWeight: FontWeight.w600)),
                              items: [
                                const DropdownMenuItem<ProjectModel?>(
                                  value: null,
                                  child: Text('All Projects',
                                      style: TextStyle(
                                          fontSize: 13,
                                          fontWeight: FontWeight.w600)),
                                ),
                                ...projects.map((p) => DropdownMenuItem(
                                      value: p,
                                      child: Text(
                                        p.name,
                                        overflow: TextOverflow.ellipsis,
                                        style: const TextStyle(fontSize: 13),
                                      ),
                                    )),
                              ],
                              onChanged: (val) {
                                setState(() => _filterProject = val);
                              },
                            );
                          },
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const Divider(height: 1, color: AppTheme.borderColor),

            if (pendingCount > 0)
              Container(
                margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  color: Colors.amber.shade50,
                  border: Border.all(color: Colors.amber.shade400, width: 1.5),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.cloud_off_rounded,
                        color: AppTheme.amberAccent, size: 28),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            '$pendingCount Report${pendingCount > 1 ? "s" : ""} Pending Sync',
                            style: const TextStyle(
                              fontWeight: FontWeight.w800,
                              fontSize: 13,
                              color: AppTheme.primaryNavy,
                            ),
                          ),
                          const SizedBox(height: 2),
                          const Text(
                            'Saved locally. Will auto-sync on connection.',
                            style: TextStyle(
                              fontSize: 11,
                              color: AppTheme.textMuted,
                            ),
                          ),
                        ],
                      ),
                    ),
                    const SizedBox(width: 8),
                    FilledButton(
                      onPressed: _isSyncing ? null : _syncPendingTasks,
                      style: FilledButton.styleFrom(
                        backgroundColor: AppTheme.amberAccent,
                        foregroundColor: Colors.white,
                        padding: const EdgeInsets.symmetric(
                            horizontal: 12, vertical: 8),
                      ),
                      child: Text(
                        _isSyncing ? 'Syncing...' : 'Sync Now',
                        style: const TextStyle(
                            fontSize: 12, fontWeight: FontWeight.w700),
                      ),
                    ),
                  ],
                ),
              ),

            // Reports List & Metrics
            Expanded(
              child: submissionsAsync.when(
                loading: () => const Center(child: CircularProgressIndicator()),
                error: (err, _) => Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(Icons.error_outline,
                          size: 40, color: AppTheme.redDanger),
                      const SizedBox(height: 8),
                      Text('Error: $err',
                          style: const TextStyle(color: AppTheme.redDanger)),
                      const SizedBox(height: 12),
                      FilledButton(
                        onPressed: () =>
                            ref.invalidate(submissionsFutureProvider),
                        child: const Text('Retry'),
                      ),
                    ],
                  ),
                ),
                data: (reports) {
                  return RefreshIndicator(
                    onRefresh: () async {
                      ref.invalidate(submissionsFutureProvider);
                    },
                    child: ListView(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 16, vertical: 12),
                      children: [

                        // Summary Stats Card (From Figma UI)
                        _buildSummaryStats(reports),
                        const SizedBox(height: 16),

                        if (reports.isEmpty)
                          Container(
                            padding: const EdgeInsets.all(32),
                            alignment: Alignment.center,
                            child: const Column(
                              children: [
                                Icon(Icons.assignment_outlined,
                                    size: 48, color: AppTheme.textMuted),
                                SizedBox(height: 12),
                                Text(
                                  'No previous daily reports found.',
                                  style: TextStyle(
                                    fontSize: 15,
                                    fontWeight: FontWeight.w600,
                                    color: AppTheme.textDark,
                                  ),
                                ),
                                SizedBox(height: 4),
                                Text(
                                  'Tap "+ Log Daily Report" below to submit one.',
                                  style: TextStyle(
                                    fontSize: 13,
                                    color: AppTheme.textMuted,
                                  ),
                                ),
                              ],
                            ),
                          )
                        else
                          ...reports.map((r) => _buildReportCard(context, r)),
                      ],
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          boxShadow: [
            BoxShadow(
              color: Colors.black.withValues(alpha: 0.06),
              blurRadius: 8,
              offset: const Offset(0, -2),
            ),
          ],
        ),
        child: FilledButton.icon(
          onPressed: () => context.go('/submit-report'),
          style: FilledButton.styleFrom(
            backgroundColor: AppTheme.amberAccent,
            foregroundColor: Colors.white,
            padding: const EdgeInsets.symmetric(vertical: 14),
          ),
          icon: const Icon(Icons.add_circle_outline_rounded),
          label: const FittedBox(
            fit: BoxFit.scaleDown,
            child: Text(
              'Log Daily Report',
              style: TextStyle(fontSize: 15, fontWeight: FontWeight.w800),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildSummaryStats(List<SubmissionModel> reports) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
      decoration: BoxDecoration(
        color: AppTheme.primaryNavy,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        children: [
          Expanded(child: _statItem('${reports.length}', 'SUBMITTED LOGS')),
          Container(height: 28, width: 1, color: Colors.white24),
          Expanded(child: _statItem('100%', 'LIVE SYNCED', isSuccess: true)),
        ],
      ),
    );
  }

  Widget _statItem(String value, String label, {bool isSuccess = false}) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        FittedBox(
          fit: BoxFit.scaleDown,
          child: Text(
            value,
            style: TextStyle(
              color: isSuccess ? const Color(0xFF4ADE80) : Colors.white,
              fontSize: 18,
              fontWeight: FontWeight.w800,
            ),
          ),
        ),
        const SizedBox(height: 2),
        FittedBox(
          fit: BoxFit.scaleDown,
          child: Text(
            label,
            style: const TextStyle(
              color: Color(0xFF94A3B8),
              fontSize: 10,
              fontWeight: FontWeight.w700,
              letterSpacing: 0.8,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildReportCard(BuildContext context, SubmissionModel report) {
    final token = ref.watch(authProvider).token;
    final dateFormat = DateFormat('MMM dd, hh:mm a');

    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: InkWell(
        onTap: () {
          context.push('/report-detail/${report.id}');
        },
        borderRadius: BorderRadius.circular(14),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header: Project Code + Date + Verified Badge
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        if (report.projectCode.isNotEmpty)
                          Text(
                            report.projectCode,
                            style: const TextStyle(
                              fontSize: 11,
                              fontWeight: FontWeight.w800,
                              color: AppTheme.amberAccent,
                            ),
                          ),
                        Text(
                          report.projectName,
                          maxLines: 2,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(
                            fontSize: 15,
                            fontWeight: FontWeight.w800,
                            color: AppTheme.primaryNavy,
                          ),
                        ),
                        Text(
                          dateFormat.format(report.submittedAt),
                          maxLines: 1,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(
                            fontSize: 11,
                            color: AppTheme.textMuted,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(width: 8),
                  Container(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                    decoration: BoxDecoration(
                      color: AppTheme.greenLight,
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: const Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Icon(Icons.check_circle_rounded,
                            size: 13, color: AppTheme.greenTag),
                        SizedBox(width: 4),
                        Text(
                          'Verified',
                          style: TextStyle(
                            fontSize: 11,
                            fontWeight: FontWeight.w700,
                            color: AppTheme.greenTag,
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),

              // Chainage Span
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                decoration: BoxDecoration(
                  color: AppTheme.bgLight,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.straighten,
                        size: 15, color: AppTheme.primaryNavy),
                    const SizedBox(width: 6),
                    Expanded(
                      child: Text(
                        '${report.startChainage}  →  ${report.endChainage}',
                        maxLines: 1,
                        overflow: TextOverflow.ellipsis,
                        style: const TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.w700,
                          color: AppTheme.primaryNavy,
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 10),

              // Activities Chips
              Wrap(
                spacing: 6,
                runSpacing: 6,
                children: report.activities.map((act) {
                  return Container(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                    decoration: BoxDecoration(
                      color: const Color(0xFFF1F5F9),
                      borderRadius: BorderRadius.circular(6),
                    ),
                    child: Text(
                      act.name,
                      style: const TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.w600,
                        color: Color(0xFF334155),
                      ),
                    ),
                  );
                }).toList(),
              ),

              // Photos preview if present
              if (report.photos.isNotEmpty) ...[
                const SizedBox(height: 12),
                SizedBox(
                  height: 52,
                  child: ListView.separated(
                    scrollDirection: Axis.horizontal,
                    itemCount: report.photos.length,
                    separatorBuilder: (_, __) => const SizedBox(width: 8),
                    itemBuilder: (context, pIdx) {
                      final photo = report.photos[pIdx];
                      final photoUrl = ApiConfig.submissionPhotoFile(
                          report.id, photo.id, token);

                      return GestureDetector(
                        onTap: () =>
                            _showFullScreenPhoto(context, photoUrl, token),
                        child: AuthenticatedImage(
                          imageUrl: photoUrl,
                          width: 52,
                          height: 52,
                          fit: BoxFit.cover,
                          borderRadius: BorderRadius.circular(8),
                        ),
                      );
                    },
                  ),
                ),
              ],

              // Remarks snippet
              if (report.remarks != null && report.remarks!.isNotEmpty) ...[
                const SizedBox(height: 10),
                Text(
                  report.remarks!,
                  maxLines: 2,
                  overflow: TextOverflow.ellipsis,
                  style: const TextStyle(
                    fontSize: 12,
                    color: AppTheme.textDark,
                    fontStyle: FontStyle.italic,
                  ),
                ),
              ],
              const SizedBox(height: 10),

              // Geotag & Details Footer
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      const Icon(Icons.location_on_outlined,
                          size: 14, color: AppTheme.textMuted),
                      const SizedBox(width: 4),
                      Text(
                        '${report.latitude.toStringAsFixed(4)}, ${report.longitude.toStringAsFixed(4)}',
                        style: const TextStyle(
                          fontSize: 11,
                          color: AppTheme.textMuted,
                        ),
                      ),
                    ],
                  ),
                  const Text(
                    'View Details →',
                    style: TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w700,
                      color: AppTheme.primaryNavy,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  void _showFullScreenPhoto(
      BuildContext context, String photoUrl, String? token) {
    showDialog(
      context: context,
      builder: (ctx) => Dialog(
        backgroundColor: Colors.black,
        insetPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Text(
                    'Site Inspection Photograph',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 14,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.close, color: Colors.white),
                    onPressed: () => Navigator.pop(ctx),
                  ),
                ],
              ),
            ),
            Flexible(
              child: InteractiveViewer(
                minScale: 0.8,
                maxScale: 4.0,
                child: AuthenticatedImage(
                  imageUrl: photoUrl,
                  fit: BoxFit.contain,
                  placeholder: const Center(
                    child: CircularProgressIndicator(color: Colors.white),
                  ),
                  errorWidget: const Center(
                    child: Icon(Icons.broken_image,
                        color: Colors.white54, size: 48),
                  ),
                ),
              ),
            ),
            const SizedBox(height: 8),
          ],
        ),
      ),
    );
  }
}
