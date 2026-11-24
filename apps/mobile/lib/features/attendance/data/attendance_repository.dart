import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:civil_erp/core/config/api_config.dart';
import 'package:civil_erp/core/network/api_client.dart';
import 'package:civil_erp/features/auth/data/auth_repository.dart';

class AttendanceSessionModel {
  final String id;
  final String projectId;
  final String projectName;
  final DateTime checkInAt;
  final DateTime? checkOutAt;
  final String status;
  final double? latitude;
  final double? longitude;
  final double? checkOutLatitude;
  final double? checkOutLongitude;
  final String? remarks;

  const AttendanceSessionModel({
    required this.id,
    required this.projectId,
    required this.projectName,
    required this.checkInAt,
    this.checkOutAt,
    required this.status,
    this.latitude,
    this.longitude,
    this.checkOutLatitude,
    this.checkOutLongitude,
    this.remarks,
  });

  factory AttendanceSessionModel.fromJson(Map<String, dynamic> json) {
    final project = json['project'] as Map<String, dynamic>?;
    return AttendanceSessionModel(
      id: json['id'] as String,
      projectId: (json['projectId'] ?? json['project_id'] ?? '') as String,
      projectName: (project?['name'] ?? 'Project') as String,
      checkInAt: json['checkInAt'] != null
          ? DateTime.parse(json['checkInAt'].toString()).toLocal()
          : DateTime.now(),
      checkOutAt: json['checkOutAt'] != null
          ? DateTime.tryParse(json['checkOutAt'].toString())?.toLocal()
          : null,
      status: (json['status'] ?? 'OPEN') as String,
      latitude: json['latitude'] != null
          ? double.tryParse(json['latitude'].toString())
          : null,
      longitude: json['longitude'] != null
          ? double.tryParse(json['longitude'].toString())
          : null,
      checkOutLatitude: json['checkOutLatitude'] != null || json['checkout_latitude'] != null
          ? double.tryParse((json['checkOutLatitude'] ?? json['checkout_latitude']).toString())
          : null,
      checkOutLongitude: json['checkOutLongitude'] != null || json['checkout_longitude'] != null
          ? double.tryParse((json['checkOutLongitude'] ?? json['checkout_longitude']).toString())
          : null,
      remarks: json['remarks'] as String?,
    );
  }

  bool get isOpen => status == 'OPEN';
}

class AttendanceRepository {
  final ApiClient apiClient;

  AttendanceRepository({required this.apiClient});

  Future<({bool active, int elapsedMinutes, AttendanceSessionModel? session})>
      getCurrentSession() async {
    try {
      final response = await apiClient.dio.get(ApiConfig.attendanceCurrent);
      final data = response.data as Map<String, dynamic>;
      final active = data['active'] as bool? ?? false;
      final elapsed = data['elapsedMinutes'] as int? ?? 0;
      AttendanceSessionModel? session;
      if (data['session'] != null) {
        session = AttendanceSessionModel.fromJson(
            data['session'] as Map<String, dynamic>);
      }
      return (active: active, elapsedMinutes: elapsed, session: session);
    } catch (e) {
      throw apiClient.extractErrorMessage(e);
    }
  }

  Future<AttendanceSessionModel> checkIn({
    required String projectId,
    double? latitude,
    double? longitude,
    double? accuracyM,
    String? remarks,
  }) async {
    try {
      final response = await apiClient.dio.post(
        ApiConfig.attendanceCheckIn,
        data: {
          'projectId': projectId,
          'latitude': ?latitude,
          'longitude': ?longitude,
          'locationAccuracyM': ?accuracyM,
          'remarks': ?remarks,
        },
      );
      final data = response.data as Map<String, dynamic>;
      return AttendanceSessionModel.fromJson(
          data['session'] as Map<String, dynamic>);
    } catch (e) {
      throw apiClient.extractErrorMessage(e);
    }
  }

  Future<AttendanceSessionModel> checkOut({
    String? sessionId,
    double? latitude,
    double? longitude,
    double? accuracyM,
    String? remarks,
  }) async {
    try {
      final response = await apiClient.dio.post(
        ApiConfig.attendanceCheckOut,
        data: {
          'sessionId': ?sessionId,
          'latitude': ?latitude,
          'longitude': ?longitude,
          'locationAccuracyM': ?accuracyM,
          'remarks': ?remarks,
        },
      );
      final data = response.data as Map<String, dynamic>;
      return AttendanceSessionModel.fromJson(
          data['session'] as Map<String, dynamic>);
    } catch (e) {
      throw apiClient.extractErrorMessage(e);
    }
  }

  Future<List<AttendanceSessionModel>> getHistory() async {
    try {
      final response = await apiClient.dio.get(ApiConfig.attendanceHistory);
      final data = response.data as Map<String, dynamic>;
      final items = data['items'] as List? ?? [];
      return items
          .map((item) =>
              AttendanceSessionModel.fromJson(item as Map<String, dynamic>))
          .toList();
    } catch (e) {
      throw apiClient.extractErrorMessage(e);
    }
  }
}

final attendanceRepositoryProvider = Provider<AttendanceRepository>((ref) {
  final client = ref.watch(apiClientProvider);
  return AttendanceRepository(apiClient: client);
});

final currentAttendanceProvider = FutureProvider.autoDispose((ref) async {
  final repo = ref.watch(attendanceRepositoryProvider);
  return repo.getCurrentSession();
});
