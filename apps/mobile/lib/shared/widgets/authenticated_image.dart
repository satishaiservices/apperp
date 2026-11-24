import 'dart:typed_data';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:civil_erp/core/theme/app_theme.dart';
import 'package:civil_erp/features/auth/data/auth_repository.dart';

/// In-memory cache for authenticated image bytes to prevent repeated
/// network downloads on scroll and provide instant loading.
class AuthenticatedImageCache {
  static final Map<String, Uint8List> _cache = {};

  static Uint8List? get(String url) => _cache[url];

  static void put(String url, Uint8List bytes) {
    if (_cache.length > 100) {
      // Evict oldest entries when memory exceeds 100 images
      _cache.remove(_cache.keys.first);
    }
    _cache[url] = bytes;
  }

  static void clear() => _cache.clear();
}

class AuthenticatedImage extends ConsumerStatefulWidget {
  final String imageUrl;
  final BoxFit fit;
  final double? width;
  final double? height;
  final BorderRadius? borderRadius;
  final Widget? placeholder;
  final Widget? errorWidget;
  final bool enableRetry;

  const AuthenticatedImage({
    super.key,
    required this.imageUrl,
    this.fit = BoxFit.cover,
    this.width,
    this.height,
    this.borderRadius,
    this.placeholder,
    this.errorWidget,
    this.enableRetry = true,
  });

  @override
  ConsumerState<AuthenticatedImage> createState() => _AuthenticatedImageState();
}

class _AuthenticatedImageState extends ConsumerState<AuthenticatedImage> {
  Uint8List? _bytes;
  bool _isLoading = true;
  bool _hasError = false;
  CancelToken? _cancelToken;

  @override
  void initState() {
    super.initState();
    _loadFromCacheOrNetwork();
  }

  @override
  void didUpdateWidget(covariant AuthenticatedImage oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (oldWidget.imageUrl != widget.imageUrl) {
      _cancelToken?.cancel('url changed');
      _loadFromCacheOrNetwork();
    }
  }

  @override
  void dispose() {
    _cancelToken?.cancel('widget disposed');
    super.dispose();
  }

  void _loadFromCacheOrNetwork() {
    final cached = AuthenticatedImageCache.get(widget.imageUrl);
    if (cached != null) {
      _bytes = cached;
      _isLoading = false;
      _hasError = false;
      return;
    }

    _fetchBytes();
  }

  Future<void> _fetchBytes() async {
    if (!mounted) return;
    _cancelToken?.cancel();
    _cancelToken = CancelToken();

    setState(() {
      _isLoading = true;
      _hasError = false;
    });

    try {
      final client = ref.read(apiClientProvider);
      final bytes = await client.getBytes(
        widget.imageUrl,
        cancelToken: _cancelToken,
      );

      AuthenticatedImageCache.put(widget.imageUrl, bytes);

      if (mounted) {
        setState(() {
          _bytes = bytes;
          _isLoading = false;
          _hasError = false;
        });
      }
    } catch (_) {
      if (mounted) {
        setState(() {
          _isLoading = false;
          _hasError = true;
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    Widget content;

    if (_bytes != null) {
      content = Image.memory(
        _bytes!,
        fit: widget.fit,
        width: widget.width,
        height: widget.height,
        errorBuilder: (_, __, ___) => _buildErrorWidget(),
      );
    } else if (_isLoading) {
      content = widget.placeholder ??
          Container(
            width: widget.width,
            height: widget.height,
            color: Colors.grey.shade200,
            child: const Center(
              child: Icon(
                Icons.image_outlined,
                size: 18,
                color: AppTheme.textMuted,
              ),
            ),
          );
    } else {
      content = widget.errorWidget ?? _buildErrorWidget();
    }

    if (widget.borderRadius != null) {
      return ClipRRect(
        borderRadius: widget.borderRadius!,
        child: content,
      );
    }

    return content;
  }

  Widget _buildErrorWidget() {
    return Container(
      width: widget.width,
      height: widget.height,
      color: Colors.grey.shade200,
      child: Center(
        child: widget.enableRetry
            ? InkWell(
                onTap: _fetchBytes,
                child: const Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    Icon(
                      Icons.refresh_rounded,
                      size: 20,
                      color: AppTheme.textMuted,
                    ),
                    SizedBox(height: 2),
                    Text(
                      'Retry',
                      style: TextStyle(
                        fontSize: 9,
                        color: AppTheme.textMuted,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
              )
            : const Icon(
                Icons.broken_image_rounded,
                size: 20,
                color: AppTheme.textMuted,
              ),
      ),
    );
  }
}
