import 'package:flutter/material.dart';
import 'package:civil_erp/core/theme/app_theme.dart';
import 'package:civil_erp/features/projects/domain/activity_model.dart';

class ActivitySelectorSheet extends StatefulWidget {
  final List<ActivityModel> allActivities;
  final List<ActivityModel> selectedActivities;
  final ValueChanged<List<ActivityModel>> onSelectionChanged;
  final Future<void> Function()? onRefresh;

  const ActivitySelectorSheet({
    super.key,
    required this.allActivities,
    required this.selectedActivities,
    required this.onSelectionChanged,
    this.onRefresh,
  });

  @override
  State<ActivitySelectorSheet> createState() => _ActivitySelectorSheetState();
}

class _ActivitySelectorSheetState extends State<ActivitySelectorSheet> {
  late List<ActivityModel> _currentSelected;
  final TextEditingController _searchController = TextEditingController();
  String _searchQuery = '';
  final Set<String> _expandedParentIds = {};
  bool _isRefreshing = false;

  @override
  void initState() {
    super.initState();
    // Ensure only subactivities can be selected
    _currentSelected = widget.selectedActivities
        .where((a) => a.parentId != null && a.parentId!.isNotEmpty)
        .toList();
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  void _toggleSelection(ActivityModel activity) {
    // Only subactivities are selectable
    if (activity.parentId == null || activity.parentId!.isEmpty) {
      return;
    }
    setState(() {
      final index = _currentSelected.indexWhere((a) => a.id == activity.id);
      if (index >= 0) {
        _currentSelected.removeAt(index);
      } else {
        _currentSelected.add(activity);
      }
    });
  }

  void _toggleSelectAllInParent(List<ActivityModel> children) {
    final allSelected = children.every(
      (c) => _currentSelected.any((s) => s.id == c.id),
    );
    setState(() {
      if (allSelected) {
        final childIds = children.map((c) => c.id).toSet();
        _currentSelected.removeWhere((s) => childIds.contains(s.id));
      } else {
        for (final c in children) {
          if (!_currentSelected.any((s) => s.id == c.id)) {
            _currentSelected.add(c);
          }
        }
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    // 1. Separate parents and children
    final parentActivities = widget.allActivities
        .where((a) => a.parentId == null || a.parentId!.isEmpty)
        .toList();

    final childrenMap = <String, List<ActivityModel>>{};
    final orphanSubs = <ActivityModel>[];

    for (final act in widget.allActivities) {
      if (act.parentId != null && act.parentId!.isNotEmpty) {
        final pid = act.parentId!;
        final parentExists = parentActivities.any((p) => p.id == pid);
        if (parentExists) {
          childrenMap.putIfAbsent(pid, () => []).add(act);
        } else {
          orphanSubs.add(act);
        }
      }
    }

    final effectiveParents = List<ActivityModel>.from(parentActivities);
    if (orphanSubs.isNotEmpty) {
      final orphanParent = const ActivityModel(
        id: '__orphan_general__',
        activityCode: 'GEN',
        name: 'General Subactivities',
      );
      effectiveParents.add(orphanParent);
      childrenMap['__orphan_general__'] = orphanSubs;
    }

    // Sort parents by activityCode
    effectiveParents.sort((a, b) => a.activityCode.compareTo(b.activityCode));

    // 2. Filter parents and children based on search query
    final q = _searchQuery.trim().toLowerCase();
    final filteredParents = effectiveParents.where((parent) {
      if (q.isEmpty) return true;
      final parentMatches = parent.name.toLowerCase().contains(q) ||
          parent.activityCode.toLowerCase().contains(q);
      final children = childrenMap[parent.id] ?? [];
      final childMatches = children.any((c) =>
          c.name.toLowerCase().contains(q) ||
          c.activityCode.toLowerCase().contains(q));
      return parentMatches || childMatches;
    }).toList();

    return Container(
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      padding: EdgeInsets.only(
        bottom: MediaQuery.of(context).viewInsets.bottom + 16,
        left: 16,
        right: 16,
        top: 12,
      ),
      constraints: BoxConstraints(
        maxHeight: MediaQuery.of(context).size.height * 0.85,
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Drag handle
          Center(
            child: Container(
              width: 44,
              height: 4,
              decoration: BoxDecoration(
                color: Colors.grey.shade300,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
          ),
          const SizedBox(height: 14),

          // Header
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Row(
                children: [
                  const Icon(Icons.account_tree_outlined,
                      size: 20, color: AppTheme.primaryEmerald),
                  const SizedBox(width: 8),
                  const Text(
                    'Select Activities',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.w800,
                      color: AppTheme.textDark,
                    ),
                  ),
                  if (widget.onRefresh != null) ...[
                    const SizedBox(width: 4),
                    IconButton(
                      icon: _isRefreshing
                          ? const SizedBox(
                              width: 16,
                              height: 16,
                              child: CircularProgressIndicator(strokeWidth: 2),
                            )
                          : const Icon(Icons.refresh_rounded,
                              size: 20, color: AppTheme.primaryEmerald),
                      tooltip: 'Refresh Activities from Web',
                      onPressed: _isRefreshing
                          ? null
                          : () async {
                              setState(() => _isRefreshing = true);
                              try {
                                await widget.onRefresh!();
                              } finally {
                                if (mounted) {
                                  setState(() => _isRefreshing = false);
                                }
                              }
                            },
                    ),
                  ],
                ],
              ),
              Container(
                padding:
                    const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: _currentSelected.isNotEmpty
                      ? AppTheme.emeraldLight
                      : AppTheme.bgLight,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(
                    color: _currentSelected.isNotEmpty
                        ? AppTheme.primaryEmerald
                        : AppTheme.borderColor,
                  ),
                ),
                child: Text(
                  '${_currentSelected.length} Selected',
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w700,
                    color: _currentSelected.isNotEmpty
                        ? AppTheme.primaryEmerald
                        : AppTheme.textMuted,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),

          // Search Field
          TextField(
            controller: _searchController,
            decoration: InputDecoration(
              hintText: 'Search parent or subactivity code/name...',
              prefixIcon:
                  const Icon(Icons.search, size: 20, color: AppTheme.textMuted),
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
              contentPadding:
                  const EdgeInsets.symmetric(vertical: 11, horizontal: 14),
              filled: true,
              fillColor: AppTheme.bgLight,
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
                borderSide: const BorderSide(color: AppTheme.borderColor),
              ),
              enabledBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
                borderSide: const BorderSide(color: AppTheme.borderColor),
              ),
              focusedBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
                borderSide:
                    const BorderSide(color: AppTheme.primaryEmerald, width: 1.5),
              ),
            ),
            onChanged: (val) {
              setState(() => _searchQuery = val);
            },
          ),
          const SizedBox(height: 12),

          // Two-Level Activity List
          Expanded(
            child: filteredParents.isEmpty
                ? const Center(
                    child: Padding(
                      padding: EdgeInsets.all(24.0),
                      child: Text(
                        'No matching activities found for this project.',
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: AppTheme.textMuted,
                          fontSize: 13,
                        ),
                      ),
                    ),
                  )
                : ListView.builder(
                    itemCount: filteredParents.length,
                    itemBuilder: (context, index) {
                      final parent = filteredParents[index];
                      final allChildren = childrenMap[parent.id] ?? [];
                      final filteredChildren = q.isEmpty
                          ? allChildren
                          : allChildren.where((c) {
                              final parentMatch = parent.name
                                      .toLowerCase()
                                      .contains(q) ||
                                  parent.activityCode.toLowerCase().contains(q);
                              final childMatch = c.name
                                      .toLowerCase()
                                      .contains(q) ||
                                  c.activityCode.toLowerCase().contains(q);
                              return parentMatch || childMatch;
                            }).toList();

                      // Auto-expand when search query is active, otherwise respect toggle state
                      final isExpanded = q.isNotEmpty ||
                          _expandedParentIds.contains(parent.id);

                      final hasChildren = allChildren.isNotEmpty;
                      final selectedChildrenCount = allChildren
                          .where((c) =>
                              _currentSelected.any((s) => s.id == c.id))
                          .length;

                      return Container(
                        margin: const EdgeInsets.only(bottom: 10),
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.circular(12),
                          border: Border.all(
                            color: selectedChildrenCount > 0
                                ? AppTheme.primaryEmerald
                                : AppTheme.borderColor,
                            width: selectedChildrenCount > 0 ? 1.5 : 1.0,
                          ),
                        ),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.stretch,
                          children: [
                            // Parent Header Tile (Accordion Only - Non-Selectable)
                            InkWell(
                              onTap: () {
                                if (hasChildren) {
                                  setState(() {
                                    if (_expandedParentIds.contains(parent.id)) {
                                      _expandedParentIds.remove(parent.id);
                                    } else {
                                      _expandedParentIds.add(parent.id);
                                    }
                                  });
                                }
                              },
                              borderRadius: BorderRadius.circular(12),
                              child: Container(
                                padding: const EdgeInsets.symmetric(
                                    horizontal: 14, vertical: 12),
                                decoration: BoxDecoration(
                                  color: selectedChildrenCount > 0
                                      ? AppTheme.emeraldSurface
                                      : AppTheme.bgLight,
                                  borderRadius: isExpanded && hasChildren
                                      ? const BorderRadius.vertical(
                                          top: Radius.circular(11))
                                      : BorderRadius.circular(11),
                                ),
                                child: Row(
                                  children: [
                                    // Code badge
                                    Container(
                                      padding: const EdgeInsets.symmetric(
                                          horizontal: 7, vertical: 3),
                                      decoration: BoxDecoration(
                                        color: AppTheme.primaryEmerald,
                                        borderRadius: BorderRadius.circular(6),
                                      ),
                                      child: Text(
                                        parent.activityCode,
                                        style: const TextStyle(
                                          color: Colors.white,
                                          fontWeight: FontWeight.w800,
                                          fontSize: 11.5,
                                        ),
                                      ),
                                    ),
                                    const SizedBox(width: 10),

                                    // Parent Title
                                    Expanded(
                                      child: Text(
                                        parent.name,
                                        style: TextStyle(
                                          fontWeight: FontWeight.w700,
                                          fontSize: 14,
                                          color: selectedChildrenCount > 0
                                              ? AppTheme.primaryEmerald
                                              : AppTheme.textDark,
                                        ),
                                      ),
                                    ),

                                    // Status Badge / Counts
                                    if (hasChildren) ...[
                                      if (selectedChildrenCount > 0)
                                        Container(
                                          padding: const EdgeInsets.symmetric(
                                              horizontal: 8, vertical: 2),
                                          margin:
                                              const EdgeInsets.only(right: 6),
                                          decoration: BoxDecoration(
                                            color: AppTheme.primaryEmerald,
                                            borderRadius:
                                                BorderRadius.circular(10),
                                          ),
                                          child: Text(
                                            '$selectedChildrenCount/${allChildren.length} selected',
                                            style: const TextStyle(
                                              color: Colors.white,
                                              fontSize: 11,
                                              fontWeight: FontWeight.w700,
                                            ),
                                          ),
                                        )
                                      else
                                        Text(
                                          '${allChildren.length} sub',
                                          style: const TextStyle(
                                            fontSize: 12,
                                            color: AppTheme.textMuted,
                                            fontWeight: FontWeight.w600,
                                          ),
                                        ),
                                      const SizedBox(width: 4),
                                      Icon(
                                        isExpanded
                                            ? Icons.keyboard_arrow_up_rounded
                                            : Icons.keyboard_arrow_down_rounded,
                                        color: AppTheme.textMuted,
                                        size: 22,
                                      ),
                                    ] else ...[
                                      const Text(
                                        'No subactivities',
                                        style: TextStyle(
                                          fontSize: 11,
                                          color: AppTheme.textMuted,
                                          fontStyle: FontStyle.italic,
                                        ),
                                      ),
                                    ],
                                  ],
                                ),
                              ),
                            ),

                            // Subactivities Section (when expanded)
                            if (isExpanded && hasChildren) ...[
                              const Divider(
                                height: 1,
                                thickness: 1,
                                color: AppTheme.borderColor,
                              ),
                              // Subactivity action row (Select all / clear in this parent)
                              Padding(
                                padding: const EdgeInsets.symmetric(
                                    horizontal: 14, vertical: 6),
                                child: Row(
                                  mainAxisAlignment:
                                      MainAxisAlignment.spaceBetween,
                                  children: [
                                    Text(
                                      'Subactivities (${filteredChildren.length})',
                                      style: const TextStyle(
                                        fontSize: 11.5,
                                        fontWeight: FontWeight.w600,
                                        color: AppTheme.textMuted,
                                      ),
                                    ),
                                    TextButton(
                                      onPressed: () =>
                                          _toggleSelectAllInParent(allChildren),
                                      style: TextButton.styleFrom(
                                        padding: const EdgeInsets.symmetric(
                                            horizontal: 6, vertical: 2),
                                        minimumSize: Size.zero,
                                        tapTargetSize:
                                            MaterialTapTargetSize.shrinkWrap,
                                      ),
                                      child: Text(
                                        selectedChildrenCount == allChildren.length
                                            ? 'Deselect All'
                                            : 'Select All',
                                        style: const TextStyle(
                                          fontSize: 11.5,
                                          fontWeight: FontWeight.w700,
                                          color: AppTheme.primaryEmerald,
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                              // Subactivities Items
                              ...filteredChildren.map((child) {
                                final isSelected = _currentSelected
                                    .any((s) => s.id == child.id);

                                return InkWell(
                                  onTap: () => _toggleSelection(child),
                                  child: Container(
                                    padding: const EdgeInsets.symmetric(
                                        horizontal: 14, vertical: 10),
                                    decoration: BoxDecoration(
                                      color: isSelected
                                          ? AppTheme.emeraldLight
                                          : Colors.transparent,
                                      border: const Border(
                                        top: BorderSide(
                                            color: AppTheme.borderColor,
                                            width: 0.5),
                                      ),
                                    ),
                                    child: Row(
                                      children: [
                                        SizedBox(
                                          width: 24,
                                          height: 24,
                                          child: Checkbox(
                                            value: isSelected,
                                            activeColor:
                                                AppTheme.primaryEmerald,
                                            shape: RoundedRectangleBorder(
                                              borderRadius:
                                                  BorderRadius.circular(4),
                                            ),
                                            onChanged: (_) =>
                                                _toggleSelection(child),
                                          ),
                                        ),
                                        const SizedBox(width: 12),
                                        // Child code
                                        Container(
                                          padding: const EdgeInsets.symmetric(
                                              horizontal: 6, vertical: 2),
                                          decoration: BoxDecoration(
                                            color: AppTheme.bgLight,
                                            borderRadius:
                                                BorderRadius.circular(4),
                                            border: Border.all(
                                                color: AppTheme.borderColor),
                                          ),
                                          child: Text(
                                            child.activityCode,
                                            style: const TextStyle(
                                              fontSize: 11,
                                              fontWeight: FontWeight.w700,
                                              color: AppTheme.textMuted,
                                            ),
                                          ),
                                        ),
                                        const SizedBox(width: 8),
                                        // Child name
                                        Expanded(
                                          child: Text(
                                            child.name,
                                            style: TextStyle(
                                              fontSize: 13,
                                              fontWeight: isSelected
                                                  ? FontWeight.w700
                                                  : FontWeight.w500,
                                              color: isSelected
                                                  ? AppTheme.primaryEmerald
                                                  : AppTheme.textDark,
                                            ),
                                          ),
                                        ),
                                        // Optional Unit
                                        if (child.unit != null &&
                                            child.unit!.isNotEmpty)
                                          Container(
                                            padding: const EdgeInsets.symmetric(
                                                horizontal: 6, vertical: 2),
                                            decoration: BoxDecoration(
                                              color: AppTheme.bgLight,
                                              borderRadius:
                                                  BorderRadius.circular(4),
                                            ),
                                            child: Text(
                                              child.unit!,
                                              style: const TextStyle(
                                                fontSize: 10.5,
                                                fontWeight: FontWeight.w600,
                                                color: AppTheme.textMuted,
                                              ),
                                            ),
                                          ),
                                      ],
                                    ),
                                  ),
                                );
                              }),
                            ],
                          ],
                        ),
                      );
                    },
                  ),
          ),
          const SizedBox(height: 12),

          // Bottom Action Buttons
          Row(
            children: [
              if (_currentSelected.isNotEmpty)
                TextButton(
                  onPressed: () {
                    setState(() {
                      _currentSelected.clear();
                    });
                  },
                  child: const Text(
                    'Clear All',
                    style: TextStyle(
                      color: AppTheme.redDanger,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),
              const Spacer(),
              FilledButton.icon(
                onPressed: () {
                  widget.onSelectionChanged(_currentSelected);
                  Navigator.of(context).pop();
                },
                style: FilledButton.styleFrom(
                  backgroundColor: AppTheme.primaryEmerald,
                  foregroundColor: Colors.white,
                  padding:
                      const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
                icon: const Icon(Icons.check_rounded, size: 18),
                label: Text(
                  'Apply Selection (${_currentSelected.length})',
                  style: const TextStyle(fontWeight: FontWeight.w700),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
