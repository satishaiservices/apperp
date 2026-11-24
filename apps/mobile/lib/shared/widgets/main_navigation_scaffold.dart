import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:civil_erp/core/theme/app_theme.dart';
import 'package:civil_erp/features/projects/data/project_repository.dart';

class MainNavigationScaffold extends ConsumerStatefulWidget {
  final Widget child;
  final String location;

  const MainNavigationScaffold({
    super.key,
    required this.child,
    required this.location,
  });

  @override
  ConsumerState<MainNavigationScaffold> createState() =>
      _MainNavigationScaffoldState();
}

class _MainNavigationScaffoldState extends ConsumerState<MainNavigationScaffold>
    with WidgetsBindingObserver {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addObserver(this);
  }

  @override
  void dispose() {
    WidgetsBinding.instance.removeObserver(this);
    super.dispose();
  }

  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.resumed) {
      // Re-fetch projects and activities from server whenever supervisor returns to app
      ref.invalidate(projectsFutureProvider);
    }
  }

  int _calculateSelectedIndex() {
    if (widget.location.startsWith('/attendance')) return 0;
    if (widget.location.startsWith('/submit-report')) return 1;
    if (widget.location.startsWith('/history')) return 2;
    if (widget.location.startsWith('/profile')) return 3;
    return 1;
  }

  void _onItemTapped(int index, BuildContext context) {
    // Proactively refresh projects cache on switching to project-dependent tabs
    if (index == 0 || index == 1) {
      ref.invalidate(projectsFutureProvider);
    }

    switch (index) {
      case 0:
        context.go('/attendance');
        break;
      case 1:
        context.go('/submit-report');
        break;
      case 2:
        context.go('/history');
        break;
      case 3:
        context.go('/profile');
        break;
    }
  }

  @override
  Widget build(BuildContext context) {
    final selectedIndex = _calculateSelectedIndex();

    return Scaffold(
      body: widget.child,
      bottomNavigationBar: NavigationBar(
        selectedIndex: selectedIndex,
        onDestinationSelected: (idx) => _onItemTapped(idx, context),
        backgroundColor: AppTheme.emeraldDark,
        indicatorColor: AppTheme.emeraldAccent,
        surfaceTintColor: Colors.transparent,
        height: 68,
        labelBehavior: NavigationDestinationLabelBehavior.alwaysShow,
        destinations: const [
          NavigationDestination(
            icon: Icon(Icons.badge_outlined, color: Color(0xFFA7C7B5)),
            selectedIcon: Icon(Icons.badge, color: AppTheme.emeraldDark),
            label: 'Roster',
          ),
          NavigationDestination(
            icon: Icon(Icons.edit_note_outlined, color: Color(0xFFA7C7B5)),
            selectedIcon: Icon(Icons.edit_note, color: AppTheme.emeraldDark),
            label: 'Log Report',
          ),
          NavigationDestination(
            icon: Icon(Icons.history_outlined, color: Color(0xFFA7C7B5)),
            selectedIcon: Icon(Icons.history, color: AppTheme.emeraldDark),
            label: 'History',
          ),
          NavigationDestination(
            icon: Icon(Icons.person_outline_rounded, color: Color(0xFFA7C7B5)),
            selectedIcon:
                Icon(Icons.person_rounded, color: AppTheme.emeraldDark),
            label: 'Profile',
          ),
        ],
      ),
    );
  }
}
