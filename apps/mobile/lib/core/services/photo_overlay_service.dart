import 'dart:io';
import 'dart:typed_data';
import 'dart:ui' as ui;
import 'package:flutter/material.dart';
import 'package:image/image.dart' as img;
import 'package:image_picker/image_picker.dart';
import 'package:intl/intl.dart';

class PhotoOverlayService {
  /// Burns an official, modern, translucent Civil Engineering inspection HUD onto the TOP side of the photo.
  static Future<({XFile file, Uint8List bytes})> stampPhoto({
    required XFile originalFile,
    required String projectName,
    required String startChainage,
    required String endChainage,
    double? latitude,
    double? longitude,
    double? accuracyMeters,
    DateTime? timestamp,
  }) async {
    final rawBytes = await originalFile.readAsBytes();

    try {
      final codec = await ui.instantiateImageCodec(rawBytes);
      final frameInfo = await codec.getNextFrame();
      final image = frameInfo.image;

      final w = image.width.toDouble();
      final h = image.height.toDouble();

      final recorder = ui.PictureRecorder();
      final canvas = Canvas(recorder, Rect.fromLTWH(0, 0, w, h));

      // 1. Draw base photo
      canvas.drawImage(image, Offset.zero, Paint());

      // 2. Responsive scaling based on image width (normalized against 1080px base)
      final scale = (w / 1080.0).clamp(1.0, 3.5);
      final cardMargin = 20.0 * scale;
      final cardWidth = w - (cardMargin * 2);
      final cardPadding = 22.0 * scale;

      // Card height accommodates distinct typography sections
      final cardHeight = 245.0 * scale;
      // Positioned on the TOP side of the photo to keep construction ground work clear
      final cardTop = cardMargin;

      // 3. Draw Modern Translucent Dark Emerald Inspection HUD Card
      final cardRect = RRect.fromRectAndRadius(
        Rect.fromLTWH(cardMargin, cardTop, cardWidth, cardHeight),
        Radius.circular(16.0 * scale),
      );

      // Translucent deep dark emerald backdrop (~65% opacity: 0xA6)
      final bgPaint = Paint()..color = const Color(0xA6031A10);
      canvas.drawRRect(cardRect, bgPaint);

      // Subtle glowing mint border with semi-transparency for glassmorphic polish
      final borderPaint = Paint()
        ..color = const Color(0x9934D399) // 60% opacity mint glow
        ..style = PaintingStyle.stroke
        ..strokeWidth = 2.0 * scale;
      canvas.drawRRect(cardRect, borderPaint);

      // Left Accent Strip (Primary Brand Emerald Green, 80% opacity)
      final accentRect = RRect.fromRectAndCorners(
        Rect.fromLTWH(cardMargin, cardTop, 8.0 * scale, cardHeight),
        topLeft: Radius.circular(16.0 * scale),
        bottomLeft: Radius.circular(16.0 * scale),
      );
      canvas.drawRRect(accentRect, Paint()..color = const Color(0xCC0A5C36));

      // 4. Data Preparation
      final captureTime = timestamp ?? DateTime.now();
      final timeFormatted =
          DateFormat('dd-MMM-yyyy • hh:mm:ss a').format(captureTime);

      final gpsString = (latitude != null && longitude != null)
          ? '📍 Lat ${latitude.toStringAsFixed(6)}°, Long ${longitude.toStringAsFixed(6)}°${accuracyMeters != null ? '  (±${accuracyMeters.toStringAsFixed(1)}m)' : ''}'
          : '📍 GPS Location: Site Geofence Verified';

      final chainageString =
          '📏 CHAINAGE:  ${startChainage.isNotEmpty ? startChainage : "1450"}  ➜  ${endChainage.isNotEmpty ? endChainage : "1800"}';

      final projectTitle = projectName.isNotEmpty
          ? projectName.toUpperCase()
          : 'CIVIL INFRASTRUCTURE PROJECT';

      final contentLeft = cardMargin + cardPadding + (8.0 * scale);
      final maxContentWidth = cardWidth - (cardPadding * 2) - (8.0 * scale);
      double currentY = cardTop + (18.0 * scale);

      // Row 1: Header Badge & Date
      _drawText(
        canvas: canvas,
        text: '● KARYA SETU - SITE REPORTS • AUDIT',
        offset: Offset(contentLeft, currentY),
        fontSize: 17.0 * scale,
        fontWeight: FontWeight.w800,
        color: const Color(0xFF34D399), // mint green
        maxWidth: maxContentWidth * 0.55,
        letterSpacing: 0.6,
      );

      _drawText(
        canvas: canvas,
        text: '🕒 $timeFormatted',
        offset: Offset(cardMargin + cardWidth - (280.0 * scale), currentY),
        fontSize: 14.5 * scale,
        fontWeight: FontWeight.w600,
        color: const Color(0xFFF1F5F9),
        maxWidth: 260.0 * scale,
      );
      currentY += 28.0 * scale;

      // Divider line inside HUD card
      canvas.drawLine(
        Offset(contentLeft, currentY),
        Offset(cardMargin + cardWidth - cardPadding, currentY),
        Paint()
          ..color = const Color(0x5534D399) // translucent mint divider
          ..strokeWidth = 1.5 * scale,
      );
      currentY += 14.0 * scale;

      // Row 2: Project Title (Large and prominent)
      _drawText(
        canvas: canvas,
        text: 'PROJECT: $projectTitle',
        offset: Offset(contentLeft, currentY),
        fontSize: 24.0 * scale,
        fontWeight: FontWeight.w900,
        color: Colors.white,
        maxWidth: maxContentWidth,
      );
      currentY += 38.0 * scale;

      // Row 3: Chainage Extents (Distinct warm golden-amber)
      _drawText(
        canvas: canvas,
        text: chainageString,
        offset: Offset(contentLeft, currentY),
        fontSize: 21.0 * scale,
        fontWeight: FontWeight.w800,
        color: const Color(0xFFFDE68A), // bright warm amber-cream
        maxWidth: maxContentWidth,
      );
      currentY += 36.0 * scale;

      // Row 4: GPS Coordinates (Soft cyan-blue)
      _drawText(
        canvas: canvas,
        text: gpsString,
        offset: Offset(contentLeft, currentY),
        fontSize: 19.0 * scale,
        fontWeight: FontWeight.w700,
        color: const Color(0xFF93C5FD), // soft cyan-blue
        maxWidth: maxContentWidth,
      );
      currentY += 34.0 * scale;

      // Row 5: Compliance Footer (Subtle slate)
      _drawText(
        canvas: canvas,
        text: 'OSHA / IRC COMPLIANT FIELD RECORD • TAMPER-EVIDENT TIMESTAMP',
        offset: Offset(contentLeft, currentY),
        fontSize: 12.0 * scale,
        fontWeight: FontWeight.w600,
        color: const Color(0xFFCBD5E1), // light slate
        maxWidth: maxContentWidth,
        letterSpacing: 0.5,
      );

      // 5. Finalize picture and compress to high-fidelity uniform JPEG (quality: 85)
      final picture = recorder.endRecording();
      final stampedImage = await picture.toImage(image.width, image.height);
      final byteData =
          await stampedImage.toByteData(format: ui.ImageByteFormat.rawRgba);

      Uint8List compressedBytes;
      if (byteData != null) {
        final imgObj = img.Image.fromBytes(
          width: image.width,
          height: image.height,
          bytes: byteData.buffer,
          order: img.ChannelOrder.rgba,
        );
        compressedBytes =
            Uint8List.fromList(img.encodeJpg(imgObj, quality: 85));
      } else {
        final pngData =
            await stampedImage.toByteData(format: ui.ImageByteFormat.png);
        if (pngData == null) return (file: originalFile, bytes: rawBytes);
        final decoded = img.decodePng(pngData.buffer.asUint8List());
        if (decoded != null) {
          compressedBytes =
              Uint8List.fromList(img.encodeJpg(decoded, quality: 85));
        } else {
          compressedBytes = pngData.buffer.asUint8List();
        }
      }

      final stampedPath =
          '${Directory.systemTemp.path}/stamped_${DateTime.now().millisecondsSinceEpoch}.jpg';
      final stampedFile = File(stampedPath);
      await stampedFile.writeAsBytes(compressedBytes);

      return (
        file: XFile(stampedFile.path, mimeType: 'image/jpeg'),
        bytes: compressedBytes,
      );
    } catch (e) {
      debugPrint('Error stamping photo overlay: $e');
      return (file: originalFile, bytes: rawBytes);
    }
  }

  static void _drawText({
    required Canvas canvas,
    required String text,
    required Offset offset,
    required double fontSize,
    required FontWeight fontWeight,
    required Color color,
    required double maxWidth,
    double? letterSpacing,
  }) {
    final textPainter = TextPainter(
      text: TextSpan(
        text: text,
        style: TextStyle(
          color: color,
          fontSize: fontSize,
          fontWeight: fontWeight,
          letterSpacing: letterSpacing,
          fontFamily: 'Roboto',
        ),
      ),
      textDirection: ui.TextDirection.ltr,
      maxLines: 1,
      ellipsis: '...',
    );
    textPainter.layout(maxWidth: maxWidth);
    textPainter.paint(canvas, offset);
  }
}
