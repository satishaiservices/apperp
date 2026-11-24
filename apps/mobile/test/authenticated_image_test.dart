import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:civil_erp/shared/widgets/authenticated_image.dart';

void main() {
  setUp(() {
    AuthenticatedImageCache.clear();
  });

  test('AuthenticatedImageCache stores, retrieves, and clears byte arrays', () {
    final testBytes = Uint8List.fromList([1, 2, 3, 4]);
    const testUrl = 'http://localhost:3001/submissions/1/photos/2';

    expect(AuthenticatedImageCache.get(testUrl), isNull);

    AuthenticatedImageCache.put(testUrl, testBytes);
    expect(AuthenticatedImageCache.get(testUrl), equals(testBytes));

    AuthenticatedImageCache.clear();
    expect(AuthenticatedImageCache.get(testUrl), isNull);
  });

  testWidgets('AuthenticatedImage renders cached bytes immediately without network call', (tester) async {
    // 1x1 transparent PNG bytes
    final transparentPng = Uint8List.fromList([
      0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
      0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
      0x08, 0x06, 0x00, 0x00, 0x00, 0x1F, 0x15, 0xC4, 0x89, 0x00, 0x00, 0x00,
      0x0A, 0x49, 0x44, 0x41, 0x54, 0x78, 0x9C, 0x63, 0x00, 0x01, 0x00, 0x00,
      0x05, 0x00, 0x01, 0x0D, 0x0A, 0x2D, 0xB4, 0x00, 0x00, 0x00, 0x00, 0x49,
      0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82,
    ]);

    const testUrl = 'http://localhost:3001/test/cached.png';
    AuthenticatedImageCache.put(testUrl, transparentPng);

    await tester.pumpWidget(
      const ProviderScope(
        child: MaterialApp(
          home: Scaffold(
            body: AuthenticatedImage(
              imageUrl: testUrl,
              width: 50,
              height: 50,
            ),
          ),
        ),
      ),
    );

    // Should immediately find Image widget
    expect(find.byType(Image), findsOneWidget);
  });
}
