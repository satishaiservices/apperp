import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:image_picker/image_picker.dart';
import 'package:civil_erp/core/config/api_config.dart';
import 'package:civil_erp/core/network/api_client.dart';
import 'package:civil_erp/features/auth/data/auth_repository.dart';
import 'package:civil_erp/features/submissions/domain/submission_model.dart';

class SubmissionRepository {
  final ApiClient apiClient;

  SubmissionRepository({required this.apiClient});

  Future<SubmissionModel> createDailyReport({
    required String projectId,
    required String startChainage,
    required String endChainage,
    required List<String> activityIds,
    required double latitude,
    required double longitude,
    double? accuracyMeters,
    DateTime? capturedAt,
    String? remarks,
    List<XFile> photoFiles = const [],
  }) async {
    try {
      final payload = {
        'startChainage': startChainage.trim(),
        'endChainage': endChainage.trim(),
        'activityIds': activityIds,
        'latitude': latitude,
        'longitude': longitude,
        'locationAccuracyM': ?accuracyMeters,
        'locationCapturedAt': (capturedAt ?? DateTime.now()).toIso8601String(),
        if (remarks != null && remarks.trim().isNotEmpty)
          'remarks': remarks.trim(),
      };

      final response = await apiClient.dio.post(
        ApiConfig.projectSubmissions(projectId),
        data: payload,
      );

      final submissionData = response.data as Map<String, dynamic>;
      final submissionId = submissionData['id'] as String;

      // Upload photographs sequentially with explicit MIME headers
      for (final file in photoFiles) {
        try {
          final bytes = await file.readAsBytes();
          final isPng = file.name.endsWith('.png') ||
              (bytes.length >= 8 && bytes[0] == 0x89 && bytes[1] == 0x50);
          final filename = file.name.isNotEmpty
              ? file.name
              : (isPng ? 'site_photo.png' : 'site_photo.jpg');

          final formData = FormData.fromMap({
            'file': MultipartFile.fromBytes(
              bytes,
              filename: filename,
              contentType: isPng
                  ? DioMediaType('image', 'png')
                  : DioMediaType('image', 'jpeg'),
            ),
          });

          await apiClient.dio.post(
            ApiConfig.submissionPhotos(submissionId),
            data: formData,
            options: Options(
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            ),
          );
        } catch (e) {
          debugPrint('Failed to upload site photo: $e');
        }
      }

      // Fetch the updated submission detail with uploaded photos
      final detailResponse = await apiClient.dio.get(
        ApiConfig.submissionDetail(submissionId),
      );

      return SubmissionModel.fromJson(
        detailResponse.data as Map<String, dynamic>,
      );
    } catch (e) {
      throw apiClient.extractErrorMessage(e);
    }
  }

  Future<List<SubmissionModel>> getSubmissions({
    String? projectId,
    String? search,
  }) async {
    try {
      final queryParams = <String, dynamic>{};
      if (projectId != null && projectId.isNotEmpty) {
        queryParams['projectId'] = projectId;
      }
      if (search != null && search.trim().isNotEmpty) {
        queryParams['search'] = search.trim();
      }

      final response = await apiClient.dio.get(
        ApiConfig.allSubmissions,
        queryParameters: queryParams,
      );

      final data = response.data;
      final List items =
          (data is Map && data['items'] != null) ? data['items'] as List : (data as List? ?? []);

      return items
          .map((item) => SubmissionModel.fromJson(item as Map<String, dynamic>))
          .toList();
    } catch (e) {
      throw apiClient.extractErrorMessage(e);
    }
  }

  Future<SubmissionModel> getSubmissionDetail(String id) async {
    try {
      final response =
          await apiClient.dio.get(ApiConfig.submissionDetail(id));
      return SubmissionModel.fromJson(response.data as Map<String, dynamic>);
    } catch (e) {
      throw apiClient.extractErrorMessage(e);
    }
  }
}

final submissionRepositoryProvider = Provider<SubmissionRepository>((ref) {
  final client = ref.watch(apiClientProvider);
  return SubmissionRepository(apiClient: client);
});

final submissionsFutureProvider =
    FutureProvider.autoDispose.family<List<SubmissionModel>, ({String? projectId, String? search})>(
        (ref, filter) async {
  final repo = ref.watch(submissionRepositoryProvider);
  return repo.getSubmissions(
    projectId: filter.projectId,
    search: filter.search,
  );
});
