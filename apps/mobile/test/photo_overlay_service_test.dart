import 'dart:io';
import 'dart:typed_data';
import 'dart:ui' as ui;
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:image_picker/image_picker.dart';
import 'package:civil_erp/core/services/photo_overlay_service.dart';

Future<Uint8List> createSampleImageBytes() async {
  final recorder = ui.PictureRecorder();
  final canvas = Canvas(recorder, const Rect.fromLTWH(0, 0, 400, 300));
  final paint = Paint()..color = const Color(0xFF2E7D32);
  canvas.drawRect(const Rect.fromLTWH(0, 0, 400, 300), paint);
  final picture = recorder.endRecording();
  final img = await picture.toImage(400, 300);
  final byteData = await img.toByteData(format: ui.ImageByteFormat.png);
  return byteData!.buffer.asUint8List();
}

void main() {
  test('Creates watermarked image from bytes', () async {
    final rawBytes = await createSampleImageBytes();
    expect(rawBytes.isNotEmpty, true);

    // Decode and stamp
    final codec = await ui.instantiateImageCodec(rawBytes);
    final frame = await codec.getNextFrame();
    final img = frame.image;
    final w = img.width;
    final h = img.height;

    final recorder = ui.PictureRecorder();
    final canvas =
        Canvas(recorder, Rect.fromLTWH(0, 0, w.toDouble(), h.toDouble()));
    canvas.drawImage(img, Offset.zero, Paint());

    // Draw banner
    final bannerHeight = h * 0.35;
    final bannerRect =
        Rect.fromLTWH(0, h - bannerHeight, w.toDouble(), bannerHeight);
    canvas.drawRect(
        bannerRect, Paint()..color = Colors.black.withOpacity(0.75));

    final tp = TextPainter(
      text: const TextSpan(
        text:
            'PROJECT: NH-48 Widening\nCHAINAGE: CH 14+250 - CH 14+800\nGPS: 12.34567, 78.90123',
        style: TextStyle(color: Colors.white, fontSize: 12),
      ),
      textDirection: TextDirection.ltr,
    );
    tp.layout(maxWidth: w.toDouble() - 20);
    tp.paint(canvas, Offset(10, h - bannerHeight + 10));

    final stampedPic = recorder.endRecording();
    final stampedImg = await stampedPic.toImage(w, h);
    final outBytes =
        await stampedImg.toByteData(format: ui.ImageByteFormat.png);
    expect(outBytes, isNotNull);
    expect(outBytes!.buffer.asUint8List().isNotEmpty, true);
  });

  test('PhotoOverlayService exports compressed JPEG with valid header',
      () async {
    final rawBytes = await createSampleImageBytes();
    final tempFile = File(
        '${Directory.systemTemp.path}/test_raw_${DateTime.now().millisecondsSinceEpoch}.png');
    await tempFile.writeAsBytes(rawBytes);

    final stamped = await PhotoOverlayService.stampPhoto(
      originalFile: XFile(tempFile.path),
      projectName: 'Test Highway NH-48',
      startChainage: '1200',
      endChainage: '1500',
      latitude: 12.9290,
      longitude: 77.6789,
      accuracyMeters: 3.5,
      timestamp: DateTime.now(),
    );

    expect(stamped.file.mimeType, 'image/jpeg');
    expect(stamped.file.path.endsWith('.jpg'), true);
    expect(stamped.bytes.isNotEmpty, true);
    // Verify standard JPEG magic bytes: 0xFF, 0xD8
    expect(stamped.bytes[0], 0xFF);
    expect(stamped.bytes[1], 0xD8);

    if (tempFile.existsSync()) {
      tempFile.deleteSync();
    }
  });
}
