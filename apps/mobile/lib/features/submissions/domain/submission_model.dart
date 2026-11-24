import 'package:civil_erp/features/projects/domain/activity_model.dart';

class SubmissionPhotoModel {
  final String id;
  final String storageKey;
  final String mimeType;
  final int fileSize;
  final DateTime? capturedAt;
  final DateTime uploadedAt;

  const SubmissionPhotoModel({
    required this.id,
    required this.storageKey,
    required this.mimeType,
    required this.fileSize,
    this.capturedAt,
    required this.uploadedAt,
  });

  factory SubmissionPhotoModel.fromJson(Map<String, dynamic> json) {
    return SubmissionPhotoModel(
      id: json['id'] as String,
      storageKey: (json['storageKey'] ?? json['storage_key'] ?? '') as String,
      mimeType: (json['mimeType'] ?? json['mime_type'] ?? '') as String,
      fileSize: (json['fileSize'] ?? json['file_size'] ?? 0) as int,
      capturedAt: json['capturedAt'] != null
          ? DateTime.tryParse(json['capturedAt'].toString())
          : null,
      uploadedAt: json['uploadedAt'] != null
          ? DateTime.parse(json['uploadedAt'].toString())
          : DateTime.now(),
    );
  }
}

class SubmissionModel {
  final String id;
  final String projectId;
  final String projectName;
  final String projectCode;
  final String startChainage;
  final String endChainage;
  final double latitude;
  final double longitude;
  final double? locationAccuracyM;
  final DateTime? locationCapturedAt;
  final String? remarks;
  final DateTime submittedAt;
  final List<ActivityModel> activities;
  final List<SubmissionPhotoModel> photos;
  final String? supervisorName;

  const SubmissionModel({
    required this.id,
    required this.projectId,
    required this.projectName,
    required this.projectCode,
    required this.startChainage,
    required this.endChainage,
    required this.latitude,
    required this.longitude,
    this.locationAccuracyM,
    this.locationCapturedAt,
    this.remarks,
    required this.submittedAt,
    required this.activities,
    required this.photos,
    this.supervisorName,
  });

  factory SubmissionModel.fromJson(Map<String, dynamic> json) {
    final project = json['project'] as Map<String, dynamic>?;
    final activitiesRaw = json['activities'] as List? ?? [];
    final photosRaw = json['photos'] as List? ?? [];
    final supervisor = json['supervisor'] as Map<String, dynamic>?;
    final user = supervisor?['user'] as Map<String, dynamic>?;

    final parsedActivities = activitiesRaw.map((item) {
      if (item is Map<String, dynamic> && item['activity'] != null) {
        return ActivityModel.fromJson(item['activity'] as Map<String, dynamic>);
      }
      return ActivityModel.fromJson(item as Map<String, dynamic>);
    }).toList();

    final parsedPhotos = photosRaw
        .map((item) =>
            SubmissionPhotoModel.fromJson(item as Map<String, dynamic>))
        .toList();

    return SubmissionModel(
      id: json['id'] as String,
      projectId: (json['projectId'] ?? json['project_id'] ?? '') as String,
      projectName: (project?['name'] ?? 'Project') as String,
      projectCode: (project?['projectCode'] ?? project?['project_code'] ?? '') as String,
      startChainage: (json['startChainage'] ?? json['start_chainage'] ?? '') as String,
      endChainage: (json['endChainage'] ?? json['end_chainage'] ?? '') as String,
      latitude: double.tryParse(json['latitude'].toString()) ?? 0.0,
      longitude: double.tryParse(json['longitude'].toString()) ?? 0.0,
      locationAccuracyM: json['locationAccuracyM'] != null
          ? double.tryParse(json['locationAccuracyM'].toString())
          : null,
      locationCapturedAt: json['locationCapturedAt'] != null
          ? DateTime.tryParse(json['locationCapturedAt'].toString())
          : null,
      remarks: json['remarks'] as String?,
      submittedAt: json['submittedAt'] != null
          ? DateTime.parse(json['submittedAt'].toString())
          : DateTime.now(),
      activities: parsedActivities,
      photos: parsedPhotos,
      supervisorName: user?['fullName'] as String?,
    );
  }

  String get chainageSpanDisplay => '$startChainage → $endChainage';
}
