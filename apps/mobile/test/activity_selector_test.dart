import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:civil_erp/features/projects/domain/activity_model.dart';
import 'package:civil_erp/features/submissions/presentation/widgets/activity_selector_sheet.dart';

void main() {
  final testActivities = [
    const ActivityModel(
      id: 'p1',
      activityCode: '1.0',
      name: 'Earthwork & Embankment',
    ),
    const ActivityModel(
      id: 's1',
      parentId: 'p1',
      activityCode: '1.1',
      name: 'Clearing & Grubbing',
      unit: 'Sqm',
    ),
    const ActivityModel(
      id: 's2',
      parentId: 'p1',
      activityCode: '1.2',
      name: 'Embankment Layer Compaction',
      unit: 'Cum',
    ),
    const ActivityModel(
      id: 'p2',
      activityCode: '2.0',
      name: 'Sub-Base & Pavement',
    ),
    const ActivityModel(
      id: 's3',
      parentId: 'p2',
      activityCode: '2.1',
      name: 'Granular Sub-Base (GSB)',
      unit: 'Cum',
    ),
  ];

  testWidgets('ActivitySelectorSheet displays 2-level hierarchy and allows expansion & selection', (tester) async {
    List<ActivityModel> selected = [];

    await tester.pumpWidget(
      MaterialApp(
        home: Scaffold(
          body: ActivitySelectorSheet(
            allActivities: testActivities,
            selectedActivities: selected,
            onSelectionChanged: (updated) {
              selected = updated;
            },
          ),
        ),
      ),
    );

    // Initial state: parents visible
    expect(find.text('Earthwork & Embankment'), findsOneWidget);
    expect(find.text('Sub-Base & Pavement'), findsOneWidget);
    expect(find.text('2 sub'), findsOneWidget);
    expect(find.text('1 sub'), findsOneWidget);

    // Subactivities should not be visible before expanding
    expect(find.text('Clearing & Grubbing'), findsNothing);

    // Tap on 'Earthwork & Embankment' to expand
    await tester.tap(find.text('Earthwork & Embankment'));
    await tester.pumpAndSettle();

    // Now subactivities under 1.0 are visible
    expect(find.text('Clearing & Grubbing'), findsOneWidget);
    expect(find.text('Embankment Layer Compaction'), findsOneWidget);
    expect(find.text('Sqm'), findsOneWidget);

    // Select 'Clearing & Grubbing'
    await tester.tap(find.text('Clearing & Grubbing'));
    await tester.pumpAndSettle();

    expect(find.text('1 Selected'), findsOneWidget);

    // Search filter test: type 'GSB'
    await tester.enterText(find.byType(TextField), 'GSB');
    await tester.pumpAndSettle();

    // Earthwork should be filtered out, Sub-Base should be auto-expanded
    expect(find.text('Earthwork & Embankment'), findsNothing);
    expect(find.text('Sub-Base & Pavement'), findsOneWidget);
    expect(find.text('Granular Sub-Base (GSB)'), findsOneWidget);

    // Apply selection
    await tester.tap(find.textContaining('Apply Selection'));
    await tester.pumpAndSettle();

    expect(selected.length, 1);
    expect(selected.first.id, 's1');
  });
}
