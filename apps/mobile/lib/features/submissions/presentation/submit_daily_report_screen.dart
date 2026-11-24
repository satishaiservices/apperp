import 'dart:async';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';

import 'package:civil_erp/core/config/api_config.dart';
import 'package:civil_erp/core/offline/sync_queue_service.dart';
import 'package:civil_erp/core/services/location_service.dart';
import 'package:civil_erp/core/theme/app_theme.dart';
import 'package:civil_erp/features/projects/data/project_repository.dart';
import 'package:civil_erp/features/projects/domain/activity_model.dart';
import 'package:civil_erp/features/projects/domain/project_model.dart';
import 'package:civil_erp/features/submissions/data/submission_repository.dart';
import 'widgets/activity_selector_sheet.dart';
import 'widgets/photo_picker_strip.dart';

class SubmitDailyReportScreen extends ConsumerStatefulWidget {
  const SubmitDailyReportScreen({super.key});

  @override
  ConsumerState<SubmitDailyReportScreen> createState() =>
      _SubmitDailyReportScreenState();
}

class _SubmitDailyReportScreenState
    extends ConsumerState<SubmitDailyReportScreen> {
  final _formKey = GlobalKey<FormState>();

  ProjectModel? _selectedProject;
  final _startChainageController = TextEditingController(text: '1450');
  final _endChainageController = TextEditingController(text: '1800');
  final _remarksController = TextEditingController();

  List<ActivityModel> _selectedActivities = [];
  final List<PhotoItem> _attachedPhotos = [];

  LocationData? _currentLocation;
  bool _isLocating = true;
  bool _isSubmitting = false;
  Timer? _locationTimer;

  @override
  void initState() {
    super.initState();
    _fetchLocation();
    _startChainageController.addListener(_recalculateSpan);
    _endChainageController.addListener(_recalculateSpan);

    // Periodic GPS refresh every 30 seconds
    _locationTimer = Timer.periodic(const Duration(seconds: 30), (_) {
      _fetchLocation(silent: true);
    });
  }

  @override
  void dispose() {
    _locationTimer?.cancel();
    _startChainageController.dispose();
    _endChainageController.dispose();
    _remarksController.dispose();
    super.dispose();
  }

  void _recalculateSpan() {
    if (mounted) setState(() {});
  }

  Future<void> _fetchLocation({bool silent = false}) async {
    if (!silent) {
      setState(() => _isLocating = true);
    }
    final loc = await LocationService.getCurrentLocation();
    if (mounted) {
      setState(() {
        _currentLocation = loc;
        _isLocating = false;
      });
    }
  }

  String _calculateSpanDisplay() {
    final start = _startChainageController.text.trim();
    final end = _endChainageController.text.trim();

    final startMeters = _parseChainageToMeters(start);
    final endMeters = _parseChainageToMeters(end);

    if (startMeters != null && endMeters != null) {
      final diff = (endMeters - startMeters).abs();
      if (diff >= 1000) {
        return '${(diff / 1000).toStringAsFixed(2)} km span';
      }
      return '${diff.toStringAsFixed(0)}m span';
    }
    return '';
  }

  double? _parseChainageToMeters(String chainage) {
    // Examples: "14+250", "CH 14+250", "14250", "14.25"
    final cleaned = chainage.toUpperCase().replaceAll('CH', '').trim();
    if (cleaned.contains('+')) {
      final parts = cleaned.split('+');
      final km = double.tryParse(parts[0].trim());
      final m = double.tryParse(parts[1].trim());
      if (km != null && m != null) {
        return (km * 1000) + m;
      }
    }
    return double.tryParse(cleaned);
  }

  void _openActivitySelector([List<ActivityModel>? fallbackActivities]) {
    final projectId = _selectedProject?.id;
    if (projectId == null || projectId.isEmpty) return;

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (_) => Consumer(
        builder: (context, ref, _) {
          final activitiesAsync = ref.watch(projectActivitiesFamily(projectId));
          return activitiesAsync.when(
            loading: () => Container(
              height: 250,
              decoration: const BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
              ),
              child: const Center(
                child:
                    CircularProgressIndicator(color: AppTheme.primaryEmerald),
              ),
            ),
            error: (err, _) => ActivitySelectorSheet(
              allActivities: fallbackActivities ?? const [],
              selectedActivities: _selectedActivities,
              onRefresh: () async {
                ref.invalidate(projectActivitiesFamily(projectId));
              },
              onSelectionChanged: (updated) {
                setState(() => _selectedActivities = updated);
              },
            ),
            data: (activities) => ActivitySelectorSheet(
              allActivities: activities,
              selectedActivities: _selectedActivities,
              onRefresh: () async {
                ref.invalidate(projectActivitiesFamily(projectId));
                await ref.read(projectActivitiesFamily(projectId).future);
              },
              onSelectionChanged: (updated) {
                setState(() => _selectedActivities = updated);
              },
            ),
          );
        },
      ),
    );
  }

  Future<void> _handleSubmit() async {
    // 1. Mandatory Project Validation
    if (_selectedProject == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Please select an assigned project (Mandatory)'),
          backgroundColor: AppTheme.redDanger,
          behavior: SnackBarBehavior.floating,
        ),
      );
      return;
    }

    // 2. Mandatory Chainage Validation
    if (!_formKey.currentState!.validate() ||
        _startChainageController.text.trim().isEmpty ||
        _endChainageController.text.trim().isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Start and End Chainage are mandatory'),
          backgroundColor: AppTheme.redDanger,
          behavior: SnackBarBehavior.floating,
        ),
      );
      return;
    }

    // 3. Mandatory Project Activity Validation
    if (_selectedActivities.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Please select at least one project activity (Mandatory)'),
          backgroundColor: AppTheme.redDanger,
          behavior: SnackBarBehavior.floating,
        ),
      );
      return;
    }

    // 4. Mandatory Photo Validation
    if (_attachedPhotos.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('At least one site photograph is mandatory for submission'),
          backgroundColor: AppTheme.redDanger,
          behavior: SnackBarBehavior.floating,
        ),
      );
      return;
    }

    setState(() => _isSubmitting = true);

    LocationData? location;
    DateTime? capturedTimestamp;

    try {
      // Ensure GPS is fresh
      location = _currentLocation ?? await LocationService.getCurrentLocation();
      capturedTimestamp = DateTime.now();

      final submissionRepo = ref.read(submissionRepositoryProvider);
      final result = await submissionRepo.createDailyReport(
        projectId: _selectedProject!.id,
        startChainage: _startChainageController.text.trim(),
        endChainage: _endChainageController.text.trim(),
        activityIds: _selectedActivities.map((a) => a.id).toList(),
        latitude: location.latitude,
        longitude: location.longitude,
        accuracyMeters: location.accuracy,
        capturedAt: capturedTimestamp,
        remarks: _remarksController.text.trim(),
        photoFiles: _attachedPhotos.map((p) => p.file).toList(),
      );

      setState(() => _isSubmitting = false);

      if (mounted) {
        // Show success confirmation
        showDialog(
          context: context,
          barrierDismissible: false,
          builder: (ctx) => AlertDialog(
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16),
            ),
            icon: const Icon(
              Icons.check_circle_rounded,
              color: AppTheme.greenTag,
              size: 56,
            ),
            title: const Text(
              'Report Submitted',
              style: TextStyle(
                fontWeight: FontWeight.w800,
                color: AppTheme.primaryNavy,
              ),
            ),
            content: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  'Daily civil work report has been logged and geotagged successfully.',
                  style: TextStyle(fontSize: 14, color: AppTheme.textMuted),
                ),
                const SizedBox(height: 16),
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: AppTheme.bgLight,
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: AppTheme.borderColor),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Text('Chainage:',
                              style: TextStyle(
                                  fontWeight: FontWeight.w700, fontSize: 12)),
                          Text(
                              '${result.startChainage} → ${result.endChainage}',
                              style: const TextStyle(fontSize: 12)),
                        ],
                      ),
                      const SizedBox(height: 6),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Text('Activities:',
                              style: TextStyle(
                                  fontWeight: FontWeight.w700, fontSize: 12)),
                          Text('${result.activities.length} items',
                              style: const TextStyle(fontSize: 12)),
                        ],
                      ),
                      const SizedBox(height: 6),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Text('Photos:',
                              style: TextStyle(
                                  fontWeight: FontWeight.w700, fontSize: 12)),
                          Text('${result.photos.length} uploaded',
                              style: const TextStyle(fontSize: 12)),
                        ],
                      ),
                      const SizedBox(height: 6),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          const Text('GPS Fix:',
                              style: TextStyle(
                                  fontWeight: FontWeight.w700, fontSize: 12)),
                          Text(
                            '${location!.latitude.toStringAsFixed(4)}, ${location.longitude.toStringAsFixed(4)}',
                            style: const TextStyle(fontSize: 12),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
            actions: [
              TextButton(
                onPressed: () {
                  Navigator.pop(ctx);
                  // Reset form fields
                  setState(() {
                    _selectedActivities.clear();
                    _attachedPhotos.clear();
                    _remarksController.clear();
                  });
                },
                child: const Text('Log Another'),
              ),
              FilledButton(
                onPressed: () {
                  Navigator.pop(ctx);
                  context.go('/history');
                },
                style: FilledButton.styleFrom(
                  backgroundColor: AppTheme.primaryNavy,
                  foregroundColor: Colors.white,
                ),
                child: const Text('View in History'),
              ),
            ],
          ),
        );
      }
    } catch (e) {
      setState(() => _isSubmitting = false);
      final errorStr = e.toString().toLowerCase();
      final isNetworkError = errorStr.contains('connect') ||
          errorStr.contains('socket') ||
          errorStr.contains('timeout') ||
          errorStr.contains('offline') ||
          errorStr.contains('network') ||
          errorStr.contains('failed host lookup');

      if (isNetworkError && _selectedProject != null) {
        // Enqueue to persistent offline queue
        final syncQueue = ref.read(syncQueueServiceProvider);
        final task = SyncTask(
          id: 'offline_${DateTime.now().millisecondsSinceEpoch}',
          endpoint: ApiConfig.projectSubmissions(_selectedProject!.id),
          method: 'POST',
          payload: {
            'projectId': _selectedProject!.id,
            'projectName': _selectedProject!.name,
            'startChainage': _startChainageController.text.trim(),
            'endChainage': _endChainageController.text.trim(),
            'activityIds': _selectedActivities.map((a) => a.id).toList(),
            'activityNames': _selectedActivities.map((a) => a.name).toList(),
            'latitude': location?.latitude ?? 0.0,
            'longitude': location?.longitude ?? 0.0,
            'locationAccuracyM': location?.accuracy ?? 10.0,
            'locationCapturedAt':
                (capturedTimestamp ?? DateTime.now()).toIso8601String(),
            'remarks': _remarksController.text.trim(),
          },
          photoPaths: _attachedPhotos.map((p) => p.file.path).toList(),
          createdAt: DateTime.now(),
        );

        await syncQueue.enqueue(task);

        if (mounted) {
          showDialog(
            context: context,
            barrierDismissible: false,
            builder: (ctx) => AlertDialog(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(16),
              ),
              icon: const Icon(
                Icons.cloud_off_rounded,
                color: AppTheme.amberAccent,
                size: 56,
              ),
              title: const Text(
                'Report Saved to Offline Queue',
                style: TextStyle(
                  fontWeight: FontWeight.w800,
                  color: AppTheme.primaryNavy,
                ),
              ),
              content: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Network is unavailable. Your daily civil work report and photos are safely stored locally.',
                    style: TextStyle(fontSize: 14, color: AppTheme.textMuted),
                  ),
                  const SizedBox(height: 12),
                  const Text(
                    'It will automatically sync when connectivity is restored, or you can trigger sync manually in the History screen.',
                    style: TextStyle(
                        fontSize: 13,
                        color: AppTheme.textDark,
                        fontWeight: FontWeight.w600),
                  ),
                  const SizedBox(height: 16),
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: AppTheme.bgLight,
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(color: AppTheme.borderColor),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text('Chainage:',
                                style: TextStyle(
                                    fontWeight: FontWeight.w700, fontSize: 12)),
                            Text(
                              '${_startChainageController.text.trim()} → ${_endChainageController.text.trim()}',
                              style: const TextStyle(fontSize: 12),
                            ),
                          ],
                        ),
                        const SizedBox(height: 6),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text('Activities:',
                                style: TextStyle(
                                    fontWeight: FontWeight.w700, fontSize: 12)),
                            Text('${_selectedActivities.length} items',
                                style: const TextStyle(fontSize: 12)),
                          ],
                        ),
                        const SizedBox(height: 6),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            const Text('Photos Queued:',
                                style: TextStyle(
                                    fontWeight: FontWeight.w700, fontSize: 12)),
                            Text('${_attachedPhotos.length} photos',
                                style: const TextStyle(fontSize: 12)),
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
              actions: [
                TextButton(
                  onPressed: () {
                    Navigator.pop(ctx);
                    setState(() {
                      _selectedActivities.clear();
                      _attachedPhotos.clear();
                      _remarksController.clear();
                    });
                  },
                  child: const Text('Log Another'),
                ),
                FilledButton(
                  onPressed: () {
                    Navigator.pop(ctx);
                    context.go('/history');
                  },
                  style: FilledButton.styleFrom(
                    backgroundColor: AppTheme.amberAccent,
                    foregroundColor: Colors.white,
                  ),
                  child: const Text('View in History'),
                ),
              ],
            ),
          );
        }
        return;
      }

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Failed to submit report: $e'),
            backgroundColor: AppTheme.redDanger,
            behavior: SnackBarBehavior.floating,
          ),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    final projectsAsync = ref.watch(projectsFutureProvider);
    final spanDisplay = _calculateSpanDisplay();
    final timeFormat = DateFormat('hh:mm a');

    return Scaffold(
      backgroundColor: AppTheme.bgLight,
      appBar: AppBar(
        title: const Text('Submit Daily Report'),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh_rounded),
            tooltip: 'Refresh Projects & Activities',
            onPressed: () {
              ref.invalidate(projectsFutureProvider);
              if (_selectedProject != null) {
                ref.invalidate(projectActivitiesFamily(_selectedProject!.id));
              }
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content:
                      Text('Refreshing projects & activities from server...'),
                  duration: Duration(seconds: 1),
                  behavior: SnackBarBehavior.floating,
                ),
              );
            },
          ),
          IconButton(
            icon: const Icon(Icons.history_rounded),
            tooltip: 'Previous Reports',
            onPressed: () => context.go('/history'),
          ),
        ],
      ),
      body: SafeArea(
        child: RefreshIndicator(
          color: AppTheme.primaryEmerald,
          onRefresh: () async {
            ref.invalidate(projectsFutureProvider);
            if (_selectedProject != null) {
              ref.invalidate(projectActivitiesFamily(_selectedProject!.id));
              await ref
                  .read(projectActivitiesFamily(_selectedProject!.id).future);
            }
            await ref.read(projectsFutureProvider.future);
          },
          child: SingleChildScrollView(
            physics: const AlwaysScrollableScrollPhysics(),
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
            child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                // 1. GPS Fix Status Bar
                Container(
                  padding:
                      const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                  decoration: BoxDecoration(
                    color: AppTheme.primaryNavy,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Row(
                    children: [
                      Container(
                        height: 9,
                        width: 9,
                        decoration: const BoxDecoration(
                          color: AppTheme.greenTag,
                          shape: BoxShape.circle,
                        ),
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: FittedBox(
                          fit: BoxFit.scaleDown,
                          alignment: Alignment.centerLeft,
                          child: Text(
                            _isLocating
                                ? 'ACQUIRING GPS FIX...'
                                : 'GPS FIX ACTIVE • ${_currentLocation?.formattedAccuracy ?? '12m Acc.'}',
                            style: const TextStyle(
                              color: Colors.white,
                              fontSize: 12,
                              fontWeight: FontWeight.w700,
                              letterSpacing: 0.5,
                            ),
                          ),
                        ),
                      ),
                      const SizedBox(width: 8),
                      InkWell(
                        onTap: () => _fetchLocation(),
                        child: Text(
                          timeFormat.format(DateTime.now()),
                          style: const TextStyle(
                            color: Color(0xFFCAD3E0),
                            fontSize: 12,
                            fontWeight: FontWeight.w600,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 16),

                // 2. Project Selection Card
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Wrap(
                          alignment: WrapAlignment.spaceBetween,
                          crossAxisAlignment: WrapCrossAlignment.center,
                          spacing: 8,
                          runSpacing: 4,
                          children: [
                            const Text(
                              'PROJECT * (MANDATORY)',
                              style: TextStyle(
                                fontSize: 11,
                                fontWeight: FontWeight.w800,
                                color: AppTheme.primaryNavy,
                                letterSpacing: 0.8,
                              ),
                            ),
                            if (_selectedProject != null)
                              Container(
                                padding: const EdgeInsets.symmetric(
                                    horizontal: 8, vertical: 2),
                                decoration: BoxDecoration(
                                  color: AppTheme.amberLight,
                                  borderRadius: BorderRadius.circular(4),
                                ),
                                child: Text(
                                  _selectedProject!.projectCode,
                                  style: const TextStyle(
                                    fontSize: 11,
                                    fontWeight: FontWeight.w800,
                                    color: AppTheme.amberAccent,
                                  ),
                                ),
                              ),
                          ],
                        ),
                        const SizedBox(height: 8),
                        projectsAsync.when(
                          loading: () => const LinearProgressIndicator(),
                          error: (err, _) => Text(
                            'Error loading projects: $err',
                            style: const TextStyle(color: AppTheme.redDanger),
                          ),
                          data: (projects) {
                            if (projects.isEmpty) {
                              return const Text(
                                'No projects assigned yet',
                                style: TextStyle(color: AppTheme.textMuted),
                              );
                            }

                            // Auto-select first project if none selected
                            if (_selectedProject == null &&
                                projects.isNotEmpty) {
                              WidgetsBinding.instance.addPostFrameCallback((_) {
                                if (mounted) {
                                  setState(() {
                                    _selectedProject = projects.first;
                                  });
                                }
                              });
                            }

                            final effectiveProject = _selectedProject == null
                                ? (projects.isNotEmpty ? projects.first : null)
                                : projects.cast<ProjectModel?>().firstWhere(
                                    (p) => p?.id == _selectedProject!.id,
                                    orElse: () =>
                                        projects.isNotEmpty ? projects.first : null,
                                  );

                            return DropdownButtonFormField<ProjectModel>(
                              value: effectiveProject,
                              isExpanded: true,
                              decoration: const InputDecoration(
                                prefixIcon: Icon(Icons.apartment_rounded,
                                    color: AppTheme.primaryNavy),
                                contentPadding: EdgeInsets.symmetric(
                                    horizontal: 12, vertical: 12),
                              ),
                              hint: const Text('Select Assigned Project'),
                              items: projects.map((p) {
                                return DropdownMenuItem(
                                  value: p,
                                  child: Text(
                                    p.name,
                                    overflow: TextOverflow.ellipsis,
                                    style: const TextStyle(
                                      fontWeight: FontWeight.w600,
                                      fontSize: 14,
                                    ),
                                  ),
                                );
                              }).toList(),
                              onChanged: (val) {
                                setState(() {
                                  _selectedProject = val;
                                  _selectedActivities.clear();
                                });
                              },
                            );
                          },
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 14),

                // 3. Chainage Extents Card
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Wrap(
                          alignment: WrapAlignment.spaceBetween,
                          crossAxisAlignment: WrapCrossAlignment.center,
                          spacing: 8,
                          runSpacing: 4,
                          children: [
                            const Text(
                              'CHAINAGE EXTENTS * (MANDATORY)',
                              style: TextStyle(
                                fontSize: 11,
                                fontWeight: FontWeight.w800,
                                color: AppTheme.primaryNavy,
                                letterSpacing: 0.8,
                              ),
                            ),
                            if (spanDisplay.isNotEmpty)
                              Container(
                                padding: const EdgeInsets.symmetric(
                                    horizontal: 8, vertical: 2),
                                decoration: BoxDecoration(
                                  color: AppTheme.greenLight,
                                  borderRadius: BorderRadius.circular(4),
                                ),
                                child: Text(
                                  spanDisplay,
                                  style: const TextStyle(
                                    fontSize: 11,
                                    fontWeight: FontWeight.w800,
                                    color: AppTheme.greenTag,
                                  ),
                                ),
                              ),
                          ],
                        ),
                        const SizedBox(height: 12),
                        LayoutBuilder(
                          builder: (context, constraints) {
                            final isNarrow = constraints.maxWidth < 360;

                             final startField = Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text(
                                  'START CHAINAGE *',
                                  style: TextStyle(
                                    fontSize: 10,
                                    fontWeight: FontWeight.w700,
                                    color: AppTheme.textMuted,
                                  ),
                                ),
                                const SizedBox(height: 4),
                                TextFormField(
                                  controller: _startChainageController,
                                  keyboardType: TextInputType.text,
                                  decoration: const InputDecoration(
                                    hintText: 'e.g. 1450',
                                    prefixIcon: Icon(Icons.straighten,
                                        size: 18, color: AppTheme.textMuted),
                                    contentPadding: EdgeInsets.symmetric(
                                        horizontal: 10, vertical: 12),
                                  ),
                                  validator: (val) {
                                    if (val == null || val.trim().isEmpty) {
                                      return 'Start chainage is mandatory';
                                    }
                                    return null;
                                  },
                                ),
                              ],
                            );

                            final endField = Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                const Text(
                                  'END CHAINAGE *',
                                  style: TextStyle(
                                    fontSize: 10,
                                    fontWeight: FontWeight.w700,
                                    color: AppTheme.textMuted,
                                  ),
                                ),
                                const SizedBox(height: 4),
                                TextFormField(
                                  controller: _endChainageController,
                                  keyboardType: TextInputType.text,
                                  decoration: const InputDecoration(
                                    hintText: 'e.g. 1800',
                                    prefixIcon: Icon(Icons.flag_outlined,
                                        size: 18, color: AppTheme.textMuted),
                                    contentPadding: EdgeInsets.symmetric(
                                        horizontal: 10, vertical: 12),
                                  ),
                                  validator: (val) {
                                    if (val == null || val.trim().isEmpty) {
                                      return 'End chainage is mandatory';
                                    }
                                    return null;
                                  },
                                ),
                              ],
                            );

                            if (isNarrow) {
                              return Column(
                                children: [
                                  startField,
                                  const SizedBox(height: 10),
                                  endField,
                                ],
                              );
                            }

                            return Row(
                              children: [
                                Expanded(child: startField),
                                const SizedBox(width: 12),
                                Expanded(child: endField),
                              ],
                            );
                          },
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 14),

                // 4. Project Activities Multiselect Card
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Wrap(
                          alignment: WrapAlignment.spaceBetween,
                          crossAxisAlignment: WrapCrossAlignment.center,
                          spacing: 8,
                          runSpacing: 4,
                          children: [
                            const Text(
                              'PROJECT ACTIVITIES * (MANDATORY)',
                              style: TextStyle(
                                fontSize: 11,
                                fontWeight: FontWeight.w800,
                                color: AppTheme.primaryNavy,
                                letterSpacing: 0.8,
                              ),
                            ),
                            Text(
                              '${_selectedActivities.length} Selected',
                              style: const TextStyle(
                                fontSize: 11,
                                fontWeight: FontWeight.w700,
                                color: AppTheme.amberAccent,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 12),

                        // Selected Activity Chips or Placeholder
                        if (_selectedProject != null) ...[
                          ref
                              .watch(projectActivitiesFamily(
                                  _selectedProject!.id))
                              .when(
                                loading: () => const LinearProgressIndicator(),
                                error: (err, _) => Text(
                                  'Error loading activities: $err',
                                  style: const TextStyle(
                                      color: AppTheme.redDanger, fontSize: 12),
                                ),
                                data: (availableActivities) {
                                  return Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                      Wrap(
                                        spacing: 8,
                                        runSpacing: 8,
                                        children: [
                                          ..._selectedActivities.map((act) {
                                            return Chip(
                                              label: Text(
                                                act.name,
                                                style: const TextStyle(
                                                  fontSize: 12,
                                                  fontWeight: FontWeight.w700,
                                                  color: AppTheme.primaryEmerald,
                                                ),
                                              ),
                                              backgroundColor: AppTheme.emeraldLight,
                                              deleteIcon: const Icon(
                                                Icons.close,
                                                size: 16,
                                                color: AppTheme.primaryEmerald,
                                              ),
                                              onDeleted: () {
                                                setState(() {
                                                  _selectedActivities
                                                      .removeWhere(
                                                          (a) => a.id == act.id);
                                                });
                                              },
                                              shape: RoundedRectangleBorder(
                                                borderRadius:
                                                    BorderRadius.circular(8),
                                                side: const BorderSide(
                                                    color: Color(0xFFA7D7BC)),
                                              ),
                                            );
                                          }),

                                          // "+ Add Activity" button
                                          ActionChip(
                                            avatar: const Icon(
                                              Icons.add,
                                              size: 16,
                                              color: AppTheme.primaryNavy,
                                            ),
                                            label: const Text(
                                              'Add Activity',
                                              style: TextStyle(
                                                fontSize: 12,
                                                fontWeight: FontWeight.w700,
                                                color: AppTheme.primaryNavy,
                                              ),
                                            ),
                                            backgroundColor: AppTheme.bgLight,
                                            side: const BorderSide(
                                                color: AppTheme.borderColor),
                                            shape: RoundedRectangleBorder(
                                              borderRadius:
                                                  BorderRadius.circular(8),
                                            ),
                                            onPressed: () =>
                                                _openActivitySelector(
                                                    availableActivities),
                                          ),
                                        ],
                                      ),
                                    ],
                                  );
                                },
                              ),
                        ] else
                          const Text(
                            'Select a project to load activities',
                            style: TextStyle(
                                color: AppTheme.textMuted, fontSize: 13),
                          ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 14),

                // 5. Site Photos Card (Camera clicking multiple photos)
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Wrap(
                          alignment: WrapAlignment.spaceBetween,
                          crossAxisAlignment: WrapCrossAlignment.center,
                          spacing: 8,
                          runSpacing: 4,
                          children: [
                            const Text(
                              'SITE PHOTOS * (MANDATORY)',
                              style: TextStyle(
                                fontSize: 11,
                                fontWeight: FontWeight.w800,
                                color: AppTheme.primaryNavy,
                                letterSpacing: 0.8,
                              ),
                            ),
                            Text(
                              '${_attachedPhotos.length} Attached',
                              style: const TextStyle(
                                fontSize: 11,
                                fontWeight: FontWeight.w700,
                                color: AppTheme.textMuted,
                              ),
                            ),
                          ],
                        ),
                        if (_attachedPhotos.isEmpty)
                          Container(
                            margin: const EdgeInsets.only(top: 8),
                            padding: const EdgeInsets.symmetric(
                                horizontal: 10, vertical: 8),
                            decoration: BoxDecoration(
                              color: AppTheme.amberLight,
                              borderRadius: BorderRadius.circular(6),
                              border:
                                  Border.all(color: const Color(0xFFFDE68A)),
                            ),
                            child: const Row(
                              children: [
                                Icon(Icons.warning_amber_rounded,
                                    size: 16, color: AppTheme.amberAccent),
                                SizedBox(width: 8),
                                Expanded(
                                  child: Text(
                                    'At least 1 site photograph is mandatory before submission',
                                    style: TextStyle(
                                      fontSize: 11,
                                      fontWeight: FontWeight.w700,
                                      color: Color(0xFF92400E),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        const SizedBox(height: 12),
                        PhotoPickerStrip(
                          photos: _attachedPhotos,
                          projectName: _selectedProject?.name ?? '',
                          startChainage: _startChainageController.text.trim(),
                          endChainage: _endChainageController.text.trim(),
                          latitude: _currentLocation?.latitude,
                          longitude: _currentLocation?.longitude,
                          accuracyMeters: _currentLocation?.accuracy,
                          onPhotoAdded: (item) {
                            setState(() => _attachedPhotos.add(item));
                          },
                          onPhotoRemoved: (index) {
                            setState(() => _attachedPhotos.removeAt(index));
                          },
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 14),

                // 6. Remarks & Delays Card
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Wrap(
                          alignment: WrapAlignment.spaceBetween,
                          crossAxisAlignment: WrapCrossAlignment.center,
                          spacing: 8,
                          runSpacing: 4,
                          children: [
                            const Text(
                              'REMARKS & DELAYS',
                              style: TextStyle(
                                fontSize: 11,
                                fontWeight: FontWeight.w800,
                                color: AppTheme.primaryNavy,
                                letterSpacing: 0.8,
                              ),
                            ),
                            Text(
                              '${_remarksController.text.length} chars',
                              style: const TextStyle(
                                fontSize: 11,
                                color: AppTheme.textMuted,
                              ),
                            ),
                          ],
                        ),
                        if (_selectedActivities.isNotEmpty) ...[
                          const SizedBox(height: 8),
                          SingleChildScrollView(
                            scrollDirection: Axis.horizontal,
                            child: Row(
                              children: [
                                const Text(
                                  'BOQ Progress:',
                                  style: TextStyle(
                                    fontSize: 11,
                                    fontWeight: FontWeight.w700,
                                    color: AppTheme.primaryNavy,
                                  ),
                                ),
                                const SizedBox(width: 6),
                                ..._selectedActivities.map((act) => Padding(
                                      padding: const EdgeInsets.only(right: 6),
                                      child: ActionChip(
                                        avatar: const Icon(
                                          Icons.add_chart_rounded,
                                          size: 13,
                                          color: AppTheme.greenTag,
                                        ),
                                        label: Text(
                                          '+ ${act.activityCode} Qty',
                                          style: const TextStyle(
                                            fontSize: 11,
                                            fontWeight: FontWeight.w600,
                                          ),
                                        ),
                                        backgroundColor: AppTheme.bgLight,
                                        side: const BorderSide(
                                            color: AppTheme.borderColor),
                                        padding: const EdgeInsets.symmetric(
                                            horizontal: 4),
                                        onPressed: () {
                                          final template =
                                              '[BOQ: ${act.activityCode} ${act.name} | Qty: ____ ${act.unit ?? "units"}]';
                                          final current =
                                              _remarksController.text.trim();
                                          if (current.isEmpty) {
                                            _remarksController.text = template;
                                          } else {
                                            _remarksController.text =
                                                '$current\n$template';
                                          }
                                          setState(() {});
                                        },
                                      ),
                                    )),
                              ],
                            ),
                          ),
                        ],
                        const SizedBox(height: 8),
                        TextFormField(
                          controller: _remarksController,
                          maxLines: 4,
                          decoration: const InputDecoration(
                            hintText:
                                'Record site observations, weather delays, equipment status, or inspection notes...',
                          ),
                          onChanged: (_) => setState(() {}),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: 20),

                // 7. Submit Button (with GPS & timestamp confirmation)
                SizedBox(
                  height: 54,
                  child: FilledButton(
                    onPressed: _isSubmitting ? null : _handleSubmit,
                    style: FilledButton.styleFrom(
                      backgroundColor: AppTheme.amberAccent,
                      foregroundColor: Colors.white,
                      elevation: 2,
                    ),
                    child: FittedBox(
                      fit: BoxFit.scaleDown,
                      child: _isSubmitting
                          ? const Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                SizedBox(
                                  height: 20,
                                  width: 20,
                                  child: CircularProgressIndicator(
                                    strokeWidth: 2.5,
                                    valueColor: AlwaysStoppedAnimation<Color>(
                                        Colors.white),
                                  ),
                                ),
                                SizedBox(width: 12),
                                Text(
                                  'Uploading & Logging Report...',
                                  style: TextStyle(
                                      fontSize: 15, fontWeight: FontWeight.w700),
                                ),
                              ],
                            )
                          : const Row(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(Icons.send_rounded, size: 20),
                                SizedBox(width: 8),
                                Text(
                                  'Submit Report',
                                  style: TextStyle(
                                    fontSize: 16,
                                    fontWeight: FontWeight.w800,
                                    letterSpacing: 0.5,
                                  ),
                                ),
                              ],
                            ),
                    ),
                  ),
                ),
                const SizedBox(height: 8),
                const Center(
                  child: Text(
                    '● Geotagged with high-accuracy GPS & timestamp on submit',
                    style: TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.w500,
                      color: AppTheme.textMuted,
                    ),
                  ),
                ),
                const SizedBox(height: 24),
              ],
            ),
          ),
        ),
        ),
      ),
    );
  }
}
