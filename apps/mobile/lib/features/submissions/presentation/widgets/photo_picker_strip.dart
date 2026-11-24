import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:intl/intl.dart';

import 'package:civil_erp/core/services/photo_overlay_service.dart';
import 'package:civil_erp/core/theme/app_theme.dart';

class PhotoItem {
  final XFile file;
  final DateTime capturedAt;
  Uint8List? memoryBytes;

  PhotoItem({
    required this.file,
    required this.capturedAt,
    this.memoryBytes,
  });
}

class PhotoPickerStrip extends StatefulWidget {
  final List<PhotoItem> photos;
  final ValueChanged<PhotoItem> onPhotoAdded;
  final ValueChanged<int> onPhotoRemoved;
  final int maxPhotos;

  // Metadata for overlay watermarking
  final String projectName;
  final String startChainage;
  final String endChainage;
  final double? latitude;
  final double? longitude;
  final double? accuracyMeters;

  const PhotoPickerStrip({
    super.key,
    required this.photos,
    required this.onPhotoAdded,
    required this.onPhotoRemoved,
    this.maxPhotos = 5,
    this.projectName = '',
    this.startChainage = '',
    this.endChainage = '',
    this.latitude,
    this.longitude,
    this.accuracyMeters,
  });

  @override
  State<PhotoPickerStrip> createState() => _PhotoPickerStripState();
}

class _PhotoPickerStripState extends State<PhotoPickerStrip> {
  bool _isProcessing = false;

  Future<void> _captureFromCamera(BuildContext context) async {
    if (widget.photos.length >= widget.maxPhotos) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
              'Maximum ${widget.maxPhotos} photos allowed per daily report'),
          behavior: SnackBarBehavior.floating,
        ),
      );
      return;
    }

    final picker = ImagePicker();
    try {
      // Direct camera launch only - Gallery strictly prohibited
      final picked = await picker.pickImage(
        source: ImageSource.camera,
        imageQuality: 85,
        maxWidth: 1920,
        maxHeight: 1920,
      );

      if (picked != null) {
        setState(() => _isProcessing = true);

        // Stamp Civil Engineering inspection watermark onto photo
        final stamped = await PhotoOverlayService.stampPhoto(
          originalFile: picked,
          projectName: widget.projectName,
          startChainage: widget.startChainage,
          endChainage: widget.endChainage,
          latitude: widget.latitude,
          longitude: widget.longitude,
          accuracyMeters: widget.accuracyMeters,
          timestamp: DateTime.now(),
        );

        widget.onPhotoAdded(
          PhotoItem(
            file: stamped.file,
            capturedAt: DateTime.now(),
            memoryBytes: stamped.bytes,
          ),
        );
      }
    } catch (e) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('Camera capture failed: $e'),
            behavior: SnackBarBehavior.floating,
          ),
        );
      }
    } finally {
      if (mounted) {
        setState(() => _isProcessing = false);
      }
    }
  }

  void _showPhotoPreview(BuildContext context, PhotoItem photo) {
    showDialog(
      context: context,
      builder: (ctx) => Dialog(
        backgroundColor: Colors.black,
        insetPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // Top Bar
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Expanded(
                    child: Text(
                      'Site Photo Inspection Preview',
                      overflow: TextOverflow.ellipsis,
                      style: TextStyle(
                        color: Colors.white,
                        fontSize: 14,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ),
                  IconButton(
                    icon: const Icon(Icons.close, color: Colors.white),
                    onPressed: () => Navigator.pop(ctx),
                  ),
                ],
              ),
            ),
            // Zoomable Interactive Image
            Flexible(
              child: InteractiveViewer(
                minScale: 0.8,
                maxScale: 4.0,
                child: photo.memoryBytes != null
                    ? Image.memory(
                        photo.memoryBytes!,
                        fit: BoxFit.contain,
                      )
                    : (kIsWeb
                        ? const Center(
                            child: Icon(Icons.broken_image,
                                color: Colors.white54, size: 48),
                          )
                        : Image.file(
                            File(photo.file.path),
                            fit: BoxFit.contain,
                          )),
              ),
            ),
            const SizedBox(height: 8),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final timeFormat = DateFormat('hh:mm a');

    return SizedBox(
      height: 110,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        itemCount:
            widget.photos.length + (widget.photos.length < widget.maxPhotos ? 1 : 0),
        separatorBuilder: (_, __) => const SizedBox(width: 12),
        itemBuilder: (context, index) {
          // Camera Add Button (Direct Camera Trigger)
          if (index == 0 && widget.photos.length < widget.maxPhotos) {
            return InkWell(
              onTap: _isProcessing ? null : () => _captureFromCamera(context),
              borderRadius: BorderRadius.circular(12),
              child: Container(
                width: 95,
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(
                    color: AppTheme.amberAccent,
                    width: 1.5,
                  ),
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    if (_isProcessing)
                      const SizedBox(
                        width: 24,
                        height: 24,
                        child: CircularProgressIndicator(
                          strokeWidth: 2.5,
                          color: AppTheme.amberAccent,
                        ),
                      )
                    else ...[
                      const Icon(
                        Icons.camera_alt_rounded,
                        color: AppTheme.amberAccent,
                        size: 28,
                      ),
                      const SizedBox(height: 6),
                      const Text(
                        'Add Photo',
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w700,
                          color: AppTheme.primaryNavy,
                        ),
                      ),
                    ],
                  ],
                ),
              ),
            );
          }

          final photoIndex =
              widget.photos.length < widget.maxPhotos ? index - 1 : index;
          final photo = widget.photos[photoIndex];

          return GestureDetector(
            onTap: () => _showPhotoPreview(context, photo),
            child: Stack(
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.circular(12),
                  child: Container(
                    width: 95,
                    height: 110,
                    decoration: BoxDecoration(
                      color: Colors.grey.shade200,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: AppTheme.borderColor),
                    ),
                    child: photo.memoryBytes != null
                        ? Image.memory(
                            photo.memoryBytes!,
                            fit: BoxFit.cover,
                            errorBuilder: (_, __, ___) => const Center(
                              child: Icon(
                                Icons.broken_image_rounded,
                                color: AppTheme.textMuted,
                              ),
                            ),
                          )
                        : (kIsWeb
                            ? const Icon(Icons.image, color: Colors.grey)
                            : Image.file(
                                File(photo.file.path),
                                fit: BoxFit.cover,
                                errorBuilder: (_, __, ___) => const Center(
                                  child: Icon(
                                    Icons.broken_image_rounded,
                                    color: AppTheme.textMuted,
                                  ),
                                ),
                              )),
                  ),
                ),

                // Timestamp & Geotag Banner
                Positioned(
                  bottom: 0,
                  left: 0,
                  right: 0,
                  child: Container(
                    padding:
                        const EdgeInsets.symmetric(vertical: 3, horizontal: 4),
                    decoration: BoxDecoration(
                      color: Colors.black.withOpacity(0.75),
                      borderRadius: const BorderRadius.vertical(
                        bottom: Radius.circular(11),
                      ),
                    ),
                    child: Text(
                      timeFormat.format(photo.capturedAt),
                      textAlign: TextAlign.center,
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 10,
                        fontWeight: FontWeight.w700,
                      ),
                    ),
                  ),
                ),

                // Delete Badge
                Positioned(
                  top: 4,
                  right: 4,
                  child: InkWell(
                    onTap: () => widget.onPhotoRemoved(photoIndex),
                    child: Container(
                      padding: const EdgeInsets.all(4),
                      decoration: BoxDecoration(
                        color: Colors.black.withOpacity(0.65),
                        shape: BoxShape.circle,
                      ),
                      child: const Icon(
                        Icons.close,
                        color: Colors.white,
                        size: 13,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
